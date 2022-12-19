<template>
  <div>
    <v-row class="main-marketing-price ma-0">
      <v-col class="blue-grey lighten-2" cols="5">
        <div class="white--text mt-10">
          <div class="text-h3 ml-10">{{ stockData.id }}</div>
        </div>
        <div class="white--text mt-4">
          <div class="text-h3 ml-10">{{ stockData.name }}</div>
        </div>
      </v-col>
      <v-col class="white" cols="7">
        <div class="price-data px-4">
          <div class="d-flex mb-3">
            <v-col cols="6">
              <header-item name="開盤價" :value="stockData.openingPrice"></header-item>
            </v-col>
            <v-col cols="6">
              <header-item name="收盤價" :value="stockData.closingPrice"></header-item>
            </v-col>
          </div>
          <v-divider></v-divider>
          <div class="d-flex my-3">
            <v-col cols="6">
              <header-item name="最高價" :value="stockData.highestPrice"></header-item>
            </v-col>
            <v-col cols="6">
              <header-item name="最低價" :value="stockData.lowestPrice"></header-item>
            </v-col>
          </div>
          <v-divider></v-divider>
          <div class="d-flex mt-3">
            <v-col cols="6">
              <header-item class="mr-10" name="漲跌點數" :value="stockData.diffPrice"></header-item>
            </v-col>
            <v-col cols="6">
              <header-item name="漲跌百分比" :value="`${stockData.diffOfPercentage}%`"></header-item>
            </v-col>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.main-marketing-price
{
  height: 325px;
}

.price-data
{
  position: relative;
  top:50%;
  transform: translateY(-50%);
}

.text-h3
{
  font-size: 3.75rem !important;
}

</style>

<script lang="ts">
import {
  Vue, Component, PropSync,
} from 'vue-property-decorator';

@Component
export default class StockPrice extends Vue {
  @PropSync('data') stockData!: StockBasicType;
}
</script>
