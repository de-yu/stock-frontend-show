import HeaderItem from '@/components/HeaderItem.vue';
import StatisticsTable from '@/components/StatisticsTable.vue';
import HistoricalStockGraph from '@/components/HistoricalStockGraph.vue';
import BooleanPassageGraph from '@/components/BooleanPassageGraph.vue';
import BuySellList from '@/components/BuySellList.vue';

export default {
  install(Vue: any) {
    Vue.component('header-item', HeaderItem);
    Vue.component('statistics-table', StatisticsTable);
    Vue.component('HistoricalStockGraph', HistoricalStockGraph);
    Vue.component('BooleanPassageGraph', BooleanPassageGraph);
    Vue.component('BuySellList', BuySellList);
  },
};
