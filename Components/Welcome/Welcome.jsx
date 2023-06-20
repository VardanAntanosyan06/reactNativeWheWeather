import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

// Call the function to request permission
var icon = require('./icon.png');

const Welcome = () => {
  const [animatedValue] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [-60, 1],
          outputRange: [0, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.main}>
      <Image source={icon} style={{width: 300, height: 300}} />
      <Animated.View
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: '#ffff',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 10,
          ...animatedStyle, // Apply animated styles
        }}>
        <Text
          style={{
            fontSize: 35,
            width: '65%',
            textAlign: 'center',
            fontFamily: 'bold',
          }}>
          Weather News & Feed
        </Text>
        <Text style={{fontSize: 18, textAlign: 'center'}}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Image
            style={{width: 70, height: 70}}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/015/270/866/original/right-arrow-direction-line-icon-in-gradient-colors-interface-signs-illustration-png.png',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Welcome;
