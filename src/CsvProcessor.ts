class CsvProcessor {
  private csvFilePath: string;
  token: string | undefined = '';
  inputDate: Date | undefined;

  constructor(csvFilePath: string) {
    this.csvFilePath = csvFilePath;
  }

  setInputDate = (inputDate: string) => {
    const inputDateSplit = inputDate.split('-') as string[];
    this.inputDate = new Date(
      parseInt(inputDateSplit[0]),
      parseInt(inputDateSplit[1]),
      parseInt(inputDateSplit[2])
    );
  };

  checkTokenExisting = () => {
    return this.token !== null && this.token!.length > 0;
  };

  printData = () => {
    console.log('file path ', this.csvFilePath);
    console.log('token ', this.token);
    console.log('input date ', this.inputDate);
  };
}

export default CsvProcessor;
