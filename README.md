Process huge CSV transactions portfolio token by no argument, token and date

Please refer original one at https://github.com/lamlephamngoc/solution/blob/master/README.md for more details of testing

- added PM2_HOME environment variable to root folder

```shell

  # no argument
  npx ts-node src/index.ts
  # given token
  npx ts-node src/index.ts -t BTC
  npx ts-node src/index.ts --token ETH
  # given date
  npx ts-node src/index.ts -d 2019-10-25
  npx ts-node src/index.ts --date 2019-09-25
  # given date & token
  npx ts-node src/index.ts --date 2019-09-25 --token ETH
  # testing mode with specific token exchange rate in USD
  npx ts-node src/index.ts --date 2019-09-25 --token ETH --test
```
