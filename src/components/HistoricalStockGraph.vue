<template>
  <div class="graph" :id="id">
  </div>
</template>

<style scoped>

.graph
{
  height: 600px;
}

</style>

<script lang="ts">
/* eslint-disable */

import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import {calculateMA} from '@/utility/TechnicalAnalysis';
import _ from 'lodash';

import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
    MarkPointComponent
} from 'echarts/components';
import {
  LineChart,
  BarChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, MarkLineComponent, MarkPointComponent, LineChart, BarChart, CanvasRenderer]
);

@Component
export default class HistoricalStockGraph extends Vue {
  @Prop({ default: 'graph' }) id!: string;

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
     data: ['日K', '成交量', 'MA5', 'MA10', 'MA20', 'MA60'],
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
         name: '成交量',
         type: 'bar',
         yAxisIndex: 1,
         data: this.volumns,
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
         name: 'MA10',
         type: 'line',
         yAxisIndex: 0,
         data: calculateMA(10, _.map(this.price, (item: number[]) => item[1])),
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },
       {
         name: 'MA20',
         type: 'line',
         yAxisIndex: 0,
         data: calculateMA(20, _.map(this.price, (item: number[]) => item[1])),
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },
       {
         name: 'MA60',
         type: 'line',
         yAxisIndex: 0,
         data: calculateMA(60, _.map(this.price, (item: number[]) => item[1])),
         smooth: true,
         lineStyle: {
           opacity: 0.5,
         },
       },

     ],

   }));

   setTimeout(() => {
     myChart.resize();
   }, 20);

  window.addEventListener('window:resize' , () => {
    myChart.resize();
  });
 }
}
</script>
