import React, { useState ,useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';
import { useNavigation } from '@react-navigation/native';

const Head = () => (
    <View style={styles.headContainer}>
        <Image source={require('../logofsac.jpeg')} style={styles.logo} />
        <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
);

export default function AddRapp({ route}) {
    const etudiant = route.params?.etudiant;
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);
    const navigation = useNavigation();
    const { listeEtudiants,addRapport } = useEtudiants();
     
    useEffect(() => {
        if (etudiant) {
            const fullName = `${etudiant.nom_etudiant} ${etudiant.prenom_etudiant}`;
            setSearch(fullName);
            setSelectedEtudiant(etudiant);
        }
    }, [etudiant]);

    const handleSearchChange = (text) => {
        setSearch(text);
    };

    const handleSelectEtudiant = (item) => {
        setSelectedEtudiant(item);
        setSearch(`${item.nom_etudiant} ${item.prenom_etudiant}`);
    };

    const soumettreRapport = ()=>{
        const repport ={ 
            "titre_rapport": titre,
            "contenu": contenu,
            "etudiant": selectedEtudiant,
        }
        addRapport(repport);
        navigation.navigate('Rapport')
    }
    
    const Card = ({ item }) => {
        
      return (
        <View style={styles.card}>
          <Image
            source={require('../../acceuil.png')}
            style={styles.image}
          />
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

    

    return (
        <GestureHandlerRootView style={styles.container}>
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
                onChangeText={(val) => changeContenu(val)}
                multiline
            />
            <TouchableOpacity style={styles.button1} onPress={soumettreRapport}>
                <Text style={styles.textbutton}>Soumettre</Text>
            </TouchableOpacity>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },image: {
      flex:2,
      width: 100,
      height: 100,
      borderRadius: 10,
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
        minHeight: 30,
        borderWidth: 1,
        padding: 10,
        margin: 12,
    },
    button1: {
        backgroundColor: 'blue',
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
    card: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      margin:10,
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
