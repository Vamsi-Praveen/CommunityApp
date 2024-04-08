import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import Loading from './components/Loading';
import StackNavigation from './navigation/StackNavigation';
import { store } from './redux/store';

const App = () => {
  const [loaded] = useFonts({
    'DmSans': require('./assets/fonts/DMSans-Medium.ttf'),
    'DmSans-B': require('./assets/fonts/DMSans-Bold.ttf'),
    'DmSans-Sm': require('./assets/fonts/DMSans-SemiBold.ttf'),
  })
  if (!loaded) {
    return <Loading />
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <StackNavigation />
        </SafeAreaView>
      </Provider>
      <StatusBar style='light' />
    </NavigationContainer>
  )
}

export default App
