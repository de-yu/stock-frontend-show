<template>
  <div class="marketing-statistics white">
    <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
      <v-skeleton-loader
        class="mx-auto pa-4"
        type="table"
        max-height="550px"
      ></v-skeleton-loader>
    </v-col>
    <transition name="fade" mode="out-in" v-else>
    <div class="marketing-statistics-block">
      <v-row class="ma-0 mb-4">
        <span class="text-h5">各類指數</span>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
      >

       <template v-slot:item.pointOfMarket="{ item }">
        <span :class="varyColor(item.pointOfMarket)">
          {{ item.pointOfMarket }}
        </span>
      </template>
      <template v-slot:item.percentageOfMarket="{ item }">
        <span :class="varyColor(item.percentageOfMarket)">
          {{ item.percentageOfMarket }} %
        </span>
      </template>

      </v-data-table>
    </div>
    </transition>
  </div>
</template>

<style scoped>

.marketing-statistics-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class MarketStatistics extends SubView {
  @Prop() data!: MarketStatisticType[];

  private headers = [
    {
      text: '名稱',
      align: 'start',
      sortable: false,
      value: 'marketName',
    },
    {
      text: '收盤價',
      value: 'closingPrice',
    },
    {
      text: '漲跌點數',
      value: 'pointOfMarket',
    },
    {
      text: '漲跌百分比',
      value: 'percentageOfMarket',
    },
  ]
}
</script>
