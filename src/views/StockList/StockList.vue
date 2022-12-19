<template>
  <div class="">
    <div class="d-flex search-block">
      <v-text-field flat solo v-model="keyword" @keyup.enter="filterStocks"></v-text-field>
      <v-btn class="white rounded-0" large depressed height="48px" @click="filterStocks">
        <v-icon>
        {{mdiMagnify}}
        </v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col cols="12" v-if="isLoading()">
        <v-skeleton-loader
          class="mx-auto pa-4"
          type="table"
          max-height="500px"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" v-if="isFinish()">
        <div class="pa-6 white table-block">
         <v-data-table
            :headers="headers"
            :items="stocks"
            hide-default-footer
            disable-pagination
            class="elevation-0"
          >
          <template v-slot:item.id="{ item }">
            <router-link class="text-decoration-none" :to="`/MarketStockList/Stock/${item.market}/${item.id}`" target="_blank">
              <span>
                {{ item.id }}
              </span>
            </router-link>
            </template>
            <template v-slot:item.tradingShares="{ item }">
              <span>
                {{ item.tradingShares }} 張
              </span>
            </template>
           <template v-slot:item.diffPrice="{ item }">
              <span :class="varyColor(item.diffPrice)">
                <span v-show="item.diffPrice > 0">+</span>
                {{ item.diffPrice }}
              </span>
            </template>
            <template v-slot:item.diffOfPercentage="{ item }">
              <span :class="varyColor(item.diffPrice)">
                <span v-show="item.diffOfPercentage > 0">+</span>
                {{ item.diffOfPercentage }} %
              </span>
            </template>
            <template v-slot:item.capital="{ item }">
              {{ item.capital }} 張
            </template>
            <template v-slot:item.market="{item}">
              {{ nameMap[item.market] }}
            </template>

          </v-data-table>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.search-block
{
  max-width: 500px;
}
</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import SubView from '@/views/SubViewClass/SubView.vue';
import { Action, Getter } from 'vuex-class';
import { mdiMagnify } from '@mdi/js';
import _ from 'lodash';
import { StockTypeName } from '@/enum/MainEnum';

@Component
export default class StockList extends SubView {
  @Action('marketStocksGql') marketStocksGql!: () => Promise<any>;

  @Getter('getMarketStockList') getMarketStockList!: StockBasicType[];

  private keyword = '';

  private mdiMagnify = mdiMagnify;

  private headers = [
    {
      text: '證券代號',
      align: 'start',
      sortable: false,
      value: 'id',
    },
    {
      text: '證券名稱',
      sortable: false,
      value: 'name',
    },
    {
      text: '證券類型',
      sortable: false,
      value: 'type',
    },
    { text: '開盤價', value: 'openingPrice' },
    { text: '最高價', value: 'highestPrice' },
    { text: '最低價', value: 'lowestPrice' },
    { text: '收盤價', value: 'closingPrice' },
    { text: '漲跌價差', value: 'diffPrice' },
    { text: '漲跌百分比', value: 'diffOfPercentage' },
    { text: '成交量', value: 'tradingShares' },
    { text: '股本', value: 'capital' },
    { text: '市場', value: 'market' },
  ];

  private stocks: StockBasicType[] = [];

  protected nameMap = StockTypeName;

  private created() {
    this.marketStocksGql().then(() => {
      this.stockListProcess();
    });
  }

  @Watch('getMarketStockList')
  private stockListProcess() {
    this.stocks = this.getMarketStockList;
    this.toSubViewFinish();
  }

  private filterStocks() {
    if (this.keyword === '') {
      this.stocks = this.getMarketStockList;
    } else {
      this.stocks = _.filter(this.getMarketStockList,
        (stock: StockBasicType) => stock.id.includes(this.keyword));
    }
  }
}
</script>
