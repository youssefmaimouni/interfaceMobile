import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import base64 from 'base-64';
import { useEtudiants } from './navigation/dataScreen';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import { Asset } from 'expo-asset';
import { FieldPath } from 'firebase/firestore';



const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);

const GeneratePDF = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDeviceId(Device.osBuildId);
  }, []);

  
  const navigation=useNavigation();
  const ipAdress=route.params.ipAdress;
  const [listeRapport,setListeRapport]=useState([]);
  const {  surveillantSignatures } = route.params;
  console.log(surveillantSignatures);
  const [data, setData] = useState({
    etuPresun: [],
    etuAbsun: [],
    etuPresdeux: [],
    etuAbsdeux: [],
    surveillant: []
  });
  const [infoAccuil, setInfoAccuil] = useState({});
  const [infoAccuil2, setInfoAccuil2] = useState({});
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
      console.log('***********');
      
     setListeRapport(rapports);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  const fetchEtudiants = async () => {
    try {
      setLoading(true);
      const [etu1, etu2, surveillants] = await Promise.all([
        axios.get(`http://${ipAdress}:5984/etudiantsun/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }}),
        axios.get(`http://${ipAdress}:5984/etudiantsdeux/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }}),
        axios.get(`http://${ipAdress}:5984/surveillants/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }})
      ]);
      setData({
        etuPresun: etu1.data.rows.filter(row => row.doc.estPerson).map(row => row.doc),
        etuAbsun: etu1.data.rows.filter(row => !row.doc.estPerson).map(row => row.doc),
        etuPresdeux: etu2.data.rows.filter(row => row.doc.estPerson).map(row => row.doc),
        etuAbsdeux: etu2.data.rows.filter(row => !row.doc.estPerson).map(row => row.doc),
        surveillant: surveillants.data.rows.filter(row => row.doc.sign).map(row => row.doc)
      });
      setLoading(false);
      setDataLoaded(true);
      //generatePDF(); 
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEtudiants();
    fetchRapports();
  }, []);

  const fetchAccuill = async () => {
    try {
      const responseLocal = await axios.get(`http://${ipAdress}:5984/local/_all_docs?include_docs=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      const localData = responseLocal.data.rows.map(row => row.doc)[0]; // Suppose only one doc is expected
  
      const responseSession = await axios.get(`http://${ipAdress}:5984/sessionun/_all_docs?include_docs=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      const sessionData = responseSession.data.rows.map(row => row.doc)[0]; // Suppose only one doc is expected
  
      setInfoAccuil({ ...localData, ...sessionData });
    } catch (error) {
      console.error('Error fetching accueil documents:', error);
    }
  }
  
  useEffect(() => {
    console.log("InfoAccuil:", infoAccuil);
    fetchAccuill();
  }, []);
  
  const fetchAccuill2 = async () => {
    try {
      const responseLocal = await axios.get(`http://${ipAdress}:5984/local/_all_docs?include_docs=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      const localData = responseLocal.data.rows.map(row => row.doc)[0]; // Suppose only one doc is expected
  
      const responseSession = await axios.get(`http://${ipAdress}:5984/sessiondeux/_all_docs?include_docs=true`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        }
      });
      const sessionData = responseSession.data.rows.map(row => row.doc)[0]; // Suppose only one doc is expected
  
      setInfoAccuil2({ ...localData, ...sessionData });
    } catch (error) {
      console.error('Error fetching accueil documents:', error);
    }
  }
  
  useEffect(() => {
    console.log("InfoAccuil2:", infoAccuil2);
    fetchAccuill2();
  }, []);
  

  



  
  const generatePDF = async () => {
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>PV</title>
          <style>
  body, html {
    margin: 0;
    padding-top: 20px;
    box-sizing: border-box;
  }

  @media print {
    @page {
      margin-top: 50px; 
      margin-bottom: 40px;
      margin-left: 25px;
      margin-right: 25px;
    }

    header {
     position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: #ffffff;
      color: black;
      text-align: center;
      padding: 0;
      z-index: 1000;
      justify-content: row;
    }

    
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #5A639C;
  }

  .page-break {
    page-break-after: always;
  }

  h1, h2 {
    text-align: center;
    margin-top: 20px;
  }
  .header {
      width: 100%;
      display: flex;
      justify-content: space-between; /* Positions items on opposite ends */
      padding: 10px 20px; /* Adds padding around the text */
      box-sizing: border-box; /* Includes padding in width calculation */
    }
    .header span {
      font-size: 16px; /* Adjust font size as needed */
    }
    .line-under-header {
      height: 2px; /* Adjust the thickness of the line */
      background-color: black; /* Line color */
      width: 100%; /* Line width */
    }
</style>

        </head>
        <body>
         <header>
         <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
       </header>
          
          <h2>Étudiants présents (Première Séance)</h2>
         
         <p>module :${infoAccuil.intitule_module}</p>
         <p>seance :${infoAccuil.seance_examen}</p>
         <p>date examen :${infoAccuil.date_examen}</p>
         <p>demi journée:${infoAccuil.demi_journee_examen}</p>
         <p>local:${infoAccuil.type_local}-${infoAccuil.num_local}</p>
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              ${data.etuPresun.map(item => `
                <tr>
                  <td>${item.num_exam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
            <div class="page-break"></div>
             <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
          <h2>Étudiants absents (Première Séance)</h2>
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              ${data.etuAbsun.map(item => `
                <tr>
                  <td>${item.num_exam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="page-break"></div>
               
         <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
       
          <h2>Étudiants présents (Deuxième Séance)</h2>
          <p>Année universitaire :${infoAccuil2.Annee_universitaire}</p>
          <p>module :${infoAccuil2.intitule_module}</p>
          <p>seance :${infoAccuil2.seance_examen}</p>
          <p>date examen :${infoAccuil2.date_examen}</p>
          <p>demi journée:${infoAccuil2.demi_journee_examen}</p>
          <p>local:${infoAccuil2.type_local}-${infoAccuil2.num_local}</p>
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              ${data.etuPresdeux.map(item => `
                <tr>
                  <td>${item.num_exam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
            <div class="page-break"></div>
          
         <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
       
          <h2>Étudiants absents (Deuxième Séance)</h2>
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Nom</th>
                <th>Prénom</th>
              </tr>
            </thead>
            <tbody>
              ${data.etuAbsdeux.map(item => `
                <tr>
                  <td>${item.num_exam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

     <div class="page-break"></div>
     
         <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
      
     <h2>Rapport</h2>
    ${listeRapport.length === 0 ? `
     <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
    <span>aucun rapport</span>
  </div>
  ` : `

  <table>
    <thead>
      <tr>
        <th>titre</th>
        <th>contenu</th>
        <th>etudiant</th>
         </tr>
        </thead>
        <tbody>
         ${listeRapport.map(item => `
          <tr>
          <td>${item.titre_rapport}</td>
          <td>${item.contenu}</td>
          <td>${item.etudiant.prenom_etudiant} ${item.etudiant.nom_etudiant}</td>
           </tr>
          `).join('')}
          </tbody>
         </table>
         `
         }
        <div class="page-break"></div>
        
          
         <div class="header">
            <span>UNIVERSITÉ HASSAN II FSAC</span>
            <span>Année universitaire: ${infoAccuil.Annee_universitaire}</span>
          </div>
          <div class="line-under-header"></div>
       

          <h2>Surveillants</h2>
          <table>
            <thead>
              <tr>
                <th>Nom complet</th>
                <th>signature</th>
              </tr>
            </thead>
            <tbody>
            ${Object.entries(surveillantSignatures).map(([name, signatureDataUrl]) => `
              <tr>
                <td>${name}</td>
                <td><img src="${signatureDataUrl}" alt="Signature de ${name}" style="height: 100px; width: 100px;" /></td>
              </tr>
            `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    try {
    
      const { uri } = await Print.printToFileAsync({ html });
      console.log('PDF generated at: ' + uri);
      
      const pdfName = `pve.pdf`;
      const pdfPath = `${FileSystem.documentDirectory}${pdfName}`;
      await FileSystem.moveAsync({
        from: uri,
        to: pdfPath,
      });

      
     
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfPath);
      } else {
        Alert.alert('PDF generated', `PDF saved to ${pdfPath}`);
      }
      
     

      navigation.navigate("EnvoiDeDonneer",{ipAdress:ipAdress,pdfPath:pdfPath});
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };

 

  const image = require('./image.png');

    return (
      <View style={styles.container}>
          <Image source={image} style={styles.image}/>
          
          <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>consulter le pv</Text>
            </TouchableOpacity>
          
       
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#4D4D69'
  },button: {
      marginTop: 100,
      padding: 10,
      width: 350,
      backgroundColor:'#238AF5',
      borderRadius: 25,
    },
    buttonText:{
      color:'#fff',
      alignSelf:'center',
      fontWeight:'bold',
      fontSize:20,
    },image:{
      height:250,
      width:'110%',
      marginBottom: 50
    }
});

export default GeneratePDF;