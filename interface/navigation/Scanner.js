import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity,Image, ScrollView } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { StatusBar } from "expo-status-bar";
const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('./logofsac.jpeg')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire ____-____</Text>
  </View>
);
export default function Scanner({route}) {
  const {listeEtudiants,setListeEtudiants}=route.params;

  const updateObject = (updatedValues) => {
    const updatedArray = listeEtudiants.map((item) => {
      if (isEqual(updatedValues, item)) {
        return { ...item, ...updatedValues };
      }
      return item;
    });

    // Update state using the setter prop (triggers re-render)
    setListeEtudiants(updatedArray);
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
if (obj1['code-apogée'] !== obj2['code-apogée'] || obj1['nom'] !== obj2['nom'] ||obj1['prénom'] !== obj2['prénom'] ||obj1['numéro-exam'] !== obj2['numéro-exam'] ||obj1['CNE'] !== obj2['CNE'] ) {
            return false;
        }
    return true;
}
  const recherchEtuadiant = (data)=>{
    return listeEtudiants.some(element => isEqual(element, data));
  }
  

  const handleBarCodeScanned = ({  data },updateObject) => {
    setScanned(true);
    try{
        if (recherchEtuadiant(JSON.parse(data) )) {
          data=JSON.parse(data);
          data.estPerson = true;
          updateObject(data);
          alert("Etudiant trouvé"+JSON.stringify(data));
    }else{
        alert("Etudiant non trouvé");
    }
    } catch (error) {
        alert('qr non valide' + error);
    }
    
  };

  if (hasPermission === null) {
    return <Text>Demande pour la permission d'accéder à la caméra</Text>; 
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Pas d'accès à la caméra</Text>
        <Button title={'Autoriser la caméra'} onPress={() => Camera.requestCameraPermissionsAsync()} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
       <Head/>
      <View >

      
     
      <Text style={styles.maintext}>Scanner le QR code</Text>
      <View style={styles.barcodebox}>
      <CameraView
  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
  barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }}
  style={StyleSheet.absoluteFillObject}
  // Pass updateObject as a prop
  updateObject={updateObject}
/>
      </View>

      {scanned && (
        <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
      >
        <Text style={styles.buttonText}>Cliquer pour scanner une autre fois</Text>
      </TouchableOpacity>
      )}
    </View>
    <ScrollView style={{alignSelf:'center'}}>
              {
                listeEtudiants.map((item)=>(
                  <Text>{JSON.stringify(item.estPerson)}</Text>
                ))
              }
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    
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
    marginBottom:10,
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
  },
});