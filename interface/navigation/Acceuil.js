import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert ,LogBox} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSignatures } from './signaturerep/signaturecontexr';
import Timer from './timer'; 
import * as Notifications from 'expo-notifications';

LogBox.ignoreLogs(['expo-permissions is now deprecated — the functionality has been moved to other expo packages that directly use these permissions (e.g. expo-location, expo-camera). The package will be removed in the upcoming releases']); 

const Acceuil = ({ route }) => {
  const image = require('../bg4.jpg');
  const navigation = useNavigation();
  const { seance } = route.params;
  const { signatures } = useSignatures();

  useEffect(() => {
    async function requestNotificationPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications was denied');
      }
    }
    requestNotificationPermission();
  }, []);

  const handleGeneratePDF = () => {
    if (signatures) {
      navigation.navigate('GeneratePDF', { surveillantSignatures: signatures });
    } else {
      console.error("No signatures found");
    }
  };

  const showAlertWithAction = () => {
    Alert.alert(
      "Attention",
      "Si vous naviguez vers la Séance 2, vous ne pourrez pas retourner.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleOKPress(),
        }
      ],
      { cancelable: false }
    );
  };

  const handleOKPress = () => {
    console.log("OK Pressed");
    navigation.navigate("Seance2");
    sendNotification("Séance 2", "Vous avez navigué vers la Séance 2.");
  };

  const handleOKPress2 = () => {
    console.log("OK 2");
    navigation.navigate("EnvoiDeDonneer");
  };

  const FinExame = () => {
    Alert.alert(
      "Attention",
      "Si vous terminer la seance, vous ne pourrez pas retourner.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handleGeneratePDF(),
        }
      ],
      { cancelable: false }
    );
  };

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null, 
    });
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.card}>
        <Head />
        <View style={styles.con}>
          <Text>Année universitaire ____-____</Text>
          <Text>module :</Text>
          <Text>seance :{seance}</Text>
          <Text>demi_journée:</Text>
          <Text>local:</Text>
          <Timer />
          {seance === 'seance1' && (
            <TouchableOpacity onPress={showAlertWithAction} style={styles.button}>
              <Text style={{ color: '#fff' }}>Seance 2</Text>
            </TouchableOpacity>
          )}
          {seance === 'seance2' && (
            <TouchableOpacity onPress={FinExame} style={styles.button}>
              <Text style={{ color: '#fff' }}>fin d'examen</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('./logofsac.jpeg')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E7E7'
  },
  con: {
    marginTop: 100,
  },
  card: {
    margin: 10,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 400,
    width: 350
  },
  text: {
    marginTop: 100,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 20,
    alignSelf: 'center'
  },
  logo: {
    height: 50,
    width: 120,
    marginLeft: 10,
  },
  year: {
    fontSize: 13,
    marginLeft: 10,
    marginTop: 20,
    marginLeft: 40,
  },
  button: {
    marginTop: 50,
    padding: 6,
    width: 200,
    backgroundColor: '#476f95',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});

export default Acceuil;
