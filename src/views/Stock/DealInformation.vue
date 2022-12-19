<template>
  <div class="main-deal white">
    <div class="main-deal-block">
      <v-row class="ma-0">
        <span class="text-h5">成交資訊</span>
      </v-row>
      <div class="my-6">
        <header-item name="成交金額" :value="data.tradingVolumn" unit="億元"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="my-6">
      <header-item name="成交股數" :value="data.tradingShares" unit="張"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="mt-6">
      <header-item name="成交筆數" :value="data.tradingUnits" unit="筆"></header-item>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-deal
{
  height: 325px;
}

.main-deal-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DealInformation extends Vue {
  @Prop() data!: StockDealType;
}
</script>
