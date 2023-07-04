import React, { useEffect, useState } from 'react';
import { DefaultTheme } from "./configurations/DefaultTheme";
import {
  NativeBaseProvider,
  Text
} from "native-base";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { AuthProvider } from './context/AuthProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [splashScreen, setSplashScreen] = useState(true);

  let [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/Poppins/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('./assets/Poppins/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('./assets/Poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('./assets/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./assets/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('./assets/Poppins/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('./assets/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('./assets/Poppins/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Light': require('./assets/Poppins/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./assets/Poppins/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('./assets/Poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./assets/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('./assets/Poppins/Poppins-Regular.ttf'),
    'Poppins-Italic': require('./assets/Poppins/Poppins-Italic.ttf'),
    'Poppins-SemiBold': require('./assets/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./assets/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('./assets/Poppins/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('./assets/Poppins/Poppins-ThinItalic.ttf'),
  });


  const closeSplashScreen = async () => {
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    if (fontsLoaded == true) {
      setSplashScreen(false);
      closeSplashScreen();
    }
  }, [fontsLoaded, splashScreen]);

  if (!fontsLoaded) {
    return (<></>)
  }

  return (
    <NativeBaseProvider theme={DefaultTheme}>
      <StatusBar
        animated={true}
        backgroundColor={"#ECEDFD"}
        barStyle="dark-content"
      />
      <AuthProvider>    
        <Text>Welcome to USIU Chat Bot</Text>             
      </AuthProvider>
    </NativeBaseProvider>
  );
}