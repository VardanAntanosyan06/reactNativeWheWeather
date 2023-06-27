import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useState, useEffect} from 'react';
import {Text} from 'react-native';
import axios from 'axios';

const useLocation = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Your location is required for the app to function properly.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            console.log('Current position:', position);
            try {
              const response = await axios.get(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=baf95397a15547e3ba5d3aa05b9285fb`,
              );
              setLocation({city:response.data.results[0].city, address:response.data.results[0].address_line2.split(",")[0]});
            } catch (error) {
              console.log('Error getting location:', error);
            }
          },
          error => {
            console.log('Error getting location:', error);
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return location;
};
const getLocation = () => useLocation();

export default getLocation;
