import { isArray } from "highcharts";
import { Point, SeriesOption } from "./types";

/**
* Format data for highchart stock chart helper.
* @param data - an array of stock price records
* @returns - formatted data
*/
export const formatSeriesData = (data: Point[]) => {
  const filteredData: Record<string, [number, number][]> = {};

  data.forEach((entity: Point) => {
    const { symbol, date, close } = entity;
    if (!new Date(date)) {
      return;
    }
    const dot: [number, number] = [new Date(date).getTime(), close];
    if (!filteredData[symbol] && !isArray(filteredData[symbol])) {
      filteredData[symbol] = [dot];
    } else {
      filteredData[symbol].push(dot);
    }
  });

  const highchartData: SeriesOption[] = [];
  Object.keys(filteredData).forEach((name: string) => {
    highchartData.push({ name, data: filteredData[name] });
  });

  return highchartData;
};
