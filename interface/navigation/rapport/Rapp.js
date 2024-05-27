import React, { useState } from 'react';
import { View,Text ,StyleSheet,Image, Button, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import rapportList from '../data/rap.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';


const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../../fsacLogo-removebg-preview.png')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

    

export default function Rapp({ navigation }) {

    const {listeRapport ,deleteRapport}=useEtudiants();
    
   
    
     const image = require('../backflou.png'); 
    return (
      

      <ImageBackground  resizeMode="cover" style={styles.image}>
       <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
        <Head/>
        <Text style={styles.title}>Rapport</Text>
        <TouchableOpacity style={styles.buttonAjout} onPress={() => navigation.navigate('AddRapport')}>
        <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
         {listeRapport.map( (item)  => (
                
                <View style={styles.card} key={item.etudiant.codeApogee}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddRapport', { rapport: item, modif: true })}>
                  <Text style={styles.cardText}>{item.titre_rapport}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.etudiant.nom_etudiant}</Text>
                  <TouchableOpacity style={styles.button1} onPress={()=>deleteRapport(item._id,item._rev)} >
                    <Text style={styles.buttonText} >Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                  </TouchableOpacity>
                </View>
              ))
            }
        </ScrollView>
       </GestureHandlerRootView> 
       </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      backgroundColor: '#E1E7E7',
     
    },

  
      headContainer: {
            
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
            fontWeight: 'bold', 
            color: 'black',
            textAlign: 'center', 
            padding:30,
          },
          buttonAjout:{
          backgroundColor: '#194a7a', 
          borderRadius: 5,
          marginTop: 14,
          marginLeft:300,
          marginRight:50,
          padding:2,
          },
    scrollView: {
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
      backgroundColor: '#607e96', 
      padding: 5,
      borderRadius: 5,
      marginTop: 14,
      marginLeft:5,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#607e96', 
      textAlign:'center',
      padding: 5,
      borderRadius: 5,
      marginTop: 14,
      marginLeft:5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      padding:2,
    },image:{
      flex:1,
      alignItems:'center'
  }, 
  });