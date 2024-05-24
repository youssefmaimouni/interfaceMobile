import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,  ImageBackground, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function DemandeRefuser({route}) {
  const [deviceId, setDeviceId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation=useNavigation();
  const ipAdress = route.params.ipAdress;

  useEffect(() => {
    setDeviceId(Device.osBuildId); // Using OS Build ID as a unique identifier for demo purposes
    console.log(ipAdress);
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
        <Text  style={styles.buttonText}>envoi une autre demande d`association</Text>
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
    justifyContent: 'center',
  },
  text:{
    fontSize:30,
    marginTop:0,
    marginBottom:30,
    fontWeight:'bold',
  },
  image:{
    marginTop:10,
    height:120,
    width:120,
  },
  button:{
    marginTop:50,
    padding:6,
    width:400,
  },
  text2:{
    fontSize:15,
    marginTop:50,
    fontWeight:'500',
  },
});
