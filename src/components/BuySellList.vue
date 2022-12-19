<template>
  <div>
    <v-col class="mt-8 text-h6"> {{ header }} </v-col>
    <v-divider></v-divider>
    <ol class="pl-0">
      <li class="d-flex text-left" v-for="(item , index) in data" :key="index">
        <v-col cols="1">{{ index + 1 }}.</v-col>
        <v-col cols="7">
          <router-link class="text-decoration-none" :to='path(item.id)'>
            {{ item.id }} {{item.name}}
          </router-link>
        </v-col>
        <v-col cols="4">{{ item[type]}} 張</v-col>
      </li>
    </ol>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BuySellList extends Vue {
  @Prop({ default: '' }) header!: string;

  @Prop({ default: '' }) type!: string;

  @Prop({ default: [] }) data!: StockInvestmentMechanismType[];

  @Prop({ default: '/MarketStockList/Stock/market/' }) stockPath: string;

  private path(stockId: string) {
    return `${this.stockPath}${stockId}`;
  }
}
</script>
