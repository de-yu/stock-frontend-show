<template>
  <div class="main-deal white">
    <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
      <v-skeleton-loader
        class="mx-auto pa-4"
        type="card-heading,list-item@4"
        height="300px"
      ></v-skeleton-loader>
    </v-col>
    <transition name="fade" mode="out-in" v-else>
     <div class="marketing-investment-mechanism-block">
      <v-row class="ma-0 mb-4">
        <span class="text-h5">三大法人</span>
      </v-row>
      <statistics-table :headers="headers" :data="data"></statistics-table>
    </div>
    </transition>
  </div>
</template>

<style scoped>
.marketing-investment-mechanism-block {
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
export default class MarketingInvestmentMechanism extends SubView {
  @PropSync('data') marketInvestmentMechanism!: MarketInvestmentMechanismType[];

  private headers: TableHeader[] = [
    {
      name: '名稱',
      objectName: 'name',
      unit: '',
    },
    {
      name: '買進',
      objectName: 'buy',
      unit: '億',
    }, {
      name: '賣出',
      objectName: 'sell',
      unit: '億',
    }, {
      name: '合計',
      objectName: 'gap',
      unit: '億',
    },
  ];
}
</script>
