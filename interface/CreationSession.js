import { Button, StyleSheet, TouchableOpacity, Text, View, ImageBackground, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CreationSession() {
  const [deviceId, setDeviceId] = useState('');
  const navigation=useNavigation();

  useEffect(() => {
    setDeviceId(Device.osBuildId); // Using OS Build ID as a unique identifier for demo purposes
  }, []);

  const associer = async () => {
    const data = {
      "adresse_mac": deviceId, // Previously "adresse_mac"
      "statut": "non associer",
      "code_association": null
    };

    try {
      const response = await axios.post('http://192.168.245.241:8000/api/tablette/create', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      navigation.navigate("ErrorConnection");
    }
  };
  const image = require('./navigation/back2.jpeg');
  return (
    <ImageBackground source={image}  style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Cette table n'est pas associée au serveur</Text>
      <TouchableOpacity style={styles.button} onPress={associer} >
        <Text  style={styles.buttonText}>Envoi une demande d'association</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
    
  },
  text: {
    marginBottom: 50,
    fontWeight:'bold',
    fontSize:20,
  },
  button: {
    marginTop: 30,
    padding: 10,
    width: 300,
    backgroundColor:'#194a7a',
    borderRadius: 20,
  },
  buttonText:{
    color:'#fff',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:20,
  }
});
