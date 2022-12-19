<template>
   <div class="white">
    <div class="main-invest-mechanism-block">
      <v-row class="ma-0">
        <span class="text-h5">三大法人</span>
      </v-row>
      <div class="my-6">
        <header-item name="外資" :value="data.foreignInvestment" unit="張"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="my-6">
        <header-item name="投信" :value="data.credit" unit="張"></header-item>
      </div>
      <v-divider></v-divider>
      <div class="my-6">
        <header-item name="自營商" :value="data.selfEmployed" unit="張"></header-item>
      </div>
       <v-divider></v-divider>
      <div class="my-6">
        <header-item name="總計" :value="data.threeMechanism" unit="張"></header-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-invest-mechanism-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class StockInvestmentMechanism extends Vue {
  @Prop() data!: StockInvestmentMechanismType[];
}
</script>
