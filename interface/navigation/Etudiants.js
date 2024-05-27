import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEtudiants } from './dataScreen';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../fsacLogo-removebg-preview.png')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );
  const image = require('./backflou.png');
  export default function Etudiants(){
  const navigation=useNavigation();
  const { listeEtudiants, setListeEtudiants,updateStudent } = useEtudiants();

  const Card = ({ item }) => {
    const [isPresent, setIsPresent] = useState(item.estPerson);
    const [isReppored, setIsReppored] = useState(item.id_rapport!=null);

       
  
    const togglePresence = () => {
      item.estPerson = !item.estPerson;
      updateStudent(item._id,item);
      setIsPresent(item.estPerson);
    };
    const togglePresenceR = () => {
      if (isReppored) {
        item.id_rapport=null;
        updateStudent(item._id,item);
        setIsReppored(item.id_rapport!=null);
      } else {
        setIsReppored(!isReppored);
        navigation.navigate('AddRap', { etudiant: item });
      }
      
    };
   

      
  
    return (
      <View style={styles.card}><View style= {{flexDirection:'row',flex:1,alignSelf:'flex-end'}}>
        <Image
          source={require('./etu.jpeg')}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.nom_etudiant} {item.prenom_etudiant}</Text>
          <Text>Code Apogée: {item.codeApogee}</Text>
          <Text>CNE: {item.CNE}</Text>
          <Text>numéro exam: {item.numeroExam}</Text>
        </View>
        <View style={styles.buttons}>
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
            <Text style={styles.buttonText}>{item.id_rapport!=null ? 'rapporté' :'fait Rapport' }</Text>
          </TouchableOpacity>
          
        </View>
        </View>
      </View>
    ); 
  };

 
  return (
  <ImageBackground  resizeMode="cover" style={styles.container}>
    
      <ScrollView style={styles.scrollView}> 
      <Head />

        <Text style={styles.title}>Liste des étudiants</Text>
      {listeEtudiants.map((item)=>(
        <Card item={item} key={item.numeroExam}/>
      ))}
    
      </ScrollView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E7E7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  headContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5,
  },
  logo: {
    height: 50,
    width: 120,
    marginLeft: 10,
  },
  year: {
    fontSize: 13,
    marginTop: 20,
    marginLeft: 120,
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
    margin: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 15,
    marginTop:40,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttons:{
    margin:20,
    marginTop:50
  },
  button: {
    padding: 8,
    borderRadius: 8,
    
    margin: 5,
    height: 35,
  },
  presentButton: {
    backgroundColor: '#476f95',
  },
  absentButton: {
    backgroundColor: '#0070ad',
  },
  reppordButton: {
    backgroundColor: '#0070ad',
  },
  nonRepporedButton: {
    backgroundColor: '#476f95',
  },
  buttonText: {
    color: '#fff',
    alignSelf:'center'
  },
  scrollView: {
    marginBottom: 60,
    marginTop: 10,
  }
});
