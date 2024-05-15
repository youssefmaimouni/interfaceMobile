import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, SafeAreaView } from 'react-native';
import Signature from 'react-native-signature-canvas';

const SignatureScreen = () => {
    const [signature, setSignature] = useState(null);
    const signatureRef = useRef();

    // Fonction appelée lorsque l'utilisateur confirme la signature
    const handleConfirm = (signatureBase64) => {
        setSignature(signatureBase64);
        console.log('Signature saved:', signatureBase64);
    };

    // Fonction pour nettoyer la zone de signature
    const handleClear = () => {
        signatureRef.current.clearSignature();
        setSignature(null);
    };

    // Style CSS pour le canvas de signature
    const style = `.m-signature-pad--footer { display: none; margin: 0px; }`;

    return (
        <SafeAreaView style={styles.container}>
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
                <Button title="Clear" onPress={handleClear} />
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
        flex: 1,
        padding: 10,
        marginTop:200,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 15
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
