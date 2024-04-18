import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CreationSession from './interface/CreationSession';
import ConnectionServeur from './interface/ConnectionServeur';
import DemandeEnvoye from './interface/DemandeEnvoye';
import ErrorConnection from './interface/ErrorConnection';
import DemandeAccepter from './interface/DemandeAccepter';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CreationSession /> */}
      {/* <ConnectionServeur /> */}
      {/* <DemandeEnvoye /> */}
      {/* <ErrorConnection /> */}
      <DemandeAccepter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
