import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import listeEtudiants from '../donnee/listeEtudiants.json'; // Importing the listeEtudiants from the JSON file
import { StatusBar } from 'expo-status-bar';
const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

  
const Card = ({ item }) => {
  const [isPresent, setIsPresent] = useState(item.estPerson);

  const togglePresence = () => {
    setIsPresent(!isPresent);
  };

  

  return (
    <View style={styles.card}>
      <Image
        source={require('../fsacLogo.png')}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nom} {item.prénom}</Text>
        <Text>Code Apogée: {item['code-apogée']}</Text>
        <Text>CNE: {item.CNE}</Text>
        <TouchableOpacity
          style={[styles.button, isPresent ? styles.presentButton : styles.absentButton]}
          onPress={togglePresence}
        >
          <Text style={styles.buttonText}>{isPresent ? 'Présent' : 'Absent'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default function Etudiants(){
  return (
    <View style={styles.container}>
      <ScrollView>
      <Head />

        <Text style={styles.title}>Liste des étudiants</Text> 
      <View>
      {listeEtudiants.map((item)=>(
        <Card item={item} key={item['numéro-exam']}/>
      ))}
     </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    
  },
  listeEtudiants: {
    flex:1,
   marginTop:50
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignSelf:'center',
  },
  headContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5, 
  },
  logo: {
    height: 50,
    width: 120,
    marginLeft:10,
  },
  year: {
    fontSize: 13,
    marginLeft: 10, 
    marginTop: 20,
    marginLeft:120,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  presentButton: {
    backgroundColor: 'green',
  },
  absentButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
  },headContainer: {
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
  
});

