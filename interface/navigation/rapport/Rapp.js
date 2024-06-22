import React, { useState } from 'react';
import { View,Text ,StyleSheet,Image, Button, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import rapportList from '../data/rap.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';


const Head = (props) => (
  <View style={styles.headContainer}>
    <Image source={require('../fsacLog.png')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire:{props.annee}</Text>
  </View>
);
    

export default function Rapp({ navigation }) {

    const {listeRapport,infoAccuil ,deleteRapport}=useEtudiants();
    
   
    
     const image = require('../backflou.png'); 
    return (
      

      <ImageBackground  resizeMode="cover" style={styles.image}>
       <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
        <Head annee={ infoAccuil.Annee_universitaire}/>
        <Text style={styles.title}>Rapport</Text>
        <TouchableOpacity style={styles.buttonAjout} onPress={() => navigation.navigate('AddRapport',{screen:'Rapport'})}>
        <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
         {listeRapport.map( (item)  => (
                
                <View style={styles.card} key={item.etudiant.codeApogee}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddRapport', { rapport: item, modif: true, screen:'Rapport'})}>
                  <Text style={styles.cardText}>{item.titre_rapport}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.etudiant.nom_etudiant}</Text>
                  <TouchableOpacity style={styles.button1} onPress={()=>{deleteRapport(item._id,item._rev)}} >
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
        borderColor:'white',
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: { width: 0, height: 2 }, // Décalage horizontal et vertical de l'ombre
        shadowOpacity: 0.8, // Opacité de l'ombre
        shadowRadius: 3, // Rayon du flou de l'ombre
        elevation: 5, 
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