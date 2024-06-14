import React, { useState ,useEffect } from 'react';
import { KeyboardAvoidingView,Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const Head = () => (
    <View style={styles.headContainer}>
        <Image source={require('../logofsac.jpeg')} style={styles.logo} />
        <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
);


    export default function AddRapp({ route }) {
    const etudiant = route.params?.etudiant;
    const screen = route.params?.screen;


    const rapportInitial = route.params?.rapport;
    const [isEditing, setIsEditing] = useState(route.params?.modif || false);
   
    const [titre, setTitre] = useState(rapportInitial?.titre_rapport ||'');
    
    const [contenu, setContenu] = useState(rapportInitial?.contenu ||'');
    
    const [selectedEtudiant, setSelectedEtudiant] = useState(rapportInitial?.etudiant|| null);
    
    const [search, setSearch] = useState('');
   
     
    const navigation = useNavigation();
    const { listeEtudiants, addRapport,updateRapport,updateStudent, listeRapport } = useEtudiants();
    
    useEffect(() => {
        if (etudiant) {
            setSelectedEtudiant(etudiant);
            setSearch(`${etudiant.nom_etudiant} ${etudiant.prenom_etudiant}`);
        }
    }, [etudiant, listeEtudiants]);

    useEffect(() => {
        if (rapportInitial) {
            setIsEditing(true);
            
            setSelectedEtudiant(rapportInitial.etudiant);
           setSearch(`${rapportInitial.etudiant.nom_etudiant} ${rapportInitial.etudiant.prenom_etudiant}`);
            setTitre(rapportInitial.titre_rapport);
           
            setContenu(rapportInitial.contenu);
        }
    }, [rapportInitial]);
    console.log(rapportInitial);

    const soumettreRapport = () => {
        if (selectedEtudiant && titre && contenu) {
            if (isEditing) {
                const updatedRapport = {
                    titre_rapport: titre,
                    contenu: contenu,
                    etudiant: selectedEtudiant,
                };
                updateRapport(rapportInitial._id,updatedRapport);
                navigation.navigate(screen);
            } else {
                const exists = listeRapport.some(rapport => rapport.etudiant.codeApogee === selectedEtudiant.codeApogee);

                if (!exists) {
                    selectedEtudiant.id_rapport=1;
                    const rapport = {
                        titre_rapport: titre,
                        contenu: contenu,
                        etudiant: selectedEtudiant,
                    };
                    addRapport(rapport);
                    console.log(selectedEtudiant);
                    updateStudent(selectedEtudiant._id,selectedEtudiant);
                    navigation.navigate(screen);
                } else {
                    alert("Un rapport pour cet étudiant existe déjà.");

                }
            }
        } else {
            alert("Veuillez remplir tous les champs");
        }
    };

    const handleSearchChange = (text) => {
        setSearch(text);
    };

    const handleSelectEtudiant = (item) => {
        setSelectedEtudiant(item);
        setSearch(`${item.nom_etudiant} ${item.prenom_etudiant}`);
    };

   
    const Card = ({ item }) => {
        const [imageUri, setImageUri] = useState(null);
        const imagePath = `${FileSystem.documentDirectory}${item.codeApogee}.jpg`;
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
        <View style={styles.card}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.nom_etudiant} {item.prenom_etudiant}</Text>
            <Text>Code Apogée: {item['codeApogee']}</Text>
            <Text>CNE: {item.CNE}</Text>
            <Text>numéro exam: {item['numeroExam']}</Text>
            </View>
        </View> 
      );
    };

    const filteredEtudiants = listeEtudiants.filter(etudiant => {
        const searchLower = search.toLowerCase();
        const fullName = `${etudiant.nom_etudiant.toLowerCase()} ${etudiant.prenom_etudiant.toLowerCase()}`;
        const reversedFullName = `${etudiant.prenom_etudiant.toLowerCase()} ${etudiant.nom_etudiant.toLowerCase()}`;
        
        return fullName.includes(searchLower) || reversedFullName.includes(searchLower) ||
            searchLower.split(' ').every(word => fullName.includes(word) || reversedFullName.includes(word));
    });

    const changeTitre = (val) => {
        setTitre(val);
    };
    const changeContenu = (val) => {
        setContenu(val);
    };
    const image=require('../../bg0.jpg');
    

    return (
        <ImageBackground source={image} resizeMode="cover" style={{flex:1}}>
        <GestureHandlerRootView style={styles.container}>
        <KeyboardAvoidingView
        behavior="height" // Comportement pour Android
        style={styles.container}
        keyboardVerticalOffset={20} // Ajustez selon le besoin pour éviter que le clavier ne recouvre des éléments
      >
          <ScrollView style={styles.scrollView}>
            <Head />
            
            <Text style={styles.title}>Rapport</Text>
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
           
            <TextInput
                style={styles.input}
                placeholder='Titre du rapport'
                value={titre}
                onChangeText={(val) => changeTitre(val)}
            />
            <TextInput
                style={styles.multilinetext}
                placeholder='Contenu'
                value={contenu}
                onChangeText={(val) => changeContenu(val)}
                multiline
            />
            <TouchableOpacity style={styles.button1} onPress={soumettreRapport}>
                <Text style={styles.textbutton}>Soumettre</Text>
            </TouchableOpacity>
            
            </ScrollView>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 15,
        marginTop:10,
    }, cardContent: {
      flex: 2,
      padding: 10,
    },
    name: {
      flex:2,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
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
    headContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5,
    },
    logo: {
        height: 50,
        width: 120,
    },
    year: {
        fontSize: 13,
        marginLeft: 10,
        marginTop: 20,
        marginLeft: 50,
    },
    scrollView: {
      marginBottom: 60,
      marginTop: 20,
      paddingHorizontal: 10,
  },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 20,
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
    multilinetext: {
        minHeight: 65,
        borderWidth: 0.5,
        padding: 10,
        margin: 12,
        backgroundColor:'#F5F5F5',
        borderColor:'#B0B0B0',
        borderRadius:8
    },
    button1: {
        backgroundColor: '#839DAF',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 14,
        marginBottom: 10,
        alignSelf: 'center',
    },
    list: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textbutton: {
        fontSize: 13,
        color: 'white',
    },
});
