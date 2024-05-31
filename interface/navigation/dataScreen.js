import React, { createContext, useState, useContext } from 'react';
import { Text } from 'react-native';
import {SignatureProvider } from './signaturerep/signaturecontexr';


const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants , deleteReserviste,listeRapport ,setListeRapport , updateStudent,addSurveillants,updateRapport,addRapport ,listeSurveillants ,listeReserviste,updateSurveillant,deleteRapport}) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants,deleteReserviste ,listeRapport,setListeRapport,updateStudent,addSurveillants,updateRapport,addRapport,listeSurveillants,listeReserviste,updateSurveillant ,deleteRapport}}>
           
            {children}
            
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
