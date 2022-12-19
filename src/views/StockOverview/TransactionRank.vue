<template>
  <div class="white transaction-rank-block">
    <v-row>
      <v-col cols="12">
        <span>各類股成交量佔比</span>
      </v-col>
      <v-col cols="12">
        <div id="rankChart"></div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.transaction-rank-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}

#rankChart
{
  width:100%;
  height:600px;
}

</style>

<script lang="ts">
import {
  Vue, Component, Watch,
} from 'vue-property-decorator';
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  LegendComponent,
} from 'echarts/components';
import {
  PieChart,
} from 'echarts/charts';
import {
  CanvasRenderer,
} from 'echarts/renderers';

import { Getter } from 'vuex-class';

echarts.use(
  [ToolboxComponent, LegendComponent, PieChart, CanvasRenderer],
);

@Component
export default class TransactionRank extends Vue {
  @Getter('getMarketStockVolumnRank') getMarketStockVolumnRank!: StockVolumnRankType[];

  private chart: any;

  private mounted() {
    this.rankChart();
  }

  @Watch('getMarketStockVolumnRank')
  private rankChart() {
    const chartDom: HTMLElement = document.getElementById('rankChart') as HTMLElement;
    this.chart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} {c}%',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20,
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['55%', '50%'],
          data: this.getMarketStockVolumnRank,
        },
      ],
    };

    this.chart.setOption(option);
    window.addEventListener('window:resize', () => {
      this.chart.resize();
    });
  }
}
</script>
