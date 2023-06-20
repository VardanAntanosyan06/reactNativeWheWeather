import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {styles} from './style';
import axios from 'axios';

//Components
import Info from '../Info/Info';
import Chart from '../Chart/Chart';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const Calendar = ({location}) => {
  const [today, setToday] = useState([]);
  const [images, setImages] = useState(null);
  const [labels, setlabels] = useState([]);
  const [datax, setDatax] = useState([]);

  const now = moment();
  const arr = [];
  [showInfo, setShowInfo] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=1803ea52335444b2b5f125452230806&q=${location}&days=12`,
        );

        setImages(response.data);
        const labels = response.data.forecast.forecastday[showInfo].hour.map(
          e => e.time.split(' ')[1],
        );
        const datax = response.data.forecast.forecastday[showInfo].hour.map(
          e => e.temp_c + '',
        );
        setDatax(datax);
        setlabels(labels);
      } catch (error) {
        console.log(error);
      }
    };

    for (let i = 0; i <= 6; i++) {
      const x = {
        dayOfString: moment(now).add(i, 'd').format('LLLL').split(',')[0],
        dayOfNumber: moment(now)
          .add(i, 'd')
          .format('LLLL')
          .split(',')[1]
          .split(' ')[2],
        today: i === 0,
      };
      arr.push(x);
    }

    fetchData();
    setToday(arr);

    scrollRef.current.scrollTo({x: 400, animated: true});
  }, []);
  const infoFunction = index => {
    setShowInfo(index);
    const labels = images.forecast.forecastday[showInfo].hour.map(
      e => e.time.split(' ')[1],
    );
    const datax = images.forecast.forecastday[showInfo].hour.map(
      e => e.temp_c + '',
    );
    setDatax(datax);
    setlabels(labels);
  };
  return (
    <View
      style={{
        height: 650,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.main}>
        {today.length > 0 ? (
          today.map((e, i) => {
            return e.today ? (
              <TouchableOpacity onPress={() => infoFunction(i)} key={i}>
                <View style={styles.today} key={i}>
                  {images ? (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={{uri: 'https:' + images.current.condition.icon}}
                      />
                      <Text>{images.current.temp_c + '°'}</Text>
                    </View>
                  ) : (
                    <LoadingAnimation />
                    )}
                  <Text style={styles.texts}>{e.dayOfString}</Text>
                  <Text style={styles.number}>{e.dayOfNumber}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => infoFunction(i)}>
                <View style={styles.mainText}>
                  {images ? (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={{
                          uri:
                            'https:' +
                            images.forecast.forecastday[i].day.condition.icon,
                        }}
                      />
                      <Text>
                        {images.forecast.forecastday[i].day.avgtemp_c + '°'}
                      </Text>
                    </View>
                  ) : (
                    <LoadingAnimation />
                    )}
                  <Text style={styles.texts}>{e.dayOfString}</Text>
                  <Text style={styles.number}>{e.dayOfNumber}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <LoadingAnimation />
        )}
      </ScrollView>
      <Info index={showInfo} location={location}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {labels.length > 0 && datax.length > 0 ? (
          <Chart labels={labels} datax={datax} />
        ) : (
          <LoadingAnimation />
        )}
      </ScrollView>
    </View>
  );
};

export default Calendar;
