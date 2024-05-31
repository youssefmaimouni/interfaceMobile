import React, { useState, useEffect } from 'react';
import { Button, View, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import base64 from 'base-64';
import { useEtudiants } from './navigation/dataScreen';


const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);

const GeneratePDF = ({ route }) => {
  const {listeRapport}=useEtudiants();
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
        axios.get(`http://192.168.11.104:5984/etudiantsun/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }}),
        axios.get(`http://192.168.11.104:5984/etudiantsdeux/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }}),
        axios.get(`http://192.168.11.104:5984/surveillants/_all_docs?include_docs=true`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` }})
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
      const currentDate = new Date();
      const pdfName = `pve${currentDate}.pdf`;
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
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };
  const uploadPDF = async (filePath) => {
    const file = {
      uri: filePath,
      type: 'application/pdf',
      name: 'test.pdf',
    };
  
    const formData = new FormData();
    formData.append('pdf', file);
  
    try {
      const response = await axios.post('http://your-server-url/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Generate PDF" onPress={generatePDF} />
    </View>
  );
};

export default GeneratePDF;
