import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import RNBootSplash from "react-native-bootsplash";
import RootNavigation, { navigationRef } from './navigation/RootNavigation';

Sentry.init({
  dsn: "https://fd3ae7c26d1843fcbc105b367518cb09@o565201.ingest.sentry.io/5706509",
});

function Trilon() {
  useEffect(()=>{
    RNBootSplash.hide();
  },[])
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Trilon;
