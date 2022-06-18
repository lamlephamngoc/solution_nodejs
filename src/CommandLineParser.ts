import CsvProcessor from './CsvProcessor';
import ExchangeRateProcessor from './ExchangeRateProcessor';
const {Command} = require('commander');
const program = new Command();

class CommandLineParser {
  constructor() {}

  start = () => {
    console.log('Start processing CSV file');
    program
      .option('-t, --token <token>', 'Given Token')
      .option(
        '-d, --date <date>',
        'Given Date with pattern YYYY-MM-DD example: 2019-10-25'
      );
    program.parse(process.argv);
    const csvProcessor = new CsvProcessor('../csv/transactions.csv');
    const options = program.opts();
    if (options.token) {
      console.log(`Process the latest portfolio for token ${options.token}`);
      csvProcessor.token = options.token;
    }
    if (options.date) {
      console.log(
        `Process portfolio value per token in USD on that date ${options.date}`
      );
      csvProcessor.setInputDate(options.date);
    }

    // console.log(csvProcessor.checkTokenExisting());
    // console.log(csvProcessor.printData());
    const exchangeRateProcessor = new ExchangeRateProcessor('BTC', false);
    exchangeRateProcessor.getRateInUSD();
  };
}
export default new CommandLineParser();
