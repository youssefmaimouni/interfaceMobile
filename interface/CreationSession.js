import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CreationSession({route}) {
  const [deviceId, setDeviceId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation=useNavigation();
  const ipAdress = route.params.ipAdress;

  useEffect(() => {
    setDeviceId(Device.osBuildId);
  }, []);

  const associer = async () => {
    const data = {
      "device_id": deviceId,
    };
    
    try {
      setModalIsOpen(true);
      const response = await axios.post(`http://${ipAdress}:8000/api/tablette/create`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
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
  const image = require('./image/demande.jpg');
  return (
    <View style={styles.container}>
      <StatusBar />
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Cette table n'est pas associée au serveur</Text>
      <TouchableOpacity style={styles.button} onPress={associer} >
        <Text  style={styles.buttonText}>Envoyer une demande</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7D8FE',
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
  },image:{
    height:200,
    width:300,
    marginBottom: 50
  }
});