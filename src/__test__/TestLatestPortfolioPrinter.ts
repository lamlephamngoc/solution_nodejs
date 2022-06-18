import {expect} from 'chai';
import LatestPortfolioPrinter from '../LatestPortfolioPrinter';

describe('Latest portfolio printer', () => {
  it('check print', () => {
    // given
    const map: Map<string, number[]> = new Map();
    map.set('XRP', [3.3, -1, -2]);
    map.set('BTC', [3.9, -2.1]);
    map.set('ETH', [-1, -2, 8]);
    const latestPortfolioPrinter = new LatestPortfolioPrinter(map, true);
    // when
    latestPortfolioPrinter.print();
  });
});
