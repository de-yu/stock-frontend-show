<template>
  <div>
    <v-row>
      <v-col xl="6" lg="8" cols="12">
        <MarketingPrice :data="getMarketPrice" ref="marketingPrice"></MarketingPrice>
      </v-col>
       <v-col xl="3" lg="4" md="6" sm="6" cols="12">
        <MarketDealInformation :data="getMarketDeal" ref="marketingDeal"></MarketDealInformation>
      </v-col>
      <v-col xl="3" lg="4" md="6" sm="6" cols="12">
        <MarketingRiseFall :data="getMarketRiseFall" ref="marketRiseFall"></MarketingRiseFall>
      </v-col>
      <v-col xl="6" lg="8" md="12" sm="12" cols="12">
        <MarketingInvestmentMechanism
          :data="getMarketInvestmentMechanism" ref="marketInvestMechanism">
        </MarketingInvestmentMechanism>
      </v-col>
       <v-col cols="12">
        <MarketingHistoricalGraph
        :data="getMarketHistory"
        ref="markethistory">
        </MarketingHistoricalGraph>
      </v-col>
      <v-col cols="12">
        <MarketingBooleanPassage
        :data="getMarketHistory"
        ref="marketBoolean">
        </MarketingBooleanPassage>
      </v-col>
      <v-col xl="6" lg="8" md="12" sm="12" cols="12">
        <MarketStatistics
        :data="getMarketStatistic"
        ref="marketStatistics">
        </MarketStatistics>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.graph{
  width: 100%;
  height: 600px;
}

</style>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import MarketingPrice from '@/views/Marketing/MarketingPrice.vue';
import DealInformation from '@/views/Marketing/DealInformation.vue';
import MarketingRiseFall from '@/views/Marketing/MarketingRiseFall.vue';
import MarketingHistoricalGraph from '@/views/Marketing/MarketingHistoricalGraph.vue';
import MarketingBooleanPassage from '@/views/Marketing/MarketingBooleanPassage.vue';
import MarketStatistics from '@/views/Marketing/MarketStatistics.vue';
import MarketingInvestmentMechanism from '@/views/Marketing/MarketingInvestmentMechanism.vue';

Vue.component('MarketingPrice', MarketingPrice);
Vue.component('MarketDealInformation', DealInformation);
Vue.component('MarketingRiseFall', MarketingRiseFall);
Vue.component('MarketingHistoricalGraph', MarketingHistoricalGraph);
Vue.component('MarketingBooleanPassage', MarketingBooleanPassage);
Vue.component('MarketStatistics', MarketStatistics);
Vue.component('MarketingInvestmentMechanism', MarketingInvestmentMechanism);

@Component
export default class Marketing extends Vue {
  @Action('marketingGql') marketingGql!: () => Promise<any>;

  @Getter('getMarketPrice') getMarketPrice !: MarketingPriceType;

  @Getter('getMarketDeal') getMarketDeal!: MarketDealType;

  @Getter('getMarketHistory') getMarketHistory!: MarketHistoryType[];

  @Getter('getMarketRiseFall') getMarketRiseFall!: MarketRiseFallType;

  @Getter('getMarketStatistic') getMarketStatistic!: MarketStatisticType[];

  @Getter('getMarketInvestmentMechanism') getMarketInvestmentMechanism!: MarketInvestmentMechanismType[];

  @Ref() readonly marketingPrice!: MarketingPrice;

  @Ref() readonly marketingDeal!: DealInformation;

  @Ref() readonly marketRiseFall!: MarketingRiseFall;

  @Ref() readonly marketInvestMechanism!: MarketingInvestmentMechanism;

  @Ref() readonly markethistory!: MarketingHistoricalGraph;

  @Ref() readonly marketBoolean!: MarketingBooleanPassage;

  @Ref() readonly marketStatistics!: MarketStatistics;

  private dialog = true;

  private created() {
    this.marketingGql().then(() => {
      this.showMarketPrice();
      this.dialog = false;
    });
  }

  private showMarketPrice() {
    this.marketingPrice.toSubViewFinish();
    this.marketingDeal.toSubViewFinish();
    this.marketRiseFall.toSubViewFinish();
    this.marketInvestMechanism.toSubViewFinish();
    this.markethistory.toSubViewFinish();
    this.marketBoolean.toSubViewFinish();
    this.marketStatistics.toSubViewFinish();
  }

  private mounted() {
    window.onresize = () => {
      window.dispatchEvent(new Event('window:resize'));
    };
  }
}
</script>
