import React, { useState } from 'react'; // Ajout de useState
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useEtudiants } from '../dataScreen';

const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('../logofsac.jpeg')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire ____-____</Text>
  </View>
);

const Card = ({ item }) => {
  const navigation = useNavigation();
    const [signed,setSigned] = useState(true);
  const signa = () => {
    if(signed){
      setSigned(false);
      navigation.navigate('SignatureScreen'); 
      
    }
  };
  return (
    <View style={styles.card} >
              <View style={styles.contenu}>
                <Text style={styles.cardText}>{item.nom_complet}</Text>
                <TouchableOpacity style={styles.button} onPress={signa}><Text>{signed?'signer':'signé'}</Text></TouchableOpacity>
              </View>
            </View>
  );
 
}

const Cardr = ({ item }) => {
  const navigation = useNavigation();
  const [signed,setSigned] = useState(true);
  const {addSurveillants,deleteReserviste}=useEtudiants();
  const signa = () => {
    if(signed){
      const reserviste = {
        id_surveillant: item.id_surveillant,
        id_departement: item.id_departement,
        nom_complet: item.nom_complet,
    };
      addSurveillants(reserviste);
      
      deleteReserviste(item._id,item._rev);
    }
  };
  return (
    <View style={styles.card} >
              <View style={styles.contenu}>
                <Text style={styles.cardText}>{item.nom_complet}</Text>
                <TouchableOpacity style={styles.button} onPress={signa}><Text>surveiller</Text></TouchableOpacity>
              </View>
    </View>
  );
 
}
 

export default function Sign() {
  
  const [afficher, setAfficher] = useState(false);
  const {listeReserviste,listeSurveillants}=useEtudiants();
  
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
          <Head />
          <Text style={styles.title}>Liste des surveillants</Text>
          {listeSurveillants.map((item) => (
            <Card item={item} key={item.id_surveillant}/>
          ))}

          <TouchableOpacity style={styles.button1} onPress={() => setAfficher(!afficher)}>
            <Text style={styles.buttonText}>Liste des réservistes</Text>
          </TouchableOpacity>

          {afficher && (
            listeReserviste.map((item) => (
              <Cardr item={item} key={item.id_surveillant}/>
            ))
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
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