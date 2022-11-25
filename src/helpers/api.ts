import mockedDataResponse from './mockedDataResponse';
import { Filters } from "./types";
import { FILTERS_PARAMETERS, MARKETSTACK_DATA, ACCESS_KEY, ACCESS_KEY_PARAM } from "./constants";
/**
* Builds string with query parameters.
* @param filters - filter values
* @returns - string
*/
const collectParameters = (filters: Filters) => {
    let params = "";
    Object.keys(filters).forEach((filter) => {
        params = params + (filters[filter] ? ("&" + FILTERS_PARAMETERS[filter] + "=" + filters[filter]) : "")
    });

    return params;
}

/**
* Gets the data from the marketstack api url with query params. Returns a promise
* @param filters - filter values
* @returns - Promise<Responce>
*/
const getStockData = async (filters: Filters) => await fetch(`${MARKETSTACK_DATA
    + "?" + ACCESS_KEY_PARAM + "=" + ACCESS_KEY
    + collectParameters(filters)
    }`);

/**
* Fetches the stock data. Returns result of the request
* @param filters - filter values
* @returns - promise of array of data
*/
export const fetchStockData = async (filters: Filters) => {
    const data = [];
    const fetchedData = await getStockData(filters);
    let dataList = await fetchedData.json();
    data.push(...dataList.data);
    let offset = 0;

    while (data.length < dataList.pagination.total) {
        dataList = await (await getStockData({...filters, offset: offset + dataList.pagination.count})).json();
        offset = offset + dataList.pagination.count;
        data.push(...dataList.data);
    }

    return data;
    // return mockedDataResponse.data;
}

export default { fetchStockData };
