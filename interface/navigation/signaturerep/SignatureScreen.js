import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

import Signature from 'react-native-signature-canvas';

const Head = () => (
    <View style={styles.headContainer}>
      <Image source={require('../logofsac.jpeg')} style={styles.logo} />
      <Text style={styles.year}>Année universitaire ____-____</Text>
    </View>
  );

const SignatureScreen = () => {
    const [signature, setSignature] = useState(null);
    const signatureRef = useRef();

   
    const handleConfirm = (signatureBase64) => {
        alert('Signature received');
        setSignature(signatureBase64);
        console.log('Signature saved:', signatureBase64);
    };

    
    const handleClear = () => {
        signatureRef.current.clearSignature();
        setSignature(null);
    };

    const handleSave = () => {
        console.log('Current signature state:', signature);
        if (signature) {
          console.log('Signature confirmed:', signature);
          Alert.alert('Confirmation', 'Signature confirmed and saved!');
        } else {
          Alert.alert('Error', 'Please sign before saving.');
        }
      };
    const style = `.m-signature-pad--footer { display: none; margin: 0px; }`;

    return (
        <SafeAreaView style={styles.container}>
            <Head/>
            <Text style={styles.title}>Signature Example</Text>
            <Signature
                ref={signatureRef}
                onOK={handleConfirm}
                webStyle={style}
                descriptionText="Sign here"
                clearText="Clear"
                confirmText="Save"
                autoClear={true}
                imageType="image/png"
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={handleClear}><Text style={styles.textbuton}>clear</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}><Text style={styles.textbuton}>comfirmer</Text></TouchableOpacity>
            </View>
            {signature && (
                <View style={styles.preview}>
                    <Text style={styles.previewText}>Preview:</Text>
                    <Image
                        style={styles.signatureImage}
                        source={{ uri: signature }}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        marginTop:5,
        alignItems: 'center',
        justifyContent: 'center'
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
        fontSize:13,
        marginLeft:110,
        marginTop:20,
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop:30,
    },
    buttons: {
        flex:1,
        flexDirection: 'row',
        },
    button: {
        flex:1,
        backgroundColor: '#01579b', 
        padding: 5,
        borderRadius: 5,
        marginRight:120, 
        marginBottom:175, 
        
    },
    textbuton:{
        alignContent:'center'
    },
    preview: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%'
    },
    previewText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    signatureImage: {
        width: 300,
        height: 150,
        borderColor: '#000',
        borderWidth: 1
    }
});

export default SignatureScreen;
