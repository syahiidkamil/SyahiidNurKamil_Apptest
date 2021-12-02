import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import configureStore from './src/Redux/Store/configureStore';
import Contacts from './src/Screens/Contacts';
import Detail from './src/Screens/Detail';

const Stack = createNativeStackNavigator();

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
