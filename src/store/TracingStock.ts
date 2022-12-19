import GraphClient from '@/graphql/GraphQlClient';
import Query from '@/graphql/Query';
import Mutation from '@/graphql/Mutation';
import { gql } from '@apollo/client';
import _ from 'lodash';

const TracingStock = {
  state: {
    tracingStockList: [],
  },
  mutations: {
    setTracingStockList(state: any, stocks: StockBasicType[]) {
      state.tracingStockList = stocks;
    },
  },
  actions: {
    async tracingStock({ commit }: any) {
      const response: any = await GraphClient.query({ query: gql`${Query.tracingStock}`, fetchPolicy: 'no-cache' });
      commit('setTracingStockList', response.data.tracingStock.data);
    },
    async updateTracingStock({ commit }: any, id: string) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.updateTracingStock}`,
        variables: {
          id,
        },
      });
    },
  },
  getters: {
    getTracingStock(state: any): StockBasicType[] {
      const temp = _.map(_.cloneDeep(state.tracingStockList), (item: StockBasicType) => {
        const tempItem = _.cloneDeep(item);
        tempItem.diffOfPercentage = Number(item.diffOfPercentage.toFixed(2));
        return tempItem;
      });
      return temp;
    },
  },
};

export default TracingStock;
