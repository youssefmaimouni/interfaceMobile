// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const COUCHDB_URL = 'http://127.0.0.1:5984/pfe-mobile';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch all documents
    axios.get(`${COUCHDB_URL}/_all_docs?include_docs=true`)
      .then(response => {
        setData(response.data.rows.map(row => row.doc));
      })
      .catch(err => console.error(err));
  }, []);

  const addDocument = () => {
    const doc = {
      _id: new Date().toISOString(),
      name: 'New Document',
    };

    axios.put(`${COUCHDB_URL}/${doc._id}`, doc)
      .then(() => axios.get(`${COUCHDB_URL}/_all_docs?include_docs=true`))
      .then(response => setData(response.data.rows.map(row => row.doc)))
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CouchDB with React Native</Text>
      {data.map(doc => (
        <Text key={doc._id} style={styles.docText}>{doc.name}</Text>
      ))}
      <Button title="Add Document" onPress={addDocument} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  docText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default App;