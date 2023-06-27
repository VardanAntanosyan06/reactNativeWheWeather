import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {styles} from './style';
import axios from 'axios';
import Chart from '../Chart/Chart';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const Info = ({index,location}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=ba7e174fc75c41078f973010232306&q=${location}&days=12   `,
          );

        setData(response.data.forecast.forecastday[index]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);
  return data ? (
    <ScrollView horizontal key={data.day} showsHorizontalScrollIndicator={false}>
      {data.hour.map((e, i) => {
        return (
          <View key={i} style={styles.div}>
            <Text>{e.time.split(' ')[1]}</Text>
            <Text>{e.temp_c+'°'}</Text>
            <Image source={{uri: 'https:' + e.condition.icon}} style={{width:40,height:40}}/>
            <Text style={{fontSize:13}}>{e.condition.text}</Text>
          </View>
        );
      })} 
    </ScrollView>
  ) : (
    <View>
          <LoadingAnimation />
    </View>
  );
};

export default Info;
