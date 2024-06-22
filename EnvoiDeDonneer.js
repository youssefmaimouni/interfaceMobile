import { Alert, Image,  StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { useEffect, useState } from "react";
import base64 from 'base-64';
import * as Device from 'expo-device';
const username = 'admin';
const password = 'admin';
const encodedCredentials = base64.encode(`${username}:${password}`);
import { useNavigation } from '@react-navigation/native';

  


const uploadPDF = async (filePath, deviceId) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  

  const file = {
    uri: filePath,
    type: 'application/pdf',
    name: `PV_${year}${month}${day}.pdf`,
  };
  
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('device_id', deviceId);
  formData.append('date', `${year}-${month}-${day}`); 

  try {
    const response = await axios.post(`http://192.168.11.100:8000/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload successful:', response.data);
    Alert.alert('Upload Successful', 'PDF has been uploaded successfully.');
  } catch (error) {
    console.error('Upload error:', error.response ? error.response.data : 'No response data');
    Alert.alert('Upload Error', `An error occurred while uploading the PDF: ${error.message}`);
  }
};



  
const EnvoiDeDonneer=({route})=>{
  const [listlocal,setListlocal]=useState({});
  const ipAdress=route.params.ipAdress;
  const pdfPath=route.params.pdfPath;
  const [infoSessionDeux,setInfoSessionDeux]=useState([]);
  const [infoSessioUn,setInfoSessioUn]=useState([]);
  const [rapport,setListeRapport]=useState([]);
  const [etudiantsUn,setListeEtudiantsUn]=useState([]);
  const [etudiantsDeux,setListeEtudiantsDeux]=useState([]);
  const [listeSurveillants,setListeSurveillants]=useState([]);
  const [reserviste,setReserviste]=useState([]);
  const [deviceId, setDeviceId] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const fetchDeviceId = () => {
      setDeviceId(Device.osBuildId);
    };
    fetchDeviceId();
  }, []);
  
    const fetchRapports = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:5984/rapport/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
        
       
        const rapports = response.data.rows.map(row=>row.doc);
        console.log('+++++++++++++');
       setListeRapport(rapports);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    const sessionUn=async ()=>{
      try {
        let response = await axios.get(`http://${ipAdress}:5984/local/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
        const local = response.data.rows.map(row=>row.doc);
        console.log(local);
        response = await axios.get(`http://${ipAdress}:5984/sessionun/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
        
        // Extracting documents from the response
        const session = response.data.rows.map(row=>row.doc);
        console.log(session);
        
       setInfoSessioUn({...local[0],...session[0]});
       console.log(infoSessioUn)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
    const sessionDeux=async ()=>{
      try {
        let response = await axios.get(`http://${ipAdress}:5984/local/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
        const local = response.data.rows.map(row=>row.doc);
        console.log(local);
        response = await axios.get(`http://${ipAdress}:5984/sessiondeux/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
        });
        
        // Extracting documents from the response
        const session = response.data.rows.map(row=>row.doc);
        console.log(session);
        
       setInfoSessionDeux({...local[0],...session[0]});
       console.log(infoSessionDeux)
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
    const fetchStudentsUn = async () => {
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
          
          setListeEtudiantsUn(students);
          } catch (error) {
            console.error('Error fetching documents:', error);
            }
            };
    const fetchStudentsDeux = async () => {
      try {
        const response = await axios.get(`http://${ipAdress}:5984/etudiantsdeux/_all_docs?include_docs=true`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
          }
          });
          
          // Extracting documents from the response
          const students = response.data.rows.map(row=>row.doc);
          console.log('---------------------');
          
          setListeEtudiantsDeux(students);
          } catch (error) {
            console.error('Error fetching documents:', error);
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
            const fetchLocal = async () => {
              try {
               console.log('fetch fetch');
                const response = await axios.get(`http://${ipAdress}:5984/local/_all_docs?include_docs=true`, {
               headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`
          } });
           const local = response.data.rows.map(row => row.doc);
            setListlocal(local);
            console.log('Local data fetched:', local);
          } catch (error) {
          console.error('Error fetching local documents:', error);
  }
};
const fetchReserviste = async () => {
  try {
   console.log('fetch fetch');
    const response = await axios.get(`http://${ipAdress}:5984/reserviste/_all_docs?include_docs=true`, {
   headers: {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${encodedCredentials}`
} });
const reserviste = response.data.rows.map(row => row.doc);
setReserviste(reserviste);
console.log('reserviste data fetched:', reserviste);
} catch (error) {
console.error('Error fetching reserviste documents:', error);
}
};
     
            useEffect(()=>{
              fetchStudentsUn();
              fetchStudentsDeux();
              fetchSurveillants();
              sessionDeux();
              sessionUn();
              fetchRapports();
              fetchLocal();
              fetchReserviste();
            },[])
    const associer = async () => {
      try {
        const rapports = rapport.map(row=>({
          "titre_rapport":row.titre_rapport,
          "contenu":row.contenu,
          "id_pv":infoSessioUn.id_pv,
          "codeApogee":row.etudiant.codeApogee
          }));
        console.log(rapports);
        const passersUn = etudiantsUn.map(row=>({
           "id_examen": infoSessioUn.id_examen,
            "id_local": infoSessioUn.id_local,
            "codeApogee": row.codeApogee,
            "isPresent": row.estPerson ? row.estPerson:false,
            "num_exam":  row.num_exam,
        }));
        const passersDeux = etudiantsDeux.map(row=>({
          "id_examen": infoSessionDeux.id_examen,
           "id_local": infoSessionDeux.id_local,
           "codeApogee": row.codeApogee,
           "isPresent": row.estPerson ? row.estPerson:false,
           "num_exam":  row.num_exam,
       }));
        const signers = listeSurveillants.map(row=>({
          "id_surveillant": row.id_surveillant,
          "id_pv": infoSessioUn.id_pv,
          "signer": row.sign ?  row.sign:false
       }));
        const pv={
            "rapports":rapports,
            "passers":[...passersUn,...passersDeux],
            "signers":signers
        };
        console.log(pv)
              const response = await axios.post(`http://${ipAdress}:8000/api/tablette/setPV`, pv, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                  });
           
               
                
     



const deletelocal = async () => {
  const url = `http://${ipAdress}:5984/local`;
  try {
      await Promise.all(listlocal.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document loc deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting local documents:', error);
  }
};
const deletestudentsun = async () => {
  const url = `http://${ipAdress}:5984/etudiantsun`;
  try {
      await Promise.all(etudiantsUn.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document etu un deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting etu documents:', error);
  }
};
const deleteetudiantsdeux = async () => {
  const url = `http://${ipAdress}:5984/etudiantsdeux`;
  try {
      await Promise.all(etudiantsDeux.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document etu deux deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting etu documents:', error);
  }
};

const deleterapport = async () => {
  const url = `http://${ipAdress}:5984/rapport`;
  try {
      await Promise.all(rapport.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document rapport deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting rapport documents:', error);
  }
}; 
const deletesurveillants = async () => {
  const url = `http://${ipAdress}:5984/surveillants`;
  try {
      await Promise.all(listeSurveillants.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document surveillants deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting surveillants documents:', error);
  }
}; 
const deleteinfoSessioUn = async () => {
  const url = `http://${ipAdress}:5984/sessionun`;
  try {
    const response = await axios.delete(`${url}/${infoSessioUn._id}?rev=${infoSessioUn._rev}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    console.log('Document session un deleted:', response.data);
  } catch (error) {
    console.error('Error deleting session un document:', error);
  }
};

const deleteinfoSessionDeux = async () => {
  const url = `http://${ipAdress}:5984/sessiondeux`;
  try {
    const response = await axios.delete(`${url}/${infoSessionDeux._id}?rev=${infoSessionDeux._rev}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      }
    });
    console.log('Document session deux deleted:', response.data);
  } catch (error) {
    console.error('Error deleting session deux document:', error);
  }
};
const deleteReserviste = async () => {
  const url = `http://${ipAdress}:5984/reserviste`;
  try {
      await Promise.all(reserviste.map(async (item) => {
          const response = await axios.delete(`${url}/${item._id}?rev=${item._rev}`, {  
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${encodedCredentials}`
              }
          });
          console.log('Document Reserviste deleted:', response.data);
      }));
  } catch (error) {
      console.error('Error deleting Reserviste documents:', error);
  }
}; 

              console.log(response.data);
             uploadPDF(pdfPath,deviceId);
            
             deletelocal();
             deletestudentsun();
             deleteetudiantsdeux();
             deleterapport();
             deletesurveillants();
             deleteinfoSessioUn();
             deleteinfoSessionDeux();
             deleteReserviste();
             navigation.navigate("Initial");
             } catch (error) {
              console.error(error);
            }
          }
          
          

          const image = require('./interface/demande.jpg');
    return(
        <View  style={styles.container}>
        <StatusBar />
            <Image source={image} style={styles.image}/>
            <TouchableOpacity style={styles.button} onPress={associer}>
                <Text style={styles.buttonText}>Envoyer le PV</Text>
            </TouchableOpacity>
            
        </View>
    );
}
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

export default EnvoiDeDonneer;