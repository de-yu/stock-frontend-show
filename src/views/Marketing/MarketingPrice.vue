<template>
  <div>
    <v-row class="main-marketing-price ma-0">
      <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
        <v-skeleton-loader
          class="mx-auto"
          type="image,image"
          max-height="325px"
        ></v-skeleton-loader>
      </v-col>
      <transition name="fade" mode="out-in">
        <v-row class="ma-0" v-if="isFinish()">
          <v-col class="blue-grey lighten-2" sm="5" cols="12"  >
            <div class="white--text mt-10">
              <div class="text-h4 ml-10">收盤價</div>
            </div>
            <div class="white--text mt-4">
              <div class="text-h4 ml-10">{{ marketingData.closingPrice }}</div>
            </div>
          </v-col>
          <v-col class="white" sm="7" cols="12">
            <div class="price-data px-4">
              <div class="d-flex mb-3">
              <v-col  cols="6">
                <header-item name="開盤價" :value="marketingData.openingPrice"></header-item>
              </v-col>
              <v-col cols="6">
                <header-item name="收盤價" :value="marketingData.closingPrice"></header-item>
              </v-col>
              </div>
              <v-divider></v-divider>
              <div class="d-flex my-3">
                <v-col cols="6">
              <header-item name="最高價" :value="marketingData.highestPrice"></header-item>
              </v-col>
              <v-col cols="6">
              <header-item name="最低價" :value="marketingData.lowestPrice"></header-item>
              </v-col>
              </div>
              <v-divider></v-divider>
              <div class="d-flex mt-3">
                <v-col cols="6">
              <header-item class="mr-10"
                name="漲跌點數"
                :value="marketingData.pointOfMarket">
              </header-item>
              </v-col>
              <v-col cols="6">
              <header-item
                name="漲跌百分比"
                :value="`${marketingData.percentageOfMarket}%`">
              </header-item>
              </v-col>
              </div>
            </div>
          </v-col>
        </v-row>
      </transition>
    </v-row>
  </div>
</template>

<style scoped>

.main-marketing-price
{
  min-height: 325px;
  max-height: 600px;
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
import { Component, PropSync } from 'vue-property-decorator';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class MarketingPrice extends SubView {
  @PropSync('data') marketingData!: MarketingPrice;
}
</script>
