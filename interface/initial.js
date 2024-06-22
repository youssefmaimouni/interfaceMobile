import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import registerForPushNotificationsAsync from './navigation/registerForPushNotificationsAsync';

const firebaseConfig = Constants.expoConfig?.extra ?? undefined;

if (!firebaseConfig) {
  console.error('Firebase configuration is missing or not loaded properly.');
} else {
  initializeApp(firebaseConfig);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default function Initial() {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  const image = require('./bgg.jpeg');
  return (
    <ImageBackground source={image} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.textprin}>Bienvenue sur notre Application de Gestion des Présences!</Text>
        <Text style={styles.text}>
          Cette application innovante, conçue pour les établissements d'enseignement supérieur, 
          révolutionne la gestion des présences durant les examens grâce à la technologie de scan de QR codes. 
          Développée par des étudiants de l'Université Hassan II de Casablanca, 
          cette solution permet un enregistrement rapide et précis des présences,
          améliorant l'efficacité du processus et réduisant les erreurs administratives.
          Avec une interface conviviale et des fonctionnalités avancées,
          notre application assure une expérience fluide tant pour les surveillants que pour l'administration,
          facilitant une gestion efficace des présences en temps réel.
          Embarquez dans l'ère de la digitalisation avec nous et optimisez la gestion des présences lors de vos examens!
        </Text>     
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textbutton}>commencer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    marginTop: '50%',
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginLeft:0,
    marginRight:0,
  },
  textprin: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 50,
    marginTop :40
  },
  text: {
    fontSize: 16,
    color: '#373A40',
    marginBottom: 30,
    marginTop:30,
    marginBottom:50
  },
  button: {
    backgroundColor: '#238AF5',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginBottom: 5,
    marginTop:20

  },
  textbutton: {
    color: 'white',
    fontSize: 20,
  },
});
