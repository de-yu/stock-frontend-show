<template>
  <div class="">
    <v-row>
      <v-col cols="12">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class StockOverview extends Vue {
  @Action('marketStockVolumnRank') marketStockVolumnRank !: () => Promise<any>;

  @Action('investmentMechanism') investmentMechanism!: () => Promise<any>;

  @Getter('getMarketStockVolumnRank') getMarketStockVolumnRank!: StockVolumnRankType[];

  private created() {
    this.marketStockVolumnRank();
    this.investmentMechanism();
  }

  private mounted() {
    window.onresize = () => {
      window.dispatchEvent(new Event('window:resize'));
    };
  }
}
</script>
