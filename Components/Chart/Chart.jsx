import React from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Chart = ({labels, datax}) => {
  return (
    <LineChart
      data={{
        labels,
        datasets: [
          {
            data: datax,
          },
        ],
      }}
      width={900}
      height={200}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: 'rgb(142,182,252)',
        backgroundGradientTo: 'rgb(255, 182, 193)',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};

export default Chart;
