import axios from 'axios';
import _ from 'lodash';
import { numberFixed } from '@/utility/utility';

const Point = {
  state: {
    pointList: [],
  },
  mutations: {
    setPointList(state: any, points: CriticalPoint[]): void {
      state.pointList = points;
    },
  },
  actions: {
    async getPointList({ commit }: any) {
      const response = await axios.get(process.env.VUE_APP_POINT as string);
      commit('setPointList', response.data);
    },
  },
  getters: {
    pointList(state: any, getters: any, rootState: any, rootGetters: any): PointAndPrice[] {
      const stockMap: any = {};
      const temp: PointAndPrice[] = [];
      _.forEach(rootGetters.getMarketStockList, (item: StockBasicType) => {
        stockMap[item.id] = {
          closePrice: item.closingPrice,
          market: item.market,
        };
      });

      _.forEach(state.pointList, (item: any) => {
        try {
          temp.push({
            id: item[0].toString(),
            name: item[1],
            point: item[2].toString(),
            priceDiff: numberFixed((stockMap[item[0].toString()].closePrice - item[2]) * 100 / item[2], 2),
            price: stockMap[item[0].toString()].closePrice,
            market: stockMap[item[0].toString()].market,
          });
        } catch (e) {
          temp.push({
            id: item[0].toString(),
            name: item[1],
            point: '-',
            priceDiff: 0,
            price: 0,
            market: '',
          });
        }
      });

      return temp;
    },
  },
};

export default Point;
