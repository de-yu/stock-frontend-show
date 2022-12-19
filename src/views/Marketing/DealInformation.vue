<template>
  <div class="main-deal white">
    <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
      <v-skeleton-loader
        class="mx-auto pa-4"
        type="article,list-item-three-line"
        max-height="325px"
      ></v-skeleton-loader>
    </v-col>
    <transition name="fade" mode="out-in" v-else>
    <div class="main-deal-block" v-if="isFinish()">
      <v-row class="ma-0">
        <span class="text-h5">成交資訊</span>
      </v-row>
      <div class="my-6">
        <header-item name="成交金額" :value="marketDeal.dealSumOfMoney" unit=" 億元"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="my-6">
      <header-item name="成交股數" :value="marketDeal.dealSumOfShare" unit=" 億股"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="mt-6">
      <header-item name="成交筆數" :value="marketDeal.dealSumOfTransaction"></header-item>
      </div>
    </div>
    </transition>
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
import { Component, PropSync } from 'vue-property-decorator';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class DealInformation extends SubView {
  @PropSync('data') marketDeal!: MarketDealType;
}
</script>
