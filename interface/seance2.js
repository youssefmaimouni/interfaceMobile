import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scanner,SignatureStack,RapportStack ,Acceuil} from './navigation';
import EtudiantStack from './navigation/EtudiantStack';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, StyleSheet, TouchableOpacity,  StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {  useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EtudiantsProvider } from './navigation/dataScreen';
import axios from 'axios';
import base64 from 'base-64';

const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);



const Tab = createBottomTabNavigator();
const seance='seance 1';






export default function Seance1() {
  const navigation=useNavigation();
  const [listeEtudiants,setListeEtudiants]=useState([]);
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://192.168.248.241:5984/etudiantsdeux/_all_docs?include_docs=true', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      
      // Extracting documents from the response
      const students = response.data.rows.map(row=>row.doc);
      console.log('---------------------');
      
     setListeEtudiants(students);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  const updateStudent = async (docId, updatedFields) => {
    try {
      // Fetching the student by code-apogée
      const fetchUrl = `http://192.168.248.241:5984/etudiantsdeux/${docId}`;
      let response = await axios.get(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      const student = response.data;

      // Updating the student fields
      Object.assign(student, updatedFields);

      // Saving the updated student
      const saveUrl = `http://192.168.248.241:5984/etudiantsdeux/${student._id}`;
      response = await axios.put(saveUrl, student, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      console.log('Student updated successfully:', response.data);
      // Fetch students to update local state after successful update
      await fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
};
  
  
  
  useEffect(() => {
    fetchStudents();
}, []);
  
  return (<View style={styles.page}>
    <StatusBar />
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttons1}
          onPress={()=>navigation.navigate("Seance1")} 
        >
          <Text style={styles.buttonTexts1}>Seance 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons2}
          onPress={()=>navigation.navigate("Seance2")}
        >
          <Text style={styles.buttonTexts2}>Seance 2</Text>
        </TouchableOpacity>
         </View>
        <EtudiantsProvider listeEtudiants={listeEtudiants} setListeEtudiants={setListeEtudiants} updateStudent={updateStudent} >
         <Tab.Navigator screenOptions={({root}) => ({
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                height:68,
                bottom:0,
                right:0,
                left:0,
                elevation:0,
                borderRadius:5,
                backgroundColor:'#209ebb',
                borderTopWidth:1,
                borderColor:'#78909c'
       }})
     }
    initialRouteName='Acceuil'>
         <Tab.Screen name='RapportStack' component={RapportStack} options={{
            tabBarIcon:({focused})=>{
                return(
                    
                    <View style={[focused ? styles.focused : styles.nonfocused]}>
                     <FontAwesome name={focused ? "file-text" : "file-text-o"} size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />               
                     {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Rapp</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Scanner' component={Scanner} initialParams={{seance}}
        options={{
            tabBarIcon:({focused})=>{
              return(

                <View style={[focused ? styles.focused : styles.nonfocused]} >
                   <MaterialCommunityIcons name="qrcode-scan" size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Scanner</Text>}
                </View>
                )
            }
        }}/>
        <Tab.Screen name='Acceuil'
       component={Acceuil}
       initialParams={{seance}}
       options={{
           tabBarIcon:({focused})=>{
             return(

               <View style={[focused ? styles.focused : styles.nonfocused]} >
                   <Ionicons name={focused ? "home": "home-outline"} size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                   {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Acceuil</Text>}
               </View>
               )
           }
       }}
        />
             <Tab.Screen name='Etudiants' 
             component={EtudiantStack}
             initialParams={{seance}}
             options={{
                  tabBarIcon:({focused})=>{
                      return(
                          
                          <View style={[focused ? styles.focused : styles.nonfocused]} >
                        <Fontisto name="persons" size={focused ? 35 : 24} style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]} />
                        {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Etudiants</Text>}
                     </View>
                     )
                 }
             }}
             />
         <Tab.Screen name='SignatureStack' component={SignatureStack} options={{
            tabBarIcon:({focused})=>{
              return(

                <View style={[focused ? styles.focused : styles.nonfocused]} >
                    
                    <FontAwesome5 name="signature" size={focused ? 35 : 24}  style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}/>
                    {!focused && <Text style={[focused ? styles.colorIconFocus : styles.colorIconNonFocus]}>Signature</Text>}
                </View>
                )
            }
        }}/>
     </Tab.Navigator> 
     </EtudiantsProvider>
    </View>
    
  );
}

const styles=StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'#fff'
    },
    buttons2: {
      alignSelf: 'flex-start',
      backgroundColor:'#b0bec5',
      padding: 10,
      flex:2
      },
      buttons1: {
        alignSelf: 'flex-start',
        backgroundColor:'#5B8BCE',
        padding: 10,
        flex:2
      },
      buttonTexts2: {
        color: '#90a4ae',
        fontWeight:'bold'
    },
    buttonTexts1: {
        color: '#455a64',
        fontWeight:'bold'
      },
    container:{
        flexDirection:'row',
    },
    focused:{
      alignItems:"center" ,
        justifyContent:"center",
        height :64,
        width :64,
        backgroundColor:'#8AABF7',
        borderRadius:40 ,
        marginBottom:3,
  },
  nonfocused:{
      alignItems:"center" ,
      justifyContent:"center",
      height :60,
      width :60,
      
  },
  colorIconFocus:{
      color:'#546e7a',

  },
  colorIconNonFocus:{
      color:'#B6DEF6',
  }
})