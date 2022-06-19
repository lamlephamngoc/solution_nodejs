const fs = require('fs');

class CsvProcessor {
  private csvFilePath: string;
  token: string | undefined = '';
  fromDate: number | undefined;
  toDate: number | undefined;

  constructor(csvFilePath: string) {
    this.csvFilePath = csvFilePath;
  }

  setInputDate = (inputDate: string) => {
    const inputDateSplit = inputDate.split('-') as string[];
    this.fromDate = new Date(
      Date.UTC(
        parseInt(inputDateSplit[0]),
        parseInt(inputDateSplit[1]) - 1,
        parseInt(inputDateSplit[2]),
        0,
        0,
        1
      )
    ).getTime();
    this.toDate = new Date(
      Date.UTC(
        parseInt(inputDateSplit[0]),
        parseInt(inputDateSplit[1]) - 1,
        parseInt(inputDateSplit[2]),
        23,
        59,
        59
      )
    ).getTime();
  };

  checkGivenToken = () => {
    return this.token !== null && this.token!.length > 0;
  };

  process = () => {
    const map: Map<string, number[]> = new Map();
    const transactionsStream = fs.createReadStream(this.csvFilePath, 'utf8');
    transactionsStream
      .on('data', (chunk: any) => {
        const transactionsConverted = chunk.toString().toUpperCase();
        // console.log(chunk);
        transactionsConverted.split('\n').forEach((records: string) => {
          this.processOnData(records, map);
        });
      })
      .on('end', function () {
        console.log('END map ', map);
      })
      .on('error', (err: any) => {
        console.log(err);
      });
  };

  processOnData = (records: string, map: Map<string, number[]>) => {
    const record = records.split(',');
    const timestamp = record[0];
    const transactionDate = new Date(parseInt(timestamp) * 1_000).getTime();
    if (this.notEqualsGivenDate(transactionDate)) {
      return;
    }
    const depositOrWithdrawal = record[1];
    const token = record[2];
    const amount = Number(record[3]);
    let amounts: number[] | undefined = [];

    amounts = map.get(token);
    if (undefined !== amounts) {
      amounts.push(this.processAmount(amount, depositOrWithdrawal));
      map.set(token, amounts);
    }
    if (this.token && this.checkGivenToken()) {
      if (undefined === map.get(this.token) && this.token === token) {
        amounts = [];
        amounts.push(this.processAmount(amount, depositOrWithdrawal));
        map.set(token, amounts);
      }
    } else {
      if (undefined === map.get(token)) {
        amounts = [];
        amounts.push(this.processAmount(amount, depositOrWithdrawal));
        map.set(token, amounts);
      }
    }
  };

  private processAmount = (amount: number, depositOrWithdrawal: string) => {
    if ('WITHDRAWAL' === depositOrWithdrawal) {
      return amount * -1;
    }
    return amount;
  };

  private notEqualsGivenDate = (transactionDate: number): boolean => {
    if (!this.fromDate || !this.toDate) {
      return false;
    }
    return this.fromDate >= transactionDate || this.toDate <= transactionDate;
  };

  printData = () => {
    console.log('file path ', this.csvFilePath);
    console.log('token ', this.token);
    console.log('input date ', this.fromDate);
  };
}

export default CsvProcessor;
