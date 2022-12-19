<template>
  <div>
    <v-row class="mb-4">
      <div class="d-table ml-3 mb-4 mt-4">
        <v-tabs v-model="tabModel">
          <v-tabs-slider color="transparent"></v-tabs-slider>
          <v-tab active-class="tab-header">資訊</v-tab>
          <v-tab active-class="tab-header">筆記</v-tab>
        </v-tabs>
      </div>
      <v-spacer></v-spacer>
      <div class="d-table mx-3 my-4" v-if="isAuthorityShow(MemberEnum.normal)">
        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <v-btn color="transparent" depressed width="48px" height="48px" v-on="on">
            <v-icon>{{ mdiMenu }}</v-icon>
            </v-btn>
          </template>
          <v-list >
            <v-list-item link @click="tracingStockClick">
              <v-list-item-content>
              <v-list-item-title> 追蹤股票 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>
    <v-tabs-items class="transparent" v-model="tabModel">
      <v-tab-item class="transparent">
        <v-row>
          <v-col sm="6" cols="12">
            <StockPrice :data="getMarketStockDetail"></StockPrice>
          </v-col>
          <v-col sm="3" cols="12">
            <DealInformation :data="getMarketStockDetail"></DealInformation>
          </v-col>
          <v-col sm="3" cols="12">
            <StockInvestmentMechanism :data="getMarketStockInvestMechanism">
            </StockInvestmentMechanism>
          </v-col>
          <v-col cols="12">
            <StockHistoricalGraph :data="getMarketStockHistory"></StockHistoricalGraph>
          </v-col>
          <v-col cols="12">
            <StockBooleanPassage :data="getMarketStockHistory"></StockBooleanPassage>
          </v-col>
          <v-col sm="6" cols="12">
            <StockMonthRevenue :data="getMarketStockMonthRevenue"></StockMonthRevenue>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <StockNotes></StockNotes>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style scoped>

.tab-header
{
  background:#E0E0E0;
  text-decoration: none;
  color: #616161;
  border: 0;
}

</style>

<script lang="ts">
import {
  Vue, Component,
} from 'vue-property-decorator';
import store from '@/store/index';
import { Action, Getter } from 'vuex-class';
import { mdiMenu } from '@mdi/js';
import { StockType } from '@/enum/MainEnum';
import DealInformation from '@/views/Stock/DealInformation.vue';
import StockPrice from '@/views/Stock/StockPrice.vue';
import StockHistoricalGraph from '@/views/Stock/StockHistoricalGraph.vue';
import StockBooleanPassage from '@/views/Stock/StockBooleanPassage.vue';
import StockMonthRevenue from '@/views/Stock/StockMonthRevenue.vue';
import StockInvestmentMechanism from '@/views/Stock/StockInvestmentMechanism.vue';
import SubView from '@/views/SubViewClass/SubView.vue';
import StockNotes from '@/views/Stock/StockNotes.vue';

Vue.component('DealInformation', DealInformation);
Vue.component('StockPrice', StockPrice);
Vue.component('StockHistoricalGraph', StockHistoricalGraph);
Vue.component('StockBooleanPassage', StockBooleanPassage);
Vue.component('StockMonthRevenue', StockMonthRevenue);
Vue.component('StockInvestmentMechanism', StockInvestmentMechanism);
Vue.component('StockNotes', StockNotes);

@Component({

  beforeRouteLeave(to: any, from: any, next: any) {
    store.dispatch('clearMarketStock');
    next();
  },
  setup() {
    return {
      mdiMenu,
    };
  },
})
export default class Stock extends SubView {
  @Action('marketStockDetailGql') marketStockDetailGql!: (id: string) => void;

  @Action('cabinetStockDetailGql') cabinetStockDetailGql!: (id: string) => void;

  @Action('updateTracingStock') updateTracingStock!: (id: string) => void;

  @Action('clearMarketStock') clearMarketStock!: () => void

  @Getter('getMarketStockDetail') getMarketStockDetail!: StockBasicType;

  @Getter('getMarketStockHistory') getMarketStockHistory!: StockHistoryType[];

  @Getter('getMarketStockMonthRevenue') getMarketStockMonthRevenue!: StockMonthRevenueType;

  @Getter('getMarketStockInvestMechanism') getMarketStockInvestMechanism!: StockInvestmentMechanismType;

  private historyDates: string[] = [];

  private historyPrice: string[][] = [[]];

  private tabModel = 0;

  private created() {
    if (this.$route.params.type === StockType.market) {
      this.marketStockDetailGql(this.$route.params.id);
    } else if (this.$route.params.type === StockType.cabinet) {
      this.cabinetStockDetailGql(this.$route.params.id);
    }
  }

  private tracingStockClick() {
    this.updateTracingStock(this.$route.params.id);
  }

  private mounted() {
    window.onresize = () => {
      window.dispatchEvent(new Event('window:resize'));
    };
  }
}
</script>
