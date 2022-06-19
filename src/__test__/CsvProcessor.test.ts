import {expect} from 'chai';
import CsvProcessor from '../CsvProcessor';

const csvProcessor = new CsvProcessor('csv/transactions.csv');

test('should return latest portfolio all token in USD', () => {
  // then
  csvProcessor.process();
});
