import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignatureStack,RapportStack ,AcceuilStack,ScannerStack} from './navigation';
import EtudiantStack from './navigation/EtudiantStack';
import {Entypo , MaterialCommunityIcons,FontAwesome5 ,FontAwesome ,Fontisto} from '@expo/vector-icons';
import { View,Text, StyleSheet, TouchableOpacity,  StatusBar } from 'react-native';
import {  useIsFocused,useNavigation } from '@react-navigation/native';
import React, {  useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EtudiantsProvider } from './navigation/dataScreen';
import axios from 'axios';
import base64 from 'base-64';
import { Keyboard } from 'react-native';
import { SignatureProvider } from './navigation/signaturerep/signaturecontexr';

const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);



const Tab = createBottomTabNavigator();
const seance='seance1';






export default function Seance1({route}) {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchSurveillants();
      fetchRapports();
      fetchReserviste();
    }
  }, [isFocused]);
  const navigation=useNavigation();
  const [listeEtudiants,setListeEtudiants]=useState([]);
  const [listeSurveillants,setListeSurveillants]=useState([]);
  const [listeRapport,setListeRapport]=useState([]);
  const [listeReserviste,setListeReserviste]=useState([]);
  const ipAdress = route.params.ipAdress;
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://${ipAdress}:5984/etudiantsun/_all_docs?include_docs=true`, {
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
  const updateRapport = async (docId, updatedFields) => {
    try {
      // Fetching the student by code-apogée
      const fetchUrl = `http://${ipAdress}:5984/rapport/${docId}`;
      let response = await axios.get(fetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      const rapport = response.data;

      
      Object.assign(rapport, updatedFields);

      // Saving the updated student
      const saveUrl = `http://${ipAdress}:5984/rapport/${rapport._id}`;
      response = await axios.put(saveUrl, rapport, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });

      console.log('rapport updated successfully:', response.data);
      
      await fetchRapports();
    } catch (error) {
      console.error('Error updating rapport:', error);
    }
};
  const fetchRapports = async () => {
    try {
      const response = await axios.get(`http://${ipAdress}:5984/rapport/_all_docs?include_docs=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      
      // Extracting documents from the response
      const rapports = response.data.rows.map(row=>row.doc);
      console.log('+++++++++++++');
      
     setListeRapport(rapports);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  const updateStudent = async (docId, updatedFields) => {
    try {
      // Fetching the student by code-apogée
      const fetchUrl = `http://${ipAdress}:5984/etudiantsun/${docId}`;
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
      const saveUrl = `http://${ipAdress}:5984/etudiantsun/${student._id}`;
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
const addRapport = async (rapport) => {
  const url = `http://${ipAdress}:5984/rapport`; // Your CouchDB URL

  try {
    const response = await axios.post(url, rapport, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    await fetchRapports();
    console.log('Document added:', response.data);
  } catch (error) {
    console.error('Error posting document:', error);
  }
};
const deleteRapport = async (docId, docRev) => {
  const url = `http://${ipAdress}:5984/rapport/${docId}?rev=${docRev}`; // Your CouchDB URL with the document ID and revision

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    await fetchRapports();
    console.log('Document deleted:', response.data);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

const addSurveillants = async (surveillant) => {
  const url = `http://${ipAdress}:5984/surveillants`; // Your CouchDB URL

  try {
    const response = await axios.post(url, surveillant, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    await fetchSurveillants();
    console.log('Document added:', response.data);
  } catch (error) {
    console.error('Error posting document:', error);
  }
};
const updateSurveillant = async (docId, updatedFields) => {
  try {
    
    const fetchUrl = `http://${ipAdress}:5984/surveillants/${docId}`;
    let response = await axios.get(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });

    const surveillant = response.data;

    
    const updatedSurveillant = {
      ...surveillant,
      ...updatedFields
    };

    // Saving the updated surveillant
    const saveUrl = `http://${ipAdress}:5984/surveillants/${surveillant._id}`;
    response = await axios.put(saveUrl, updatedSurveillant, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });

    console.log('rapport updated successfully:', response.data);
    
    await fetchSurveillants();
  } catch (error) {
    console.error('Error updating surveillant:', error);
  }
};
const fetchSurveillants = async () => {
  try {
    const response = await axios.get(`http://${ipAdress}:5984/surveillants/_all_docs?include_docs=true`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    
    // Extracting documents from the response
    const surveillants = response.data.rows.map(row=>row.doc);
    console.log('+++++++++++++');
    
   setListeSurveillants(surveillants);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};
const deleteReserviste = async (docId, docRev) => {
  const url = `http://${ipAdress}:5984/reserviste/${docId}?rev=${docRev}`; // Your CouchDB URL with the document ID and revision

  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    await fetchReserviste();
    console.log('Document deleted:', response.data);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
const fetchReserviste = async () => {
  try {
    const response = await axios.get(`http://${ipAdress}:5984/reserviste/_all_docs?include_docs=true`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    
    // Extracting documents from the response
    const reservistes = response.data.rows.map(row=>row.doc);
    console.log('+++++++++++++');
    
   setListeReserviste(reservistes);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};
  
  
  useEffect(() => {
    fetchStudents();
    fetchRapports();
    fetchSurveillants();
    fetchReserviste();
}, []);

const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardHeight(0);
  });

  return () => {
    showSubscription.remove();
    hideSubscription.remove();
  };
}, []);
  


  return (<View style={styles.page}>
    <StatusBar />
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttons1}
        >
          <Text style={styles.buttonTexts1}>Seance 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons2}
        >
          <Text style={styles.buttonTexts2}>Seance 2</Text>
        </TouchableOpacity>
         </View>
        <EtudiantsProvider listeReserviste={listeReserviste} listeSurveillants={listeSurveillants} addSurveillants={addSurveillants}  deleteReserviste={deleteReserviste} listeEtudiants={listeEtudiants} setListeEtudiants={setListeEtudiants} updateStudent={updateStudent} setListeRapport={setListeRapport} listeRapport={listeRapport} updateRapport={updateRapport} addRapport={addRapport} deleteRapport={deleteRapport} updateSurveillant={updateSurveillant}>
         <Tab.Navigator screenOptions={({root}) => ({
           tabBarShowLabel: false,
           headerShown: false,
           tabBarStyle: {
             position: 'absolute',
             height: 68,
             bottom: !keyboardHeight ?0 : -keyboardHeight , // Ajustez le bas en fonction de la hauteur du clavier
             right: 0,
             left: 0,
             elevation: 0,
             borderRadius: 5,
             backgroundColor: '#d1dbe4',
             borderTopWidth: 1,
             borderColor: '#a3b7ca'
       }})
     }
    initialRouteName='AcceuilStack'>
      
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
        <Tab.Screen name='Scanne' component={ScannerStack} initialParams={{seance}}
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
        <Tab.Screen name='AcceuilStack'
       component={AcceuilStack}
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
    buttons1: {
        alignSelf: 'flex-start',
        backgroundColor:'#d1dbe4',
        padding: 10,
        flex:2,
        
      },
      buttons2: {
        alignSelf: 'flex-start',
        backgroundColor:'#7593af',
        padding: 10,
        flex:2,
        borderRadius:20,
        margin:2,
        
      },
      buttonTexts1: {
        color: '#90a4ae',
        fontWeight:'bold'
    },
    buttonTexts2: {
        color: '#455a64',
        fontWeight:'bold'
      },
    container:{
        flexDirection:'row',
        backgroundColor:'#d1dbe4',
    },
    focused:{
        alignItems:"center" ,
        justifyContent:"center",
        height :64,
        width :64,
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
        color:'#a3b7ca',
    }
})