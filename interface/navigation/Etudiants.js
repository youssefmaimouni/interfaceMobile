import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEtudiants } from './dataScreen';
import * as FileSystem from 'expo-file-system';

const Head = (props) => (
  <View style={styles.headContainer}>
    <Image source={require('./fsacLog.png')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire:{props.annee}</Text>
  </View>
);
  const image = require('./backflou.png');
  export default function Etudiants(){
  const navigation=useNavigation();
  const { listeEtudiants,infoAccuil,setListeEtudiants,updateStudent } = useEtudiants();
  const [search, setSearch] = useState('');

  const Card = ({ item }) => {
    const [isPresent, setIsPresent] = useState(item.estPerson);
    const [isReppored, setIsReppored] = useState(item.id_rapport!=null);
    const [imageUri, setImageUri] = useState(null);
    const imagePath = `${FileSystem.documentDirectory}${item.codeApogee}.jpg`;
       
  
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
        navigation.navigate('AddRap', { etudiant: item ,screen:'Etudiant'});
      }
      
    };
    const loadImage = async () => {
      console.log('Loading image from filesystem...');
      try {
          const fileInfo = await FileSystem.getInfoAsync(imagePath);
          if (fileInfo.exists) {
              console.log('Image loaded from:', imagePath);
              setImageUri(imagePath + '?' + new Date().getTime()); // Adding a timestamp to the URI to avoid caching issues
          } else {
              console.log('No image found at the path');
          }
      } catch (error) {
          console.error('Failed to load image:', error);
      }
  };
  useEffect(()=>{
    loadImage();
  },[])
   

      
  
    return (
      <View style={styles.card}><View style= {{flexDirection:'row',flex:1,alignSelf:'flex-end'}}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.nom_etudiant} {item.prenom_etudiant}</Text>
          <Text>Code Apogée: {item.codeApogee}</Text>
          <Text>CNE: {item.CNE}</Text>
          <Text>numéro exam: {item.num_exam}</Text>
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

  const handleSearchChange = (text) => {
    setSearch(text);
};
const filteredEtudiants = listeEtudiants.filter(etudiant => {
  const searchLower = search.toLowerCase();
  const fullName = `${etudiant.nom_etudiant.toLowerCase()} ${etudiant.prenom_etudiant.toLowerCase()}`;
  const reversedFullName = `${etudiant.prenom_etudiant.toLowerCase()} ${etudiant.nom_etudiant.toLowerCase()}`;
  
  return fullName.includes(searchLower) || reversedFullName.includes(searchLower) ||
      searchLower.split(' ').every(word => fullName.includes(word) || reversedFullName.includes(word));
});
  return (
  <ImageBackground  resizeMode="cover" style={styles.container}>
    
      <ScrollView style={styles.scrollView}> 
      <Head annee={ infoAccuil.Annee_universitaire}/>

        <Text style={styles.title}>Liste des étudiants</Text>
        <TextInput
                style={styles.input}
                placeholder='Rechercher étudiant'
                value={search}
                onChangeText={handleSearchChange}
            />
            {search.length > 0 && filteredEtudiants.length > 0 && (
                <View style={styles.list}>
                    {filteredEtudiants.map((item) => (
                        <TouchableOpacity key={item['codeApogee']} onPress={() => handleSelectEtudiant(item)}>
                            <Card item={item} key={item['numeroExam']}/>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
      {!search.length > 0 && listeEtudiants.map((item)=>(
        <Card item={item} key={item.num_exam}/>
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
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 10,
    width: '100%',
},
  logo: {
    height: 50,
    width: 120,
    marginLeft: 10,
  },
  year: {
    fontSize:13,
    marginLeft:110,
    marginTop:20,
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
    width: 100,
    height: 130,
    borderRadius: 10,
    margin: 5,
    marginTop:10,
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
