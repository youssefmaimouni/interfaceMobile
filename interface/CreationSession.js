import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


export default function CreationSession({route}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation=useNavigation();
  const ipAdress = route.params.ipAdress;


  const associer = async () => {

    async function getDeviceUUID() {
      let deviceId = await AsyncStorage.getItem('deviceUUID');
      if (!deviceId) {
        deviceId = uuid.v4();  // Générer un nouvel UUID
        await AsyncStorage.setItem('deviceUUID', deviceId);
      }
      return deviceId;
    } 
    
    const data = {
      "uuid": getDeviceUUID(),
      "statut": "non associer",
      "code_association": null
    };
    try {
      setModalIsOpen(true);
      const response = await axios.post(`http://10.115.251.236:8000/api/tablette/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000
          });
      if (response.data.status_code==201) {
        setModalIsOpen(false);
        console.log(response.data);
        navigation.navigate("DemandeEnvoye");
      } else {
        console.log(response.data);
        navigation.navigate("ErrorConnection");
      }
    } catch (error) {
      console.log(error);
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
      {modalIsOpen&&<Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Data Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            alignItems:'center',
            justifyContent:'center',
          },
        }}
      >
        <ActivityIndicator size="500" color="#43bc90" />
      </Modal>}
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
