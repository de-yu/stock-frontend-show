<template>
  <div class="">
    <div class="">
      <v-row class="ma-0">
        <span class="text-h5">關鍵點</span>
      </v-row>
    </div>
    <v-row>
       <v-col cols="12" v-if="isLoading()">
        <v-skeleton-loader
          class="mx-auto pa-4"
          type="table"
          max-height="500px"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" v-if="isFinish()">
        <div class="pa-6 white table-block">
         <v-data-table
            :headers="headers"
            :items="pointList"
            hide-default-footer
            disable-pagination
            class="elevation-0"
          >
            <template v-slot:item.id="{ item }">
            <router-link class="text-decoration-none" :to="`/MarketStockList/Stock/${item.market}/${item.id}`" target="_blank">
              <span>
                {{ item.id }}
              </span>
            </router-link>
            </template>
            <template v-slot:item.priceDiff="{ item }">
              <span :class="varyColor(item.priceDiff)">
                {{ item.priceDiff }}%
              </span>
            </template>
          </v-data-table>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class Point extends SubView {
  @Action('marketStocksGql') marketStocksGql!: () => Promise<any>;

  @Action('getPointList') getPointList!: () => Promise<any>;

  @Getter('pointList') pointList !: CriticalPoint;

    private headers = [
      {
        text: '證券代號',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: '證券名稱',
        sortable: false,
        value: 'name',
      },
      {
        text: '關鍵點',
        sortable: false,
        value: 'point',
      },
      {
        text: '關鍵點差',
        sortable: true,
        value: 'priceDiff',
      },
      {
        text: '價格',
        sortable: true,
        value: 'price',
      },
    ];

    private created() {
      this.marketStocksGql().then(() => this.getPointList()).then(() => {
        this.showPoint();
      });
    }

  @Watch('pointList')
    private showPoint() {
      this.toSubViewFinish();
    }
}
</script>
