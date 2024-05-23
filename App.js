import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import PV from './interface/PV';
import Example from './tailwindtest';
import Insert from './insertIntoCouchDB';
import CreationSession from './interface/CreationSession';
import ErrorConnection from './interface/ErrorConnection';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DemandeEnvoye from './interface/DemandeEnvoye';
import DemandeAccepter from './interface/DemandeAccepter';


const Stack=createNativeStackNavigator();
const ipAdress='10.115.249.239';
const App = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='PV' screenOptions={{headerShown:false}}>
            <Stack.Screen name="CreationSession" component={CreationSession} initialParams={{ipAdress:ipAdress}} />
            <Stack.Screen name="PV" component={PV} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="ErrorConnection" component={ErrorConnection} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeEnvoye" component={DemandeEnvoye} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeAccepter" component={DemandeAccepter} initialParams={{ipAdress:ipAdress}}/>
         </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  docText: {
    fontSize: 18,
    marginVertical: 5,
  },
  image:{
    flex:1,
    justifyContent: "center"
  }
});

export default App;
