import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
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
  const {listeRapport,ipAdress }=useEtudiants();
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
    padding-top: 50px;
    box-sizing: border-box;
  }

  @media print {
    @page {
      margin-top: 100px; 
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

    body {
      padding-top: 120px; 
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
</style>

        </head>
        <body>
         <header>
         <p>Année universitaire :${infoAccuil.Annee_universitaire}</p>
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
        <div class="page-break"></div>`
      }
        


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

 

 

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
           <TouchableOpacity onPress={generatePDF}><Text>consulter le pv</Text></TouchableOpacity>
          </View>
       
      </View>
    );
  
};

export default GeneratePDF;