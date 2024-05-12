import React, { useState } from 'react';
import { View,Text ,StyleSheet,Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import rapportList from './data/rapport.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AddRapp from './AjoutRapport.js';
import { createStackNavigator } from 'react-navigation-stack';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

    

export default function Rapp() {
    const [rapports, setRapports] = useState(rapportList);
    
   
    
    const handleDelete = async (id) => {
        try {
            const updatedRapports = rapports.filter((rapport) => rapport.id !== id);
            setRapports(updatedRapports);
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
        <TouchableOpacity style={styles.buttonAjout}>
        <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
          <FlatList
            data={rapports}
            renderItem={({ item }) => {
              return (
                <View style={styles.card} key={item.id}>
                  <Text style={styles.cardText}>{item.titre}</Text>
                  <View style={styles.contenu}>
                  <Text style={styles.cardText}>{item.nom}</Text>
                  <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=> handleDelete(item.id)}>
                    <Text style={styles.buttonText} >Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
          />
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
          backgroundColor: 'blue', // Change to your desired button color
          borderRadius: 5,
          marginTop: 14,
          marginLeft:300,
          marginRight:50,
          padding:5,
          },
    scrollView: {
      marginBottom:60,
      marginTop:20,
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
      backgroundColor: 'blue', // Change to your desired button color
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