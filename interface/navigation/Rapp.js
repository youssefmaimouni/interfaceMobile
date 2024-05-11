import React from 'react';
import { View,Text ,SafeAreaView,StyleSheet, Button, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import rapportList from './data.json';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function Rapp() {
    return (
      
        <View style={styles.scrollView}>
          <FlatList
            data={rapportList}
            renderItem={({ item }) => {
              return (
                <View style={styles.card} key={item.id}>
                  <Text style={styles.cardText}>{item.titre}</Text>
                  <View style={styles.con}>
                  <Text style={styles.cardText}>{item.nom}</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Supprimer</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
        
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      paddingHorizontal: 16,
      marginBottom:100,
    },
    card: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      margin:10,
    },
    con:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardText: {
        flex: 1,
    marginRight: 16,
      fontSize: 13,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: 'blue', // Change to your desired button color
      padding: 10,
      borderRadius: 5,
      marginTop: 14,
      marginLeft:5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });