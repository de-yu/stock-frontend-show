<template>
  <div class="white">
    <div class="main-revenue-block">
      <v-row class="ma-0">
        <span class="text-h5">每月營收</span>
      </v-row>
      <div class="my-6">
        <header-item name="營收月份" :value="data.date"></header-item>
      </div>
      <div class="my-6">
        <header-item name="當月營收" :value="data.nowMonthRevenue"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="上月營收" :value="data.previousMonthRevenue"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="去年同期營收" :value="data.previousYearRevenue"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="月增率" :value="data.previousMonthChangeRate"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="年增率" :value="data.previousYearChangeRate"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="累計營收" :value="data.accumulation"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="去年同期累計" :value="data.previousAccumulation"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="累計營收年增率" :value="data.accumulationChangeRate"></header-item>
      </div>
      <div class="mt-6">
        <header-item name="備註" :value="data.remark"></header-item>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-revenue-block
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
export default class StockMonthRevenue extends Vue {
  @Prop() data!: StockMonthRevenueType;
}
</script>
