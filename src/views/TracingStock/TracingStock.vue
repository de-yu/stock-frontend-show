<template>
  <div class="">
    <template v-if="isAuthorityShow(MemberEnum.normal)">
    <v-row v-if="isLoading()">
      <v-col cols="4">
        <v-skeleton-loader
          class="mx-auto pa-4"
          type="card"
          max-height="325px"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-if="isFinish()">

      <router-link class="text-decoration-none grey--text text--darken-3  pa-2"
          v-for="(stock , index) in getTracingStock" :key="index" :to="`./Stock/${stock.id}`">
        <v-col cols="4">
          <div class="stock-item white">
            <div class="pa-4">
              <v-row class="mt-0 mx-0 mb-4">
                <div class="text-h5">{{ stock.id }}</div>
                <v-spacer></v-spacer>
                <div class="text-h5">{{ stock.name }}</div>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-6 mx-0 mb-6">
                <div class="mr-6 text-h5">收盤價</div>
                <v-spacer></v-spacer>
                <div class="text-h5">{{ stock.closingPrice }}</div>
              </v-row>
              <v-row class="mt-6 mx-0 mb-6">
                  <div class="text-h4" :class="varyColor(stock.diffPrice)">
                    {{ stock.diffPrice }}
                  </div>
                  <v-spacer></v-spacer>
                  <div class="text-h4" :class="varyColor(stock.diffOfPercentage)">
                    {{ stock.diffOfPercentage }}%
                  </div>
              </v-row>
            </div>
          </div>
        </v-col>
      </router-link>

    </v-row>
    </template>
    <v-row class="ma-0 pa-0" v-else>
      <div class="text-h4">您尚未登入</div>
    </v-row>
  </div>
</template>
<style scoped>

.tracing-stock
{
  width: 960px;
}

.stock-item
{
  width:350px;
  height:200px;
}

</style>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import SubView from '@/views/SubViewClass/SubView.vue';
import { LoginStateEnum } from '@/enum/MainEnum';

@Component
export default class TracingStock extends SubView {
  @Action('tracingStock') tracingStock !: () => Promise<any>;

  @Getter('getTracingStock') getTracingStock!: StockBasicType[];

  @Getter('getLoginState') getLoginState!: LoginStateEnum;

  private created() {
    this.tracingStockAction();
  }

  @Watch('getLoginState')
  private tracingStockAction() {
    if (this.getLoginState === LoginStateEnum.alreadyLogin) {
      this.tracingStock();
    }
  }

  @Watch('getTracingStock')
  private show() {
    this.toSubViewFinish();
  }
}
</script>
