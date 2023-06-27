import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Calendar from '../Calendar/Calendar';
import { styles } from './style';
import searchIcon from './searchIcon.png';
import getLocation from '../getLocation/getLocation';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const Dashboard = () => {
  const [value, setValue] = useState({city:"Loading..."});
  const location = getLocation();
  console.log(value);
  useEffect(() => {
    if (location) {
      setValue(location);
    }
  }, [location]);

  if(value.city!="Loading..."){
    return (
    <ScrollView style={styles.main}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <View style={{display:"flex", marginBottom: 20,textAlingn:"center"}}>
        <TextInput
          style={{ fontSize: 28, color: 'rgb(105,105,105)' }}
          editable
          multiline
          value={value.city}
          onChangeText={text => setValue(text)}
        />
        <Text>{value.address}</Text>
        </View>
      </View>
      <Calendar location={value.city} />
      
    </ScrollView>
  )}
  return <LoadingAnimation />
};

export default Dashboard;
