import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ActivityIndicator, Text } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import base64 from 'base-64';
import { useEtudiants } from './navigation/dataScreen';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';


const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);

const GeneratePDF = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    setDeviceId(Device.osBuildId);
    generatePDF();
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

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const fetchEtudiants = async () => {
    try {
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
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
    }
  };

  const generatePDF = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours();
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate);
    const period = hours >= 12 ? 'PM' : 'AM';
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>PV</title>
          <style>
            
            table {
              marginTop:100;
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #87CEEB; 
            }
            .page-break {
              page-break-after: always;
            }
            h1{
              text-align: center;
            }
          </style>
        </head>
        <body>
    
          <h1>Procès verbaux électronique des examens </h1>
            <p> la date :${formattedDate}</p>
            <p>demi journee:${period}</p>
          <h2>Étudiants présents (Première Séance)</h2>
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
                  <td>${item.numeroExam}</td>
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
                  <td>${item.numeroExam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="page-break"></div>

          <h2>Étudiants présents (Deuxième Séance)</h2>
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
                  <td>${item.numeroExam}</td>
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
                  <td>${item.numeroExam}</td>
                  <td>${item.nom_etudiant}</td>
                  <td>${item.prenom_etudiant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="page-break"></div>
          
          <h2>Rapport</h2>
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

          <div class="page-break"></div>

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
      uploadPDF(pdfPath,deviceId);

      navigation.navigate("EnvoiDeDonneer");
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };
  const uploadPDF = async (filePath,device_id) => {

    const file = {
      uri: filePath,
      type: 'application/pdf',
      name: `pve.pdf`,
    };

  
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('device_id', device_id);
  
    try {
      const response = await axios.post(`http://${ipAdress}:8000/api/upload`, formData, {
        headers: {
          
          'Content-Type': 'multipart/form-data',
        },
      });

    }  catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else {
        console.error(error.message);
      }
    }
  };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text>PDF generation complete!</Text>
          </View>
        )}
      </View>
    );
  
};

export default GeneratePDF;

