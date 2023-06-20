import React, {useEffect, useState} from 'react';
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
import {styles} from './style';
import serchIcon from './searchIcon.png';

const Dashboard = () => {
  const [value, setValue] = useState('yEREVAN');
  useEffect(()=>{

  },[value])

  return (
    <ScrollView style={styles.main}>
      <View
        style={{
          width: 100 + '%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TextInput
          style={{fontSize: 28, marginBottom: 20, color: 'rgb(192, 192, 192)'}}
          editable
          multiline
          value={value}
          onChangeText={text => setValue(text)}
        />
        <TouchableOpacity >
          <Image source={serchIcon} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
      <Calendar location={value} />
    </ScrollView>
  );
};

export default Dashboard;
