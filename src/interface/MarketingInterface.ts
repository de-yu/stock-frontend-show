interface MarketingPriceType
{
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  pointOfMarket: number;
  percentageOfMarket: number;
}

interface MarketDealType
{
  dealSumOfShare: number | string;
  dealSumOfMoney: number | string;
  dealSumOfTransaction: number | string;
  marketIndex: number;
  pointOfMarket: number;
}

interface MarketHistoryType
{
  date: string;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
  reductionPrice: number;
}

interface MarketNoticeType
{
  date: string;
  stockNumber: string;
  stockName: string;
  sumOfTimes: number;
  noticeInfo: string;
}

interface MarketRiseFallType
{
  sumOfRise: number;
  sumOfRiseLimit: number;
  sumOfDown: number;
  sumOfDownLimit: number;
  sumOfEqual: number;
}

interface MarketStatisticType
{
  marketName: string;
  closingPrice: number;
  pointOfMarket: number;
  percentageOfMarket: number;
}

interface MarketInvestmentMechanismType
{
  name: string;
  buy: number;
  sell: number;
  gap: number;
}
