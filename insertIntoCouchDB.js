import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import base64 from 'base-64';

const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);

const Insert = () => {
  const [responseMessage, setResponseMessage] = useState('');

  const insertStudentData = async () => {
    const data = {
        "docs":  [
          
          {
            "codeApogee": 20001,
            "nom_etudiant": "El Kaddouri",
            "prenom_etudiant": "Jamila",
            "numeroExam": 1,
            "CNE": "200021",
            "photo": "http://www.fsac.ac.ma/photo/jamila1",
            "id_rapport": null,
            "estPerson": true
        },
        {
            "codeApogee": 20002,
            "nom_etudiant": "Ben Salah",
            "prenom_etudiant": "Khalid",
            "numeroExam": 2,
            "CNE": "200022",
            "photo": "http://www.fsac.ac.ma/photo/khalid2",
            "id_rapport": null,
            "estPerson": true
        },
        {
            "codeApogee": 20003,
            "nom_etudiant": "Ait Bouali",
            "prenom_etudiant": "Sofia",
            "numeroExam": 3,
            "CNE": "200023",
            "photo": "http://www.fsac.ac.ma/photo/sofia3",
            "id_rapport": null,
            "estPerson": true
        },
        {
            "codeApogee": 20004,
            "nom_etudiant": "El Mansouri",
            "prenom_etudiant": "Amir",
            "numeroExam": 4,
            "CNE": "200024",
            "photo": "http://www.fsac.ac.ma/photo/amir4",
            "id_rapport": null,
            "estPerson": true
        },
        {
            "codeApogee": 20005,
            "nom_etudiant": "Rahmani",
            "prenom_etudiant": "Loubna",
            "numeroExam": 5,
            "CNE": "200025",
            "photo": "http://www.fsac.ac.ma/photo/loubna5",
            "id_rapport": null,
            "estPerson": true
        }
    ]
    };

    try {
      const response = await axios.post('http://192.168.11.102:5984/etudiantsdeux/_bulk_docs', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
      });
      console.log('++++++');
      setResponseMessage('Data inserted successfully!');
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error inserting data:', error);
      setResponseMessage('Failed to insert data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Insert Students Data into CouchDB</Text>
      <Button title="Insert Data" onPress={insertStudentData} />
      {responseMessage ? <Text>{responseMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});

export default Insert;
