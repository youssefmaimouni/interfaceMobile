import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import listeEtudiants from  '../donnee/listeEtudiants.json'

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
  const recherchEtuadiant = (data)=>{
    return listeEtudiants.some(element => isEqual(element, data));
  }

  const handleBarCodeScanned = ({  data }) => {
    setScanned(true);
    try {
        if (recherchEtuadiant(JSON.parse(data) )) {
        alert("Etudiant trouvé"+ data);
    }else{
        alert("Etudiant non trouvé");
    }
    } catch (error) {
        alert('qr non valide')
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
      <Text style={styles.maintext}>Scanner le QR code</Text>
      <View style={styles.barcodebox}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={StyleSheet.absoluteFillObject}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barcodebox: {
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: 30,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: 'black',
    marginTop:-10
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },button: {
    backgroundColor:'#5600D3',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight:'bold'
},
});
