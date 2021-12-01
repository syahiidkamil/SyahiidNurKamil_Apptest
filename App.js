import React from 'react';
import Contacts from './src/Screens/Contacts';
import {Provider} from 'react-redux';

import configureStore from './src/Redux/Store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Contacts />
  </Provider>
);

export default App;
