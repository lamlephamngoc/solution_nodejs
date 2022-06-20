import ExchangeRateProcessor from './ExchangeRateProcessor';

class LatestPortfolioPrinter {
  private map: Map<string, number[]>;
  private testing: boolean;

  constructor(map: Map<string, number[]>, testing: boolean) {
    this.map = map;
    this.testing = testing;
  }

  print = () => {
    this.map.forEach(async (amounts: number[], token: string) => {
      let exchangeRate = await new ExchangeRateProcessor(
        token,
        this.testing
      ).getRateInUSD();

      if (exchangeRate === null) {
        // default rate 1.0
        exchangeRate = 1.0;
      }
      console.log(
        `${token} value in USD ${this.roundAmount(
          exchangeRate,
          amounts
        ).toLocaleString()}`
      );
    });
  };

  roundAmount = (exchangeRate: number, amounts: number[]): number => {
    return Number(
      (
        Math.round(exchangeRate! * amounts.reduce((a, b) => a + b, 0) * 100) /
        100
      ).toFixed(3)
    );
  };
}

export default LatestPortfolioPrinter;
