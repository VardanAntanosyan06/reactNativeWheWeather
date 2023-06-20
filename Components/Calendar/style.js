import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  main: {
    // width: 'auto',
    paddingRight: 40,
  },
  today: {
    borderWidth: 2,
    backgroundColor: 'rgb(255, 182, 193)',
    width: 100,
    height: 120,
    borderRadius: 20,
    borderWidth: 0,
    display: 'flex',
    marginLeft: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainText: {
    borderWidth: 2,
    width: 100,
    backgroundColor: 'rgb(142,182,252)',
    height: 120,
    borderRadius: 20,
    borderWidth: 0,
    display: 'flex',
    marginLeft: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  number: {
    fontSize: 24,
  },
  texts: {
    fontSize: 16,
    fontFamily: 'bold',
  },
});
