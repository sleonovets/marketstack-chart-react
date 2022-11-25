// TODO: put your access key here
export const ACCESS_KEY = "";
export const ACCESS_KEY_PARAM = "access_key";
export const MARKETSTACK_DATA = "http://api.marketstack.com/v1/eod";
export const FILTERS = {
    dateFrom: "dateFrom",
    dateTo: "dateTo",
    limit: "limit",
    offset: "offset",
    sort: "sort",
    exchange: "exchange",
    symbols: "symbols"
};
export const FILTERS_PARAMETERS = {
    [FILTERS.dateFrom]: "date_from",
    [FILTERS.dateTo]: "date_to",
    [FILTERS.limit]: "limit",
    [FILTERS.offset]: "offset",
    [FILTERS.sort]: "sort",
    [FILTERS.exchange]: "exchange",
    [FILTERS.symbols]: "symbols"
};
export const SYMBOLS_REGEXP = '^[A-Z]+(,[A-Z]+)*$';
