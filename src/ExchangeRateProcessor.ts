const axios = require('axios').default;

class ExchangeRateProcessor {
  private token: string;
  private testing: boolean;
  constructor(token: string, testing: boolean) {
    this.token = token;
    this.testing = testing;
  }
  getRateInUSD = async (): Promise<number | null> => {
    if (this.testing) {
      if (this.token === 'BTC') {
        return 30_000.0;
      }
      if (this.token === 'ETH') {
        return 1_000.0;
      }
      if (this.token === 'XRP') {
        return 0.3;
      }
    }
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/price?fsym=${this.token}&tsyms=USD`
    );
    return response.data.USD;
  };
}
export default ExchangeRateProcessor;
