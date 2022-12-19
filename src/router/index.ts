import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Marketing from '@/views/Marketing/Marketing.vue';
import Classification from '@/views/Classification/Classification.vue';
import StockList from '@/views/StockList/StockList.vue';
import Stock from '@/views/Stock/Stock.vue';
import TracingStock from '@/views/TracingStock/TracingStock.vue';
import StockOverview from '@/views/StockOverview/StockOverview.vue';
import InvestmentMechanismSummary from '@/views/StockOverview/InvestmentMechanismSummary.vue';
import TransactionRank from '@/views/StockOverview/TransactionRank.vue';
import StockRecord from '@/views/StockRecord/StockRecord.vue';
import StockPoint from '@/views/Point/Point.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Marketing',
    component: Marketing,
  },
  {
    path: '/Marketing',
    name: 'Marketing',
    component: Marketing,
  },
  {
    path: '/Classification',
    name: 'Classification',
    component: Classification,
  },
  {
    path: '/Classification/:type',
    name: 'Classification',
    component: Classification,
  },
  {
    path: '/MarketStockList',
    name: 'MarketStockList',
    component: StockList,
  }, {
    path: '/CabinetStockList',
    name: 'CabinetStockList',
    component: StockList,
  },
  {
    path: '/MarketStockList/Stock/:type/:id',
    name: 'Stock',
    component: Stock,
  },
  {
    path: '/Stock/:id',
    name: 'Stock',
    component: Stock,
  },
  {
    path: '/TracingStock',
    name: 'TracingStock',
    component: TracingStock,
  },
  {
    path: '/StockOverview/',
    component: StockOverview,
    children: [
      {
        path: 'InvestmentMechanismSummary',
        name: 'InvestmentMechanismSummary',
        component: InvestmentMechanismSummary,
      },
      {
        path: 'TransactionRank',
        name: 'TransactionRank',
        component: TransactionRank,
      },
    ],
  },
  {
    path: '/StockRecord/',
    component: StockRecord,
  },
  {
    path: '/StockPoint/',
    component: StockPoint,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
