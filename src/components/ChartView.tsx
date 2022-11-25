import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { ChartData } from '../helpers/types';

interface ChartInterface {
    /**
    * Data that is displayed on stock chart
    */
    data: ChartData
}

/**
* Chart view component. Rendering highchart react stock chart.
*/
const ChartView = ({ data }: ChartInterface) =>
    <div>
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={{
                title: {
                    text: 'Marketstack chart'
                },
                series: data
            }}
        />
    </div>;

export default ChartView;