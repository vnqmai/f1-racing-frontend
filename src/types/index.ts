export type DataTableField = {
  name: string;
  label: string;
  formatData?: (value: any) => string;
};

export type ResultItem = {
  pos: string;
  no: string;
  driverLastName: string;
  driverFirstName: string;
  driverShorttName: string;
  car: string;
  year: string;
  grand: string;
};

export type OptionType = {
  value: any;
  label: string | number;
};
