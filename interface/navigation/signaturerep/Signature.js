import React, { useState } from 'react'; // Ajout de useState
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import surveillants from '../data/surveillant.json';
import { useNavigation } from '@react-navigation/native';
import reservistes from '../data/reserviste.json'; // Assurez-vous que le chemin est correct et les données sont chargées

const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('../logofsac.jpeg')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire ____-____</Text>
  </View>
);

export default function Sign() {
  const navigation = useNavigation();
  const [afficher, setAfficher] = useState(false);
  const [signatures, setSignatures] = useState(new Set());

  const handleSign = (id) => {
    setSignatures(new Set([...signatures, id]));
    navigation.navigate('SignatureScreen'); // Supposons que l'enregistrement se fasse ici
  };
  const handleSignReserviste = (reserviste) => {
    handleSign(reserviste.id_surveillant);
  };
  const image = require('../backflou.png');
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
          <Head />
          <Text style={styles.title}>Liste des surveillants</Text>
          {surveillants.map((item) => (
            <View style={styles.card} key={item.id_surveillant}>
              <View style={styles.contenu}>
                <Text style={styles.cardText}>{item.nom_complet}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleSign(item.id_surveillant)}>
                     <Text style={styles.buttonText}>{signatures.has(item.id_surveillant) ? 'Signé' : 'Signer'}</Text>
                </TouchableOpacity>

              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.button1} onPress={() => setAfficher(!afficher)}>
            <Text style={styles.buttonText}>Liste des réservistes</Text>
          </TouchableOpacity>

          {afficher && (
            reservistes.map((item) => (
              <View style={styles.card} key={item.id_surveillant}>
                <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.nom_complet}</Text>
                  <TouchableOpacity style={styles.button} onPress={() => handleSignReserviste(item)} >
                    <Text style={styles.buttonText} >{signatures.has(item.id_surveillant) ? 'Signé' : 'Signer'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </GestureHandlerRootView>
      </ImageBackground>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
      scrollView: {
        marginBottom: 60,
        marginTop:10,
      },
      headContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5, 
      },
      logo: {
        height: 50,
        width: 120,
      },
      year: {
        fontSize:13,
        marginLeft:110,
        marginTop:20,
      },
      title: {
        fontSize: 20,
        color: 'black',
        paddingTop: 50,
        fontWeight:'bold',
        alignSelf:'center'
      },
      card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        margin:10,
      },
      contenu:{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      cardText: {
          flex: 1,
      marginRight: 16,
        fontSize: 13,
      },
      button: {
        flexDirection: 'row',
        backgroundColor: '#01579b', 
        padding: 5,
        borderRadius: 5,
        marginTop: 14,
        marginLeft:5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      button1: {
        backgroundColor: '#01579b', 
        padding: 5,
        borderRadius: 5,
        margin: 14,
        marginRight:200,

      },
    })