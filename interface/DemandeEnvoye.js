import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function DemandeEnvoye({route}) {
  const [deviceId, setDeviceId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation=useNavigation();
  const ipAdress = route.params.ipAdress;

  useEffect(() => {
    setDeviceId(Device.osBuildId); // Using OS Build ID as a unique identifier for demo purposes
  }, []);

  const associer = async () => {
    const data = {
      "adresse_mac": deviceId,
    };

    try {
      setModalIsOpen(true);
      const response = await axios.post(`http://${ipAdress}:8000/api/tablette/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 60000
          });
      if (response.data.status_code==201) {
        setModalIsOpen(false);
        console.log(response.data);
      } else {
        console.log(response.data);
        navigation.navigate("ErrorConnection");
      }
    } catch (error) {
      console.log(error);
      navigation.navigate("ErrorConnection");
    }
  };
  const image = require('./bg2.jpg');
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
      {modalIsOpen&&<Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Data Modal"
        style={{
          content: {
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
