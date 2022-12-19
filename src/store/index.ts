import Vue from 'vue';
import Vuex from 'vuex';

import marketing from '@/store/Marketing';
import stockStore from '@/store/Stock';
import member from '@/store/Member';
import tracingStock from '@/store/TracingStock';
import noteStore from '@/store/Note';
import stockRecordStore from '@/store/StockRecord';
import PointStore from '@/store/Point';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    marketing,
    stockStore,
    member,
    tracingStock,
    noteStore,
    stockRecordStore,
    PointStore,
  },
});
