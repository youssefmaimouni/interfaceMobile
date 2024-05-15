import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEtudiants } from './dataScreen';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('./logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

export default function Etudiants(){
  const { listeEtudiants, setListeEtudiants } = useEtudiants();
  const updateObject = (updatedValues) => {
    const updatedArray = listeEtudiants.map((item) => {
      if (updatedValues===item) {
        return { ...item, ...updatedValues };
      }
      return item;
    });
    setListeEtudiants(updatedArray);
  };

  const Card = ({ item }) => {
    const [isPresent, setIsPresent] = useState(item.estPerson);
    const [isReppored, setIsReppored] = useState(item.id_rapport!=null);

       
  
    const togglePresence = () => {
      item.estPerson = !isPresent;
      updateObject(item);
      setIsPresent(item.estPerson);
    };
    const togglePresenceR = () => {
      if (isReppored) {
        item.id_rapport=null;
        updateObject(item);
        setIsReppored(item.id_rapport!=null);
      } else {
        setIsReppored(!isReppored);
      }
    };
   
  
    
  
    return (
      <View style={styles.card}>
        <Image
          source={require('../acceuil.png')}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.nom} {item.prénom}</Text>
          <Text>Code Apogée: {item['code-apogée']}</Text>
          <Text>CNE: {item.CNE}</Text>
          <Text>numéro exam: {item['numéro-exam']}</Text>
          <View style= {{flexDirection:'row',flex:1,alignSelf:'flex-end'}}>
          <TouchableOpacity
            style={[styles.button, item.estPerson ? styles.presentButton : styles.absentButton]}
            onPress={togglePresence}
          >
            <Text style={styles.buttonText}>{item.estPerson ? 'Présent' : 'Absent'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, item.id_rapport!=null ?  styles.nonRepporedButton: styles.reppordButton]}
            onPress={togglePresenceR}
          >
            <Text style={styles.buttonText}>{item.id_rapport!=null ? 'supprimer Rapport' :'fait Rapport' }</Text>
          </TouchableOpacity>
        </View></View>
      </View>
    );
  };
 
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}> 
      <Head />

        <Text style={styles.title}>Liste des étudiants</Text>
      {listeEtudiants.map((item)=>(
        <Card item={item} key={item['numéro-exam']}/>
      ))}
    
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: 'center',
    padding: 8,
    borderRadius: 5,
    margin: 10,
  },
  presentButton: {
    backgroundColor: '#1b5e20',
  },
  absentButton: {
    backgroundColor: '#b71c1c',
  },
  reppordButton: {
    backgroundColor: '#b71c1c',
  },
  nonRepporedButton: {
    backgroundColor: '#01579b',
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
          },scrollView: {
            marginBottom:60,
            marginTop:10,
          }
  
});


