import React from 'react';
import StackNavigator from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from './src/navigation/RootNavigation';
import * as RootNavigation from './src/navigation/RootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { ToastProvider } from 'react-native-fast-toast';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1, backgroundColor:'#010A12'}}>
        <NavigationContainer ref={navigationRef}>
        <ToastProvider>
          <StackNavigator RootNavigation={RootNavigation} />
        </ToastProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
