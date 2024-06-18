import React, { useEffect, useState } from 'react';
import { View,  StyleSheet,  ActivityIndicator } from 'react-native';
import PV from './interface/PV';
import CreationSession from './interface/CreationSession';
import ErrorConnection from './interface/ErrorConnection';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DemandeEnvoye from './interface/DemandeEnvoye';
import DemandeAccepter from './interface/DemandeAccepter';
import DemandeRefuser from './interface/DemandeRefuser';
import axios from 'axios';
import * as Device from 'expo-device';
import base64 from 'base-64';
import EnvoiDeDonneer from './EnvoiDeDonneer';


const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);


const Home = () => {
  const Stack=createNativeStackNavigator();
  const [deviceId, setDeviceId] = useState('');
  const ipAdress='192.168.11.107';
  const [screen,setScreen]=useState(null);
  const [pvExiste,setPvExiste]=useState(null);
  const checkDocuments = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`http://${ipAdress}:5984/etudiantsdeux/_all_docs?limit=1`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } }),
        axios.get(`http://${ipAdress}:5984/etudiantsun/_all_docs?limit=1`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } }),
        axios.get(`http://${ipAdress}:5984/rapport/_all_docs?limit=1`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } }),
        axios.get(`http://${ipAdress}:5984/rapport/_all_docs?limit=1`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } })
      ]);
      const documentExists = responses.some(response => response.data.total_rows > 0);
      console.log('Documents exist:', documentExists);
      return documentExists;
    } catch (error) {
      console.log('Error checking documents:', error);
      return false;
    }
  };
  
  
  
  useEffect(() => {
    const performCheck = async () => {
      const documentExists = await checkDocuments();
      console.log('Received document existence:', documentExists);
      setPvExiste(documentExists);  
    };
    performCheck();
  }, []);
  
  
    useEffect(() => {
      console.log('Current screen:', screen);
    }, [screen]);  
    useEffect(() => {
      console.log('PV:'+pvExiste);
      if(pvExiste==true){
        setScreen('PV');
      }
    }, [pvExiste]);  
    useEffect(() => {
      const fetchDeviceId = () => {
        setDeviceId(Device.osBuildId);
      };
      fetchDeviceId();
    }, []);
    useEffect(() => {
      if (deviceId && pvExiste==false) {  
        getEtat();
      }
    }, [deviceId, pvExiste]);  
    
    
  
  
  const getEtat= async () => {
    const data = {
      "device_id": deviceId
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
  

  if (!screen ) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  }
  
  return (
         <Stack.Navigator initialRouteName="EnvoiDeDonneer" key={screen} screenOptions={{headerShown:false}}>
            <Stack.Screen name="CreationSession" component={CreationSession} initialParams={{ipAdress:ipAdress}} />
            <Stack.Screen name="PV" component={PV} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="ErrorConnection" component={ErrorConnection} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeEnvoye" component={DemandeEnvoye} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeAccepter" component={DemandeAccepter} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="DemandeRefuser" component={DemandeRefuser} initialParams={{ipAdress:ipAdress}}/>
            <Stack.Screen name="EnvoiDeDonneer" component={EnvoiDeDonneer} initialParams={{ipAdress:ipAdress}}/>
         </Stack.Navigator>
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

export default Home;

