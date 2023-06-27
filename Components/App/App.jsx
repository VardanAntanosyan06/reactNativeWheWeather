import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../Dashboard/Dashboard';
import Welcome from '../Welcome/Welcome';
const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
