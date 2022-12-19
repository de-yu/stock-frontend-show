import GraphClient from '@/graphql/GraphQlClient';
import Query from '@/graphql/Query';
import Mutation from '@/graphql/Mutation';
import { gql } from '@apollo/client';

const StockRecordStore = {
  state: {
    recordData: [],
  },
  mutations: {
    setRecordData(state: any, recordData: StockRecordData[]) {
      state.recordData = recordData;
    },
  },
  actions: {
    async getStockRecord({ commit }: any) {
      const response: any = await GraphClient.query({
        query: gql`${Query.stockRecord}`,
        fetchPolicy: 'no-cache',
      });

      commit('setRecordData', response.data.record);
      console.log(response.data.record);
    },
    async updateStockRecord({ commit }: any, content: string) {
      const response: any = await GraphClient.mutate({
        mutation: gql`${Mutation.updateStockRecord}`,
        variables: {
          content,
        },
      });
    },
  },
  getters: {
    recordData(state: any): StockRecordData[] {
      return state.recordData;
    },
  },
};

export default StockRecordStore;
