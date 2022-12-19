import _ from 'lodash';
import GraphClient from '@/graphql/GraphQlClient';
import Query from '@/graphql/Query';
import { gql } from '@apollo/client';
import { shareExpress, numberExpress } from '@/utility/utility';
import ClassTypeEnum from '@/views/Classification/ClassEnum';

const stockStore = {
  state: {
    date: '',
    marketStockList: [],
    marketStockSortList: [],
    marketStockDetail: {
      id: '',
      name: '',
      type: '',
      openingPrice: 0,
      highestPrice: 0,
      lowestPrice: 0,
      closingPrice: 0,
      diffPrice: 0,
      diffOfPercentage: 0,
      tradingVolumn: 0,
      tradingShares: 0,
      tradingUnits: 0,
    },
    marketStockHistory: [],
    marketStockMonthRevenue: {
      date: '',
      id: '',
      nowMonthRevenue: 0,
      previousMonthRevenue: 0,
      previousYearRevenue: 0,
      previousMonthChangeRate: 0,
      previousYearChangeRate: 0,
      accumulation: 0,
      previousAccumulation: 0,
      accumulationChangeRate: 0,
      remark: '',
    },
    marketStockInvestmentMechanism: {
      id: '',
      foreignInvestment: 0,
      credit: 0,
      selfEmployed: 0,
      threeMechanism: 0,
    },
    marketStockVolumnRank: [],
    investMechanismSummary: [],
  },
  mutations: {
    setDate(state: any, date: string) {
      state.date = date;
    },
    setMarketStockList(state: any, stocks: StockBasicType[]) {
      state.marketStockList = stocks;
    },
    setMarketStockSortList(state: any, stocks: StockBasicType[]) {
      state.marketStockSortList = stocks;
    },
    setMarketStockDetail(state: any, stockBasic: StockBasicType) {
      state.marketStockDetail = stockBasic;
    },
    setMarketStockHistory(state: any, stockHistory: StockHistoryType[]) {
      state.marketStockHistory = stockHistory;
    },
    setMarketStockMonthRevenue(state: any, stockRevenue: StockMonthRevenueType) {
      state.marketStockMonthRevenue = stockRevenue;
    },
    setMarketStockInvestmentMechanism(state: any,
      stockInvestmentMechanism: StockInvestmentMechanismType) {
      state.marketStockInvestmentMechanism = stockInvestmentMechanism;
    },
    setMarketStockVolumnRank(state: any, stockVolumnRank: StockVolumnRankType) {
      state.marketStockVolumnRank = stockVolumnRank;
    },
    setInvestmentMechanismSummary(state: any, investSummary: StockInvestmentMechanismType[]) {
      state.investMechanismSummary = investSummary;
    },
  },
  actions: {
    async marketStocksGql({ commit }: any) {
      const response: any = await GraphClient.query({ query: gql`${Query.marketStockList}` });
      commit('setDate', response.data.marketStockList.date);
      commit('setMarketStockList', response.data.marketStockList.data.concat(response.data.cabinetStockList.data));
    },

    async marketStockDetailGql({ commit }: any, id: string) {
      const response: any = await GraphClient.query({
        query: gql`${Query.marketStock}`,
        variables: {
          id,
        },
      });
      commit('setMarketStockDetail', response.data.marketStock.data[0]);
      commit('setMarketStockHistory', response.data.marketStockHistory.data);
      commit('setMarketStockMonthRevenue', response.data.marketStockMonthRevenue.data[0]);
      commit('setMarketStockInvestmentMechanism', response.data.marketStockInvestmentMechanism.data[0]);
    },
    marketStockSort({ commit, state }: any, type: string) {
      const temp = _.cloneDeep(state.marketStockList);

      if (type === ClassTypeEnum.deal) {
        commit('setMarketStockSortList', _.reverse(_.sortBy(temp, 'tradingVolumn')));
      } else if (type === ClassTypeEnum.down) {
        commit('setMarketStockSortList', _.sortBy(temp, 'diffOfPercentage'));
      } else if (type === ClassTypeEnum.rise) {
        commit('setMarketStockSortList', _.reverse(_.sortBy(temp, 'diffOfPercentage')));
      } else if (type === ClassTypeEnum.wave) {
        commit('setMarketStockSortList', _.reverse(_.sortBy(temp, (stock: StockBasicType) => (stock.highestPrice - stock.lowestPrice) / stock.openingPrice)));
      } else {
        const group = _.groupBy(temp, (item: StockBasicType) => item.type);
        commit('setMarketStockSortList', group[type]);
      }
    },
    async marketStockVolumnRank({ commit }: any) {
      const response: any = await GraphClient.query({ query: gql`${Query.stockVolumnRank}` });
      commit('setMarketStockVolumnRank', response.data.marketStockVolumnRank.data);
    },
    async investmentMechanism({ commit }: any) {
      const response: any = await GraphClient.query({ query: gql`${Query.investmentMechanismSummary}` });
      commit('setInvestmentMechanismSummary', response.data.marketStockInvestmentMechanism.data);
    },
    clearMarketStock({ commit }: any) {
      commit('setMarketStockDetail', {
        id: '',
        name: '',
        type: '',
        openingPrice: 0,
        highestPrice: 0,
        lowestPrice: 0,
        closingPrice: 0,
        diffPrice: 0,
        diffOfPercentage: 0,
        tradingVolumn: 0,
        tradingShares: 0,
        tradingUnits: 0,
      });
      commit('setMarketStockHistory', []);
      commit('setMarketStockMonthRevenue', {});
      commit('setMarketStockInvestmentMechanism', {});
    },

    async cabinetStockDetailGql({ commit }: any, id: string) {
      const response: any = await GraphClient.query({
        query: gql`${Query.cabinetStock}`,
        variables: {
          id,
        },
      });
      commit('setMarketStockDetail', response.data.cabinetStock.data[0]);
      commit('setMarketStockHistory', response.data.cabinetStockHistory.data);
    },
  },
  getters: {
    getMarketStockList(state: any): StockBasicType[] {
      const temp = _.map(_.cloneDeep(state.marketStockList), (item: StockBasicType) => {
        const tempItem = _.cloneDeep(item);
        tempItem.tradingShares = shareExpress(tempItem.tradingShares);
        tempItem.diffOfPercentage = Number(item.diffOfPercentage.toFixed(2));
        tempItem.capital = shareExpress(item.capital);
        return tempItem;
      });

      return temp;
    },
    getMarketStockSortList(state: any): StockBasicType[] {
      const temp = _.map(_.cloneDeep(state.marketStockSortList), (item: StockBasicType) => {
        const tempItem = _.cloneDeep(item);
        tempItem.tradingShares = shareExpress(tempItem.tradingShares);
        tempItem.diffOfPercentage = Number(item.diffOfPercentage.toFixed(2));
        tempItem.capital = shareExpress(item.capital);
        return tempItem;
      });

      return temp;
    },
    getMarketStockDetail(state: any): StockBasicType {
      const temp: StockBasicType = {
        id: state.marketStockDetail.id,
        name: state.marketStockDetail.name,
        type: state.marketStockDetail.type,
        openingPrice: state.marketStockDetail.openingPrice.toFixed(2),
        highestPrice: state.marketStockDetail.highestPrice.toFixed(2),
        lowestPrice: state.marketStockDetail.lowestPrice.toFixed(2),
        closingPrice: state.marketStockDetail.closingPrice.toFixed(2),
        diffPrice: state.marketStockDetail.diffPrice,
        diffOfPercentage: state.marketStockDetail.diffOfPercentage.toFixed(2),
        tradingVolumn: numberExpress(state.marketStockDetail.tradingVolumn),
        tradingShares: shareExpress(state.marketStockDetail.tradingShares),
        tradingUnits: state.marketStockDetail.tradingUnits,
        capital: shareExpress(state.marketStockDetail.capital),
        market: '',
      };

      return temp;
    },
    getMarketStockHistory(state: any) {
      const temp = _.map(_.cloneDeep(state.marketStockHistory), (item: StockHistoryType) => {
        const tempItem = _.cloneDeep(item);
        tempItem.volumn = shareExpress(tempItem.volumn);
        return tempItem;
      });
      return temp;
    },
    getMarketStockMonthRevenue(state: any) {
      return state.marketStockMonthRevenue;
    },
    getMarketStockInvestMechanism(state: any): StockInvestmentMechanismType {
      const temp: StockInvestmentMechanismType = {
        id: state.marketStockInvestmentMechanism.id,
        name: '',
        foreignInvestment: shareExpress(state.marketStockInvestmentMechanism.foreignInvestment),
        credit: shareExpress(state.marketStockInvestmentMechanism.credit),
        selfEmployed: shareExpress(state.marketStockInvestmentMechanism.selfEmployed),
        threeMechanism: shareExpress(state.marketStockInvestmentMechanism.threeMechanism),
      };

      return temp;
    },
    getMarketStockVolumnRank(state: any): StockVolumnRankType[] {
      const temp = _.map(_.cloneDeep(state.marketStockVolumnRank), (item: StockVolumnRankType) => {
        const tempItem = _.cloneDeep(item);
        tempItem.name = item.type;
        tempItem.value = item.tradingVolumnPoint.toFixed(2);
        return tempItem;
      });

      return temp;
    },
    getInvestMechanismSummary(state: any): CommonObject {
      const summary = _.map(_.cloneDeep(state.investMechanismSummary),
        (item: StockInvestmentMechanismType) => {
          const tempItem = _.cloneDeep(item);
          tempItem.foreignInvestment = shareExpress(item.foreignInvestment);
          tempItem.credit = shareExpress(item.credit);
          tempItem.selfEmployed = shareExpress(tempItem.selfEmployed);
          tempItem.threeMechanism = shareExpress(tempItem.threeMechanism);
          return tempItem;
        });

      const temp = {
        foreignInvestment: _.sortBy(_.cloneDeep(summary), 'foreignInvestment'),
        credit: _.sortBy(_.cloneDeep(summary), 'credit'),
        selfEmployed: _.sortBy(_.cloneDeep(summary), 'selfEmployed'),
        threeMechanism: _.sortBy(_.cloneDeep(summary), 'threeMechanism'),
      };

      return temp;
    },
    getMarketStockName(state: any): SelectItem[] {
      const temp: SelectItem[] = [];

      _.forEach((state.marketStockList), (item: StockBasicType) => {
        temp.push({
          text: `${item.id} ${item.name}`,
          value: item.id,
        });
      });

      return temp;
    },
  },
};

export default stockStore;
