import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import listeEtudiants from '../donnee/listeEtudiants.json'; // Importing the listeEtudiants from the JSON file

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
    <FlatList
      data={listeEtudiants}
      renderItem={({ item }) => <Card item={item} />}
      keyExtractor={(item) => item.id_rapport.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  },
});


