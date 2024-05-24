import React, { useEffect, useState } from 'react';
import { View,  StyleSheet,  ActivityIndicator } from 'react-native';
import PV from './interface/PV';
import CreationSession from './interface/CreationSession';
import ErrorConnection from './interface/ErrorConnection';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DemandeEnvoye from './interface/DemandeEnvoye';
import DemandeAccepter from './interface/DemandeAccepter';
import DemandeRefuser from './interface/DemandeRefuser';
import axios from 'axios';
import * as Device from 'expo-device';


const App = () => {
  const Stack=createNativeStackNavigator();
  const [deviceId, setDeviceId] = useState('');
  const ipAdress='10.115.249.239';
  const [screen,setScreen]=useState(null);
  useEffect(() => {
    const fetchDeviceId = () => {
      setDeviceId(Device.osBuildId);
    };
    fetchDeviceId();
  }, []);

  useEffect(() => {
    if (deviceId) {  
       getEtat();
    }
  }, [deviceId]); 
  const getEtat= async () => {
    const data = {
      "adresse_mac": deviceId
    };
    try {
      const response = await axios.post(`http://${ipAdress}:8000/api/tablette/getEtat`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      console.log(response.data['statut']);  
      const newScreen = response.data['statut'] === 'non associer' ? 'DemandeEnvoye' :
                        response.data['statut'] === 'associer' ? 'DemandeAccepter' :
                        response.data['statut'] === 'refuser' ? 'DemandeRefuser' : 'CreationSession';
      setScreen(newScreen);
    } catch (error) {
      console.log(error);
      setScreen('CreationSession');
    }
  }
  
  useEffect(() => {
    console.log('Current screen:', screen);
  }, [screen]);  

  if (!screen) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  }
  
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName={screen} key={screen} screenOptions={{headerShown:false}}>
            <Stack.Screen name="CreationSession" component={CreationSession} initialParams={{ipAdress:ipAdress}} />
            <Stack.Screen name="PV" component={PV} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="ErrorConnection" component={ErrorConnection} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeEnvoye" component={DemandeEnvoye} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeAccepter" component={DemandeAccepter} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeRefuser" component={DemandeRefuser} initialParams={{ipAdress:ipAdress}}/>
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
