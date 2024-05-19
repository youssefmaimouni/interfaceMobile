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
        "docs": [
            {
              "id_surveillant": "1",
              "id_departement": "101",
              "nom_complet": "Jean Dupont"
            },
            {
              "id_surveillant": "2",
              "id_departement": "102",
              "nom_complet": "Marie Curie"
            },
            {
              "id_surveillant": "3",
              "id_departement": "103",
              "nom_complet": "Émile Durkheim"
            },
            {
              "id_surveillant": "4",
              "id_departement": "104",
              "nom_complet": "Claude Monet"
            },
            {
              "id_surveillant": "5",
              "id_departement": "105",
              "nom_complet": "Simone de Beauvoir"
            }
          ]      
      }
      ;

    try {
      const response = await axios.post('http://192.168.11.102:5984/reserviste/_bulk_docs', data, {
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
