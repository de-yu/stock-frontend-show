<template>
  <div class="">
    <v-row class="ma-0 pa-0">
      <v-col class="ml-0 pl-0" xl="4" lg="4" cols="12">
        <v-row>
          <v-btn
          class="white ma-2 text-h6"
          active-class="blue darken-1 white--text"
          width="100px" height="100px"
          v-for="(type , index) in classificationType"
          :to="`/Classification/${type.type}`"
          v-html="type.name"
          :key="index" >
          </v-btn>
        </v-row>
      </v-col>
      <v-col class="white" xl="8" lg="8" cols="12" v-if="showTable">
        <div class="pa-6 white table-block">
         <v-data-table
            :headers="headers"
            :items="stocks"
            hide-default-footer
            disable-pagination
            class="elevation-0"
          >
          <template v-slot:item.id="{ item }">
            <router-link class="text-decoration-none" :to="`/MarketStockList/Stock/${item.market}/${item.id}`">
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
              <span>
                {{ item.capital }} 張
              </span>
            </template>
            <template v-slot:item.market="{ item }">
              {{ nameMap[item.market] }}
            </template>
          </v-data-table>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import ClassTypeEnum from '@/views/Classification/ClassEnum';
import { StockTypeName } from '@/enum/MainEnum';

@Component
export default class Classification extends Vue {
  @Action('marketStocksGql') marketStocksGql!: () => Promise<any>;

  @Action('marketStockSort') marketStockSort!: (type: string) => void;

  @Getter('getMarketStockSortList') getMarketStockSortList!: StockBasicType[];

  private showTable = false;

  private stocks: StockBasicType[] = [];

  protected nameMap = StockTypeName;

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

  private classificationType: ClassType[] = [
    {
      name: '成交<br/>排行',
      type: ClassTypeEnum.deal,
    },
    {
      name: '漲幅<br/>排行',
      type: ClassTypeEnum.rise,
    },
    {
      name: '跌幅<br/>排行',
      type: ClassTypeEnum.down,
    },
    {
      name: '震幅<br/>排行',
      type: ClassTypeEnum.wave,
    },
    {
      name: '水泥<br/>工業',
      type: ClassTypeEnum.cement,
    },
    {
      name: '食品<br/>工業',
      type: ClassTypeEnum.food,
    },
    {
      name: '塑膠<br/>工業',
      type: ClassTypeEnum.plastic,
    },
    {
      name: '建材<br/>營造業',
      type: ClassTypeEnum.build,
    },
    {
      name: '汽車<br/>工業',
      type: ClassTypeEnum.car,
    },
    {
      name: '其他業',
      type: ClassTypeEnum.other,
    },
    {
      name: '紡織<br/>纖維',
      type: ClassTypeEnum.textile,
    },
    {
      name: '貿易<br/>百貨業',
      type: ClassTypeEnum.department,
    },
    {
      name: '電子零<br/>組件業',
      type: ClassTypeEnum.electronicParts,
    },
    {
      name: '電機<br/>機械',
      type: ClassTypeEnum.mechanical,
    },
    {
      name: '生技<br/>醫療業',
      type: ClassTypeEnum.biologocal,
    },
    {
      name: '電器<br/>電纜',
      type: ClassTypeEnum.device,
    },
    {
      name: '化學<br/>工業',
      type: ClassTypeEnum.chemistry,
    },
    {
      name: '玻璃<br/>陶瓷',
      type: ClassTypeEnum.glass,
    },
    {
      name: '造紙<br/>工業',
      type: ClassTypeEnum.paper,
    },
    {
      name: '鋼鐵<br/>工業',
      type: ClassTypeEnum.steel,
    },
    {
      name: '橡膠<br/>工業',
      type: ClassTypeEnum.rubber,
    },
    {
      name: '航運業',
      type: ClassTypeEnum.shipping,
    },
    {
      name: '電腦及週邊<br/>設備業',
      type: ClassTypeEnum.computer,
    },
    {
      name: '半導體',
      type: ClassTypeEnum.semiconductor,
    },
    {
      name: '其他<br/>電子業',
      type: ClassTypeEnum.otherElectronic,
    },
    {
      name: '通信<br/>網路業',
      type: ClassTypeEnum.internet,
    },
    {
      name: '光電業',
      type: ClassTypeEnum.photoelectric,
    },
    {
      name: '電子<br/>通路業',
      type: ClassTypeEnum.electronicPath,
    },
    {
      name: '資訊<br/>服務業',
      type: ClassTypeEnum.information,
    },
    {
      name: '油電<br/>燃氣業',
      type: ClassTypeEnum.energy,
    },
    {
      name: '觀光<br/>事業',
      type: ClassTypeEnum.sightseeing,
    },
    {
      name: '金融<br/>保險業',
      type: ClassTypeEnum.finance,
    },
  ];

  private async created() {
    this.setShow();
    await this.marketStocksGql();
    this.selectType();
  }

  @Watch('$route')
  private selectType() {
    this.setShow();
    this.marketStockSort(this.$route.params.type);
    this.getMarketStock();
  }

  private setShow() {
    this.showTable = typeof (this.$route.params.type) !== 'undefined';
  }

  private getMarketStock() {
    this.stocks = this.getMarketStockSortList;
  }
}
</script>
