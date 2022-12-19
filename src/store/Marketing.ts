import GraphClient from '@/graphql/GraphQlClient';
import _ from 'lodash';
import Query from '@/graphql/Query';
import { gql } from '@apollo/client';
import { toThousand, numberExpress, numberFixed } from '@/utility/utility';

const marketing = {
  state: {
    marketPrice: {
      openingPrice: 0,
      highestPrice: 0,
      lowestPrice: 0,
      closingPrice: 0,
      pointOfMarket: 0,
      percentageOfMarket: 0,
    },
    marketDeal: {
      dealSumOfShare: 0,
      dealSumOfMoney: 0,
      dealSumOfTransaction: 0,
      marketIndex: 0,
      pointOfMarket: 0,
    },
    marketHistory: [],
    marketRiseFall: {
      sumOfRise: 0,
      sumOfRiseLimit: 0,
      sumOfDown: 0,
      sumOfDownLimit: 0,
      sumOfEqual: 0,
    },
    marketStatistic: [],
    marketInvestMechanism: [],
  },
  mutations: {
    setMarketPrice(state: any, payload: MarketingPriceType) {
      state.marketPrice = payload;
    },
    setMarketDeal(state: any, payload: MarketDealType) {
      state.marketDeal = payload;
    },
    setMarketHistory(state: any, payload: MarketHistoryType) {
      state.marketHistory = payload;
    },
    setMarketRiseFall(state: any, payload: MarketRiseFallType) {
      state.marketRiseFall = payload;
    },
    setMarketStatistic(state: any, payload: MarketStatisticType) {
      state.marketStatistic = payload;
    },
    setMarketInvestMechanism(state: any, payload: MarketInvestmentMechanismType[]) {
      state.marketInvestMechanism = payload;
    },

  },
  actions: {

    async marketingGql({ commit }: any) {
      const response: any = await GraphClient.query({ query: gql`${Query.marketing}` });

      commit('setMarketPrice', response.data.marketData.MarketPrice);
      commit('setMarketDeal', response.data.marketData.MarketDeal);
      commit('setMarketHistory', response.data.marketData.MarketHistory);
      commit('setMarketRiseFall', response.data.marketData.MarketRiseFall);
      commit('setMarketStatistic', response.data.marketData.MarketStatistic);
      commit('setMarketInvestMechanism', response.data.marketInvestmentMechanism.data);
    },
  },
  getters: {
    getMarketPrice(state: any): MarketingPriceType {
      const temp: MarketingPriceType = {
        openingPrice: state.marketPrice.openingPrice.toFixed(2),
        highestPrice: state.marketPrice.highestPrice.toFixed(2),
        lowestPrice: state.marketPrice.lowestPrice.toFixed(2),
        closingPrice: state.marketPrice.closingPrice.toFixed(2),
        pointOfMarket: state.marketPrice.pointOfMarket,
        percentageOfMarket: state.marketPrice.percentageOfMarket,
      };

      return temp;
    },
    getMarketDeal(state: any): MarketDealType {
      const temp: MarketDealType = {
        dealSumOfShare: numberExpress(state.marketDeal.dealSumOfShare),
        dealSumOfMoney: numberExpress(state.marketDeal.dealSumOfMoney),
        dealSumOfTransaction: toThousand(state.marketDeal.dealSumOfTransaction),
        marketIndex: state.marketDeal.marketIndex,
        pointOfMarket: state.marketDeal.pointOfMarket,
      };

      return temp;
    },
    getMarketHistory(state: any): MarketHistoryType[] {
      const temp = _.map(state.marketHistory, (item: MarketHistoryType) => ({
        date: item.date,
        openingPrice: numberFixed(item.openingPrice, 2),
        highestPrice: numberFixed(item.highestPrice, 2),
        lowestPrice: numberFixed(item.lowestPrice, 2),
        closingPrice: numberFixed(item.closingPrice, 2),
        reductionPrice: numberFixed(item.reductionPrice, 2),
      }));
      return temp;
    },
    getMarketRiseFall(state: any): MarketRiseFallType {
      return state.marketRiseFall;
    },
    getMarketStatistic(state: any): MarketStatisticType {
      return state.marketStatistic;
    },
    getMarketInvestmentMechanism(state: any): MarketInvestmentMechanismType[] {
      const temp = _.map(state.marketInvestMechanism, (item: MarketInvestmentMechanismType) => ({
        name: item.name,
        buy: numberExpress(item.buy),
        sell: numberExpress(item.sell),
        gap: numberExpress(item.gap),
      }));

      return temp;
    },

  },
};

export default marketing;
