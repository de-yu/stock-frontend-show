interface StockBasicType
{
  id: string;
  name: string;
  type: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  diffPrice: number;
  diffOfPercentage: number;
  tradingVolumn: number;
  tradingShares: number;
  tradingUnits: number;
  capital: number;
  market: string;
}

interface StockDealType
{
  dealSumOfShare: number;
  dealSumOfMoney: number;
  dealSumOfTransaction: number;
}

interface StockHistoryType
{
  date: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  reductionPrice: number;
  volumn: number;
}

interface StockMonthRevenueType
{
    date: string;
    id: string;
    nowMonthRevenue: number;
    previousMonthRevenue: number;
    previousYearRevenue: number;
    previousMonthChangeRate: number;
    previousYearChangeRate: number;
    accumulation: number;
    previousAccumulation: number;
    accumulationChangeRate: number;
    remark: string;
}

declare interface StockInvestmentMechanismType
{
  id: string;
  name: string;
  foreignInvestment: number;
  credit: number;
  selfEmployed: number;
  threeMechanism: number;
}

declare interface StockVolumnRankType
{
  type: string;
  tradingVolumn: number;
  tradingVolumnPoint: number;
}
