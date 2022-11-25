import React, { useState, useEffect, useCallback } from 'react';
import FiltersView from "./FiltersView";
import ChartView from "./ChartView";
import { ChartData, Filters } from '../helpers/types';
import { fetchStockData } from '../helpers/api';
import { FILTERS } from '../helpers/constants';
import { formatSeriesData } from "../helpers/utilities";
import "../styles/AppContainer.scss";

/*
* Application container. Displaying filters block and stock chart.
*/
const AppContainer = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ChartData | {}>({});
    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        if (!filters.symbols) {
            return;
        }
        setIsLoading(true);
        fetchStockData(filters).then((data) => {
            setData(formatSeriesData(data));
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, [filters]);

    const onFilterChange = useCallback((value: string, type: string) => {
        if (type == FILTERS.dateFrom || type == FILTERS.dateTo) {
            setFilters({
                ...filters,
                [type]: new Date(value).toISOString()
            });
            return;
        }

        setFilters({
            ...filters,
            [type]: value
        });
    }, [filters]);

    return loading ? <div className="loader">
        <div className="loader-spinner" />
    </div> : <>
            <FiltersView filters={filters} onFilterChange={onFilterChange} />
            <ChartView data={data} />
        </>
};

export default AppContainer;
