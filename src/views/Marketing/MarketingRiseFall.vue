<template>
  <div class="marketing-rise-fall white">
        <v-col class="ma-0 pa-0 white" cols="12" v-if="isLoading()">
      <v-skeleton-loader
        class="mx-auto"
        type="article,list-item-three-line"
        max-height="325px"
      ></v-skeleton-loader>
    </v-col>
    <transition name="fade" mode="out-in" v-else>
      <div class="marketing-rise-fall-block">
        <v-row class="ma-0 mb-4">
          <span class="text-h5">漲跌證券數統計</span>
        </v-row>
        <statistics-table :headers="headers" :data="statisticsData"></statistics-table>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.marketing-rise-fall
{
  height: 325px;
}

.marketing-rise-fall-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import SubView from '@/views/SubViewClass/SubView.vue';

@Component
export default class MarketingRiseFall extends SubView {
  @Prop() data!: MarketRiseFallType;

  private headers: TableHeader[] = [
    {
      name: '類型',
      objectName: 'type',
      unit: '',
    },
    {
      name: '家數',
      objectName: 'sum',
      unit: '',
    },
  ];

  private statisticsData: CommonObject[] = [];

  private created() {
    this.passData();
  }

  @Watch('data')
  private passData() {
    this.statisticsData = [
      {
        type: '上漲',
        sum: this.data.sumOfRise,
      },
      {
        type: '漲停',
        sum: this.data.sumOfRiseLimit,
      },
      {
        type: '下跌',
        sum: this.data.sumOfDown,
      }, {
        type: '跌停',
        sum: this.data.sumOfDownLimit,
      }, {
        type: '持平',
        sum: this.data.sumOfEqual,
      },
    ];
  }
}
</script>
