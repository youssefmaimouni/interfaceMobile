import React, { createContext, useState, useContext } from 'react';
import { Text } from 'react-native';

const SignatureContext = createContext(null);

export const useSignatures = () => useContext(SignatureContext);

export const SignatureProvider = ({ children }) => {
  const [signatures, setSignatures] = useState({});

  const addSignature = (name, signature) => {
    setSignatures(prevSignatures => ({
      ...prevSignatures,
      [name]: signature
    }));
    console.log('signature ajouteee');
  };

  const clearSignatures = () => {
    setSignatures({});
  };

  return (
    <SignatureContext.Provider value={{ signatures, addSignature, clearSignatures }}>
      {children}
      
    </SignatureContext.Provider>
  );
};