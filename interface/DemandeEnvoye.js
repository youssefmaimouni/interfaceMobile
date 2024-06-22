import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';

export default function DemandeEnvoye({route}) {
  const [deviceId, setDeviceId] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigation = useNavigation();
  const ipAdress = route.params.ipAdress;
  const intervalId = useRef(null);  // Using useRef to keep a mutable reference that doesn't trigger re-renders

  useEffect(() => {
    setDeviceId(Device.osBuildId); // Using OS Build ID as a unique identifier for demo purposes
    intervalId.current = setInterval(checkAssociationStatus, 5000); // Set up an interval to check tablet association status

    return () => clearInterval(intervalId.current); // Cleanup on component unmount
  }, [deviceId]);

  const checkAssociationStatus = async () => {
    const data = { "device_id": deviceId };
    try {
      const response = await axios.post(`http://${ipAdress}:8000/api/tablette/getEtat`, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });
      console.log("Status Check:", response.data['statut']);
      if (response.data['statut'] === 'associer') {
        clearInterval(intervalId.current); // Stop checking once associated
        navigation.navigate('DemandeAccepter'); // Navigate to the associated page
      }
    } catch (error) {
      console.error("Failed to check association status:", error);
    }
  };

  const image = require('./image/connexion.jpg');
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Demande envoyée</Text>
      <TouchableOpacity style={styles.button} onPress={checkAssociationStatus}>
        <Text style={styles.buttonText}>Vérifier l'état de l'association</Text>
      </TouchableOpacity>
      <Text style={styles.text2}>
        Après la visualisation de votre demande nous vous informerons de la réponse lorsque vous êtes connecté
      </Text>
      {modalIsOpen && (
        <Modal
          visible={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          transparent
          animationType="slide"
        >
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#43bc90" />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7D8FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 300,
    marginBottom: 50
  },
  button: {
    marginTop: 50,
    padding: 10,
    width: 330,
    backgroundColor: '#194a7a',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text2: {
    fontSize: 15,
    marginTop: 30,
    fontWeight: '500',
    color: '#006e4f'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
