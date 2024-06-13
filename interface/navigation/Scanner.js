import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity,Image, ScrollView, Modal } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useEtudiants } from "./dataScreen";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('../fsacLogo-removebg-preview.png')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire ____-____</Text>
  </View>
);
export default function Scanner() {
  const { listeEtudiants, setListeEtudiants,updateStudent } = useEtudiants();
  const [modalVisible, setModalVisible] =useState(false);
  const [scannedData, setScannedData] = useState({});
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);


  const updateObject = (updatedValues) => {
    const foundItem = listeEtudiants.find(item => isEqual(updatedValues, item));
    if (foundItem) {
      console.log(foundItem);
    console.log(updatedValues);
    
    updateStudent(foundItem._id,updatedValues)
    } else {
      console.log("not found");
    }
    ;
  };
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function isEqual(obj1, obj2) {
if (obj1['codeApogee'] !== obj2['codeApogee'] || obj1['nom_etudiant'] !== obj2['nom_etudiant'] ||obj1['prenom_etudiant'] !== obj2['prenom_etudiant'] ||obj1['numeroExam'] !== obj2['numeroExam'] ||obj1['CNE'] !== obj2['CNE'] ) {
            return false;
        }
    return true;
}
  const recherchEtuadiant = (data)=>{
    return listeEtudiants.some(element => isEqual(element, data));
  }
const verificationEtudiant=()=>{  
        updateObject(scannedData);
        setModalVisible(false);
}
  

  const handleBarCodeScanned = async ({  data }) => {
    setScanned(true);
    try{
        if (recherchEtuadiant(JSON.parse(data) )) {
          data=JSON.parse(data);
          data.estPerson = true;
          setScannedData(data);
          const imagePath = `${FileSystem.documentDirectory}${data.codeApogee}.jpg`;
          await loadImage(imagePath);
          setModalVisible(true);
    }else{
        alert("Etudiant non trouvé");
    }
    } catch (error) {
        alert('qr non valide');
    }
    
  };

  if (hasPermission === null) {
    return <Text>Demande pour la permission d'accéder à la caméra</Text>; 
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container2}>
        <Image source={require('../camPermission.jpg')} style={styles.image2} />
        <Text>Pas d'accès à la caméra</Text>
        <TouchableOpacity style={styles.button2} onPress={() => Camera.requestCameraPermissionsAsync()}>
                <Text style={styles.buttonText}>Autoriser la caméra</Text>
            </TouchableOpacity>
      </View>
    );
  }
  const loadImage = async (imagePath) => {
    console.log('Loading image from filesystem...');
    try {
        const fileInfo = await FileSystem.getInfoAsync(imagePath);
        if (fileInfo.exists) {
            console.log('Image loaded from:', imagePath);
            setImageUri(imagePath + '?' + new Date().getTime()); // Adding a timestamp to the URI to avoid caching issues
        } else {
            console.log('No image found at the path');
        }
    } catch (error) {
        console.error('Failed to load image:', error);
    }
};
 
  
  return (
    <View style={styles.container}>
       <Head/>
      <View >  
      <Text style={styles.maintext}>Scanner le QR code</Text>
      <View style={styles.barcodebox}>
      {!modalVisible &&  <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
      barcodeTypes: ["qr"],
  }}
  style={StyleSheet.absoluteFillObject}
  // Pass updateObject as a prop
  updateObject={updateObject}
/> }
        
       {modalVisible && <View style={styles.card}>
       <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.cardContent}>
        <Text style={styles.name}>{scannedData.nom_etudiant && scannedData.prenom_etudiant ? `${scannedData.nom_etudiant} ${scannedData.prenom_etudiant}` : ''}</Text>
      <Text>Code Apogée: {scannedData['codeApogee'] || ''}</Text>
      <Text>CNE: {scannedData.CNE || ''}</Text>
      <Text>Numéro exam: {scannedData['numeroExam'] || ''}</Text> 
          </View>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={styles.buttonRapp}
            onPress={()=>{
              setModalVisible(false); 
              navigation.navigate('AddRapport', { etudiant: scannedData,screen:'Scanner' });
            }}
          >
            <Text style={styles.buttonText}>rapport</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonVer}
            onPress={verificationEtudiant}
          >
            <Text style={styles.buttonText}>verifier</Text>
          </TouchableOpacity>
      </View>
      </View>}
      </View>

      {(scanned && !modalVisible) && (
        <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
      >
        <Text style={styles.buttonText}>Cliquer pour scanner une autre fois</Text>
      </TouchableOpacity>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E1E7E7'
    
  },
  container2: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
    
  },
  headContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 5, 
  },
  logo: {
    height: 50,
    width: 120,
  },
  year: {
    fontSize: 13,
    marginLeft: 10, 
    marginTop: 20,
    marginLeft:120,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: 'black',
    alignSelf:'center'
    
  },
  maintext: {
    fontSize: 16,
    marginBottom:15,
    marginTop:60,
    alignSelf:'center',
    fontWeight:'bold'
  },buttonText:{
    fontSize: 16,
    alignSelf:'center',
    color :'#fff'
  },button: {
        alignSelf: 'center',
        backgroundColor:'#1b5e20',
        padding: 10,
        marginTop: 10,
        borderRadius:10
  },card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignSelf:'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop:20,
    borderRadius: 20,
  },buttonVer: {
    alignSelf: 'flex-end',
    backgroundColor:'#01579b',
    height:30,
    padding:5,
    width:100,
    margin: 18,
    borderRadius:15
},buttonRapp: {
    alignSelf: 'flex-start',
    backgroundColor:'#01579b',
    height:30,
    width:100,
    margin: 18,
    padding:5,
    borderRadius:15
},name: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
}, button2: {
  marginTop: 50,
  padding: 10,
  width: 330,
  backgroundColor:'#194a7a',
  borderRadius: 20,
},
buttonText:{
  color:'#fff',
  alignSelf:'center',
  fontWeight:'bold',
  fontSize:18,
},
  image2:{
    height:300,
    width:300,
    marginBottom: 50
  }
});