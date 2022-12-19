<template>
  <div class="white px-9 py-6">
        <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
      <v-skeleton-loader
        class="mx-auto"
        type="image,image"
        max-height="325px"
      ></v-skeleton-loader>
    </v-col>
    <transition name="fade" mode="out-in" v-else>
      <div>
        <span class="text-h5">歷史資訊</span>
        <div class="white graph">
          <HistoricalStockGraph
            :dates="historyDates"
            :price="historyPrice"
            :volumns="historyVolumn">
          </HistoricalStockGraph>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

.graph{
  width: 100%;
  height: 600px;
}

</style>

<script lang='ts'>

import { Component, Watch, PropSync } from 'vue-property-decorator';
import _ from 'lodash';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class MarketingHistoricalGraph extends SubView {
  @PropSync('data') marketHistory!: MarketHistoryType[];

  private historyDates: string[] = [];

  private historyPrice: string[][] = [[]];

  private historyVolumn: number[] = [];

  private created() {
    console.log('history');
    this.historyToDatesAndPrice();
  }

  @Watch('marketHistory')
  private historyToDatesAndPrice() {
    this.historyDates = _.map(this.marketHistory, 'date');
    this.historyPrice = _.map(this.marketHistory, (data: MarketHistoryType) => [
      data.openingPrice,
      data.closingPrice,
      data.lowestPrice,
      data.highestPrice,
    ]);

    this.historyVolumn = _.map(this.marketHistory, 'volumn');
  }
}

</script>
