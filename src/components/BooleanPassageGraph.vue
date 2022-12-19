<template>
  <div class="graph-boolean" :id="id">
  </div>
</template>

<style scoped>

.graph-boolean
{
  height: 600px;
}

</style>

<script lang="ts">

import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { calculateMA, calculateStandardDeviation } from '@/utility/TechnicalAnalysis';
import _ from 'lodash';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent,
} from 'echarts/components';
import {
  CandlestickChart,
  LineChart,
} from 'echarts/charts';
import {
  CanvasRenderer,
} from 'echarts/renderers';

echarts.use(
  [TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent,
    CandlestickChart,
    LineChart,
    CanvasRenderer],
);

@Component
export default class BooleanPassageGraph extends Vue {
  @Prop({ default: 'graph-boolean' }) id!: string;

  @Prop({ default: () => [] }) dates!: string[];

  @Prop({ default: () => [[]] }) price!: string[][];

  @Prop({ default: () => [] }) volumns!: number[];

  private upColor = '#ec0000';

  private upBorderColor = '#8A0000';

  private downColor = '#00da3c';

  private downBorderColor = '#008F28';

  private mounted() {
    this.reRender();
  }

 private defaultOption: any = {
   tooltip: {
     trigger: 'axis',
     axisPointer: {
       type: 'cross',
     },
   },
   legend: {
     data: ['日K', 'MA5', 'MA5 上緣', 'MA5 下緣'],
     top: 40,
   },
   grid: {
     top: 100,
     right: 100,
     left: 0,
   },
   xAxis: {
     type: 'category',
     scale: true,
     boundaryGap: false,
     axisLine: { onZero: false },
     splitLine: { show: false },
     splitNumber: 20,
     min: 'dataMin',
     max: 'dataMax',
   },
   yAxis: [{
     scale: true,
     splitArea: {
       show: true,
     },
   }, {
     type: 'value',
     scale: true,
     name: '成交量',
   }],
   dataZoom: [
     {
       type: 'inside',
       start: 50,
       end: 100,
     },
     {
       show: true,
       type: 'slider',
       top: '90%',
       start: 50,
       end: 100,
     },
   ],
 };

 @Watch('dates')
 @Watch('price')
 private reRender() {
   const chartDom: any = document.getElementById(this.id);
   const myChart = echarts.init(chartDom);

   const passage = calculateStandardDeviation(5, _.map(this.price, (item: number[]) => item[1]));
   myChart.setOption(_.assign(this.defaultOption, {
     xAxis: {
       data: this.dates,
     },
     series: [
       {
         name: '日K',
         type: 'candlestick',
         yAxisIndex: 0,
         data: this.price,
         itemStyle: {
           color: this.upColor,
           color0: this.downColor,
           borderColor: this.upBorderColor,
           borderColor0: this.downBorderColor,
         },

       },
       {
         name: 'MA5',
         type: 'line',
         yAxisIndex: 0,
         data: calculateMA(5, _.map(this.price, (item: number[]) => item[1])),
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },
       {
         name: 'MA5 上緣',
         type: 'line',
         yAxisIndex: 0,
         data: passage.upper,
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },
       {
         name: 'MA5 下緣',
         type: 'line',
         yAxisIndex: 0,
         data: passage.lower,
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },
     ],

   }));

   setTimeout(() => {
     myChart.resize();
   }, 10);

   window.addEventListener('window:resize', () => {
     myChart.resize();
   });
 }
}
</script>
