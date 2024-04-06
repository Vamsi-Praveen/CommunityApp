import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import Loading from './components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import Main from './screens/Main';
import Tabs from './navigation/BottomNavigation';
import { StatusBar } from 'expo-status-bar';
import StackNavigation from './navigation/StackNavigation';

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
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StackNavigation />
      </SafeAreaView>
      <StatusBar style='light' />
    </NavigationContainer>
  )
}

export default App
