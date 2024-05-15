import React, { useState } from 'react';
import { View,Text ,StyleSheet,Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import rapportList from '../data/rap.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';


const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

    

export default function Rapp({ navigation }) {
    const {listeRapport ,setListeRapport}=useEtudiants();
    
   
    
    const handleDelete = async (id) => {
        try {
            const updatedRapports = listeRapport.filter((item) => item.id !== id);
            setListeRapport(updatedRapports);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
        
};
    return (
    <View style={styles.container}>
        
       <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
        <Head/>
        <Text style={styles.title}>Rapport</Text>
        <TouchableOpacity style={styles.buttonAjout} onPress={() => navigation.navigate('AddRapport')}>
        <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
         {listeRapport.map( (item)  => (
                <View style={styles.card} key={item.id}>
                  <Text style={styles.cardText}>{item.titre}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.nom}</Text>
                  <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1} onPress={()=> handleDelete(item.id)}>
                    <Text style={styles.buttonText} >Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              ))
            }
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
      paddingTop: StatusBar.currentHeight,
    },

    headContainer: {
        flex: 1,
        flexDirection:'row',
        marginTop:10,
      },
      logo: {
        marginRight:0,
        marginLeft:5,
        height:50,
        width:120,
            
      },
      headContainer: {
            flex: 1,
            flexDirection:'row',
            marginTop:10,
          },
          logo: {
            marginLeft:5,
            height:50,
            width:120,
           
          },
          year: {
            fontSize:13,
            marginLeft:110,
            marginTop:20,
          },
          title:{
            fontSize: 30,
            fontWeight: 'bold', // Police en gras
            color: 'black', // Couleur bleu clair
            textAlign: 'center', // Alignement au centre
            padding:30,
          },
          buttonAjout:{
          flexDirection: 'row',
          backgroundColor: '#1b5e20', // Change to your desired button color
          borderRadius: 5,
          marginTop: 14,
          marginLeft:300,
          marginRight:50,
          padding:5,
          },
    scrollView: {
      marginBottom:60,
      marginTop:10,
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
    button1: {
      flexDirection: 'row',
      backgroundColor: '#b71c1c', // Change to your desired button color
      padding: 5,
      borderRadius: 5,
      marginTop: 14,
      marginLeft:5,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#01579b', // Change to your desired button color
      padding: 5,
      borderRadius: 5,
      marginTop: 14,
      marginLeft:5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });