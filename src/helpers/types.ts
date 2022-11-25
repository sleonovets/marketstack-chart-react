export type Parameters = "date_from"
  | "date_to"
  | "limit"
  | "offset"
  | "sort"
  | "exchange"
  | "symbols";


export type Filters = Record<string, string>;
export type ChartData = Record<string, Point[]>;

export type Point = {
  "date": string;
  "symbol": string;
  "close": number;
};

export type SeriesOption = {
  name: string;
  data: [number, number][];
};
