import React, { useState } from 'react';
import { View,Text ,StyleSheet,Image, Button, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import rapportList from '../data/rap.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';


const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../logot.jpg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

    

export default function Rapp({ navigation }) {
    const {listeRapport ,setListeRapport ,deleteStudent,editRapport}=useEtudiants();
    
   
    
    const handleDelete = async (id) => {
        try {
            const updatedRapports = listeRapport.filter((item) => item.id !== id);
            setListeRapport(updatedRapports);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
       
}; const image = require('../backflou.png'); 
    return (
      

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
        <Head/>
        <Text style={styles.title}>Rapport</Text>
        <TouchableOpacity style={styles.buttonAjout} onPress={() => navigation.navigate('AddRapport')}>
        <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
         {listeRapport.map( (item)  => (
                <View style={styles.card} key={item.etudiant.codeApogee}>
                  <Text style={styles.cardText}>{item.titre_rapport}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.etudiant.nom_etudiant}</Text>
                  <TouchableOpacity style={styles.button} onPress={editRapport}>
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1} onPress={()=> handleDelete(item)}>
                    <Text style={styles.buttonText} >Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              ))
            }
        </ScrollView>
       </GestureHandlerRootView> 
       </ImageBackground>
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
      justifyContent:'center',
  }, 
  });