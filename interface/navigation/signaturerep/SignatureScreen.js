import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ImageBackground } from 'react-native';
import Signature from 'react-native-signature-canvas';

const Head = () => (
  <View style={styles.headContainer}>
    <Image source={require('../logofsac.jpeg')} style={styles.logo} />
    <Text style={styles.year}>Année universitaire ____-____</Text>
  </View>
);

const SignatureScreen = ({navigation}) => {
  const [signature, setSignature] = useState(null);
  const signatureRef = useRef();

  const handleOK = (signatureBase64) => {
    setSignature(signatureBase64);
    Alert.alert('Success', 'Signature captured successfully!');
    navigation.navigate('Signature');
    
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
  };

  const handleSave = () => {
    signatureRef.current.readSignature();
  };

  const style = `.m-signature-pad--footer { display: none; margin: 0px; }`;
  const image = require('./backsign.png');
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <Head />
      
      <Text style={styles.title}>Signer ici</Text>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        webStyle={style}
        descriptionText="Sign here"
        autoClear={true}
        imageType="image/png"
      />
      
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={handleClear}>
         <Text style={styles.textButton}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.textButton}>Save</Text>
      </TouchableOpacity>
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  con:{
    
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
    marginLeft: 110,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 30,
  },
 
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    flex:1,
  },
  button: {
    backgroundColor: '#01579b',
    padding: 10,
    borderRadius: 5,
    height:38,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preview: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureImage: {
    width: 300,
    height: 150,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default SignatureScreen;
