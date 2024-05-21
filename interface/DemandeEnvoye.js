import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function DemandeEnvoye() {
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
  const image = require('./navigation/backflou.png');
  return (
    <ImageBackground source={image} style={styles.container}>
        <AntDesign name="checkcircleo" size={120} color="#43bc90" />
      <Text style={styles.text}>la demande d'association a été envoyée</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={associer}
       >
        <Text style={styles.buttonText} >envoi une autre demande d`association</Text>
       </TouchableOpacity>
      <Text style={styles.text2}>Apres la visualisation de votre demande nous vous informerons la réponse lorsque vous avez connecté </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:23,
    marginTop:10,
    marginBottom:30,
    fontWeight:'bold',
  },
  image:{
    marginTop:-100,
    height:120,
    width:120,
  },
  button: {
    marginTop: 50,
    padding: 10,
    width: 330,
    backgroundColor:'#194a7a',
    borderRadius: 20,
  },
  buttonText:{
    color:'#fff',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:18,
  },
  text2:{
    fontSize:15,
    marginTop:30,
    fontWeight:'500',
    color:'#006e4f'
  }
});
