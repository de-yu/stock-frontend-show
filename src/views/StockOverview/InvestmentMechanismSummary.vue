<template>
  <div class="white invest-block">
    <v-row>
      <v-col cols="12">
        <span>三大法人買賣超排名</span>
      </v-col>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
        >
          <v-tab
            v-for="name in tabNames"
            :key="name"
          >
            {{ name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col cols="6">
                <BuySellList header="買進"
                type="foreignInvestment"
                :data="execData.foreignInvestment.buy">
                </BuySellList>
              </v-col>
              <v-col cols="6">
                <BuySellList header="賣出"
                type="foreignInvestment"
                :data="execData.foreignInvestment.sell">
                </BuySellList>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
             <v-col cols="6">
                <BuySellList header="買進"
                type="credit"
                :data="execData.credit.buy">
                </BuySellList>
              </v-col>
              <v-col cols="6">
                <BuySellList header="賣出"
                type="credit"
                :data="execData.credit.sell">
                </BuySellList>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
               <v-col cols="6">
                <BuySellList header="買進"
                type="selfEmployed"
                :data="execData.selfEmployed.buy">
                </BuySellList>
              </v-col>
              <v-col cols="6">
                <BuySellList header="賣出"
                type="selfEmployed"
                :data="execData.selfEmployed.sell">
                </BuySellList>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
               <v-col cols="6">
                <BuySellList header="買進"
                type="threeMechanism"
                :data="execData.threeMechanism.buy">
                </BuySellList>
              </v-col>
              <v-col cols="6">
                <BuySellList header="賣出"
                type="threeMechanism"
                :data="execData.threeMechanism.sell">
                </BuySellList>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.invest-block
{
  width: 100%;
  height: 100%;
  padding: 24px 36px;
  margin: 0 auto;
}

</style>

<script lang="ts">
import {
  Vue, Component, Watch,
} from 'vue-property-decorator';
import _ from 'lodash';
import { Getter } from 'vuex-class';

@Component
export default class InvestmentMechanismSummary extends Vue {
  @Getter('getInvestMechanismSummary') getInvestMechanismSummary!: CommonObject;

  private tab = 3;

  private tabNames: string[] = ['外資', '投信', '自營商', '總計'];

  private execData = {
    foreignInvestment: {
      buy: [],
      sell: [],
    },
    credit: {
      buy: [],
      sell: [],
    },
    selfEmployed: {
      buy: [],
      sell: [],
    },
    threeMechanism: {
      buy: [],
      sell: [],
    },
  };

  private showRowSum = 50

  private created() {
    this.arrangeData();
  }

  @Watch('getInvestMechanismSummary')
  private arrangeData() {
    this.execData.foreignInvestment = {
      buy: _.reverse(this.getInvestMechanismSummary.foreignInvestment.slice(-this.showRowSum)),
      sell: this.getInvestMechanismSummary.foreignInvestment.slice(0, this.showRowSum),
    };

    this.execData.credit = {
      buy: _.reverse(this.getInvestMechanismSummary.credit.slice(-this.showRowSum)),
      sell: this.getInvestMechanismSummary.credit.slice(0, this.showRowSum),
    };

    this.execData.selfEmployed = {
      buy: _.reverse(this.getInvestMechanismSummary.selfEmployed.slice(-this.showRowSum)),
      sell: this.getInvestMechanismSummary.selfEmployed.slice(0, this.showRowSum),
    };

    this.execData.threeMechanism = {
      buy: _.reverse(this.getInvestMechanismSummary.threeMechanism.slice(-this.showRowSum)),
      sell: this.getInvestMechanismSummary.threeMechanism.slice(0, this.showRowSum),
    };
  }
}
</script>
