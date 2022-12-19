<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-btn text x-large outlined @click="addNewRecord">
          <span>+ 新增分類 </span>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="white pa-3" v-for="(record, key) in tempData" :key="key">
      <v-col cols="12">
        <v-row>
           <v-col cols="11">
             <span class="text-h6">{{ record.title }}</span>
           </v-col>
           <v-col cols="1">
             <span class="text-h6" @click="del(key)">DEL</span>
           </v-col>
        </v-row>
        <v-row v-for="(item, index) in record.items" :key="index">
           <v-col cols="2">
             <router-link class="text-decoration-none" :to="findHref(item.stock)" target="_blank">
              <span class="text-h6">{{ findName(item.stock) }}</span>
             </router-link>
           </v-col>
           <v-col cols="10">
             <span class="text-h6">{{ item.factor }}</span>
           </v-col>
        </v-row>
        <v-row>
           <v-col cols="12">
              <v-btn text x-large outlined @click="showAddRecordAction(key)">
                 <span>+ 新增股票</span>
              </v-btn>
           </v-col>
        </v-row>
        <div class="pa-3 mt-3" v-if="showAddRecord === key">
          <v-row>
            <v-row>
              <v-col cols="2">
                <v-autocomplete
                  label="股票"
                  outlined
                  :items="getMarketStockName"
                  v-model="tempStock"
                ></v-autocomplete>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  label="理由"
                  outlined
                  v-model="tempFactor"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-row>
          <v-row>
            <v-btn class="mr-4" text large outlined @click="cancel">
              <span>取消</span>
            </v-btn>
            <v-btn text large outlined @click="addNewRecordItem(key)">
              <span>確定</span>
            </v-btn>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-btn class="mr-4 mt-6" text large outlined @click="save">
      <span>儲存</span>
    </v-btn>
  </div>
</template>
<style scoped>

</style>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import SubView from '@/views/SubViewClass/SubView.vue';
import moment from 'moment';
import _ from 'lodash';

@Component
export default class StockRecord extends SubView {
  @Action('marketStocksGql') marketStocksGql!: () => Promise<any>;

  @Action('getStockRecord') getStockRecord !: () => Promise<any>;

  @Action('updateStockRecord') updateStockRecord !: (content: string) => Promise<any>;

  @Getter('recordData') recordData!: StockRecordData[];

  @Getter('getMarketStockName') getMarketStockName!: SelectItem[];

  @Getter('getMarketStockList') getMarketStockList!: StockBasicType[];

  public tempData: StockRecordData[] = [];

  public tempStock = '';

  public tempFactor = '';

  public showAddRecord = -1;

  private created() {
    this.marketStocksGql();
    this.getStockRecord();
  }

  @Watch('recordData')
  private toTempData() {
    this.tempData = _.cloneDeep(this.recordData);
  }

  private addNewRecord() {
    this.tempData.push({
      title: moment().format('MM/DD'),
      items: [],
    });
  }

  private addNewRecordItem(index: number) {
    this.tempData[index].items.push({
      stock: this.tempStock,
      factor: this.tempFactor,
    });
  }

  private findName(id: string): string {
    return _.find(this.getMarketStockName, { value: id }).text;
  }

  private findHref(id: string): string {
    const stock = _.find(this.getMarketStockList, { id });
    return `/MarketStockList/Stock/${stock.market}/${stock.id}`;
  }

  private cancel() {
    this.tempStock = '';
    this.tempFactor = '';
    this.showAddRecord = -1;
  }

  private del(index: number) {
    this.tempData.splice(index, 1);
  }

  private showAddRecordAction(index: number) {
    this.showAddRecord = index;
  }

  private save() {
    this.updateStockRecord(JSON.stringify(this.tempData));
  }
}
</script>
