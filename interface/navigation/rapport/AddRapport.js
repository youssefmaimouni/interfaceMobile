import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEtudiants } from '../dataScreen';

const Head = () => (
    <View style={styles.headContainer}>
        <Image source={require('../logofsac.jpeg')} style={styles.logo} />
        <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
);

export default function AddRapp() {
    const [titre, setTitre] = useState('');
    const [search, setSearch] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);

    const { listeEtudiants } = useEtudiants();
    
    const Card = ({ item }) => {
        
      return (
        <View style={styles.card}>
          <Image
            source={require('../../acceuil.png')}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.nom} {item.prénom}</Text>
            <Text>Code Apogée: {item['code-apogée']}</Text>
            <Text>CNE: {item.CNE}</Text>
            <Text>numéro exam: {item['numéro-exam']}</Text>
            </View>
        </View>
      );
    };

    const filteredEtudiants = listeEtudiants.filter(etudiant => {
        const searchLower = search.toLowerCase();
        const fullName = `${etudiant.nom.toLowerCase()} ${etudiant.prénom.toLowerCase()}`;
        const reversedFullName = `${etudiant.prénom.toLowerCase()} ${etudiant.nom.toLowerCase()}`;
        
        return fullName.includes(searchLower) || reversedFullName.includes(searchLower) ||
            searchLower.split(' ').every(word => fullName.includes(word) || reversedFullName.includes(word));
    });

    const changeHandler = (val) => {
        setTitre(val);
    };

    const handleSelectEtudiant = (etudiant) => {
        setSelectedEtudiant(etudiant);
        setSearch(`${etudiant.nom} ${etudiant.prénom}`);
    };

    const handleSearchChange = (val) => {
        setSearch(val);
        if (!val) {
            setSelectedEtudiant(null);
        }
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
                        <TouchableOpacity key={item['code-apogée']} onPress={() => handleSelectEtudiant(item)}>
                            <Card item={item} key={item['numéro-exam']}/>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <TextInput
                style={styles.input}
                placeholder='Titre du rapport'
                value={titre}
                onChangeText={(val) => changeHandler(val)}
            />
            <TextInput
                style={styles.multilinetext}
                placeholder='Contenu'
                multiline
            />
            <TouchableOpacity style={styles.button1}>
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
