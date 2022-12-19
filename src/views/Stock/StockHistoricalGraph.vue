<template>
  <div class="white px-9 py-6">
    <span class="text-h5">歷史資訊</span>
    <div class="white graph">
      <HistoricalStockGraph
        id="history"
        :dates="historyDates"
        :price="historyPrice"
        :volumns="historyVolumn">
      </HistoricalStockGraph>
    </div>
  </div>
</template>

<style scoped>

.graph{
  width: 100%;
  height: 600px;
}

</style>

<script lang='ts'>

import {
  Vue, Component, Watch, PropSync,
} from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class StockHistoricalGraph extends Vue {
  @PropSync('data') stockHistory!: StockHistoryType[];

  private historyDates: string[] = [];

  private historyPrice: string[][] = [[]];

  private historyVolumn: number[] = [];

  private created() {
    this.historyToDatesAndPrice();
  }

  @Watch('stockHistory')
  private historyToDatesAndPrice() {
    this.historyDates = _.map(this.stockHistory, 'date');
    this.historyPrice = _.map(this.stockHistory, (data: StockHistoryType) => [
      data.openingPrice,
      data.closingPrice,
      data.lowestPrice,
      data.highestPrice,
    ]);

    this.historyVolumn = _.map(this.stockHistory, 'volumn');
  }
}

</script>
