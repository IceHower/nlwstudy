import React, { Fragment } from 'react';
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';
export default function App() {
  const [fontsLoaded] = useFonts({ // Carrega as fontes
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded) { // Caso as fontes não sejam carregadas, ira executa o AppLoading.
    return <AppLoading />
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"/>
      <Routes/>
    </>
   
  );
}

