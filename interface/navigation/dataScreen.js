import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants ,listeRapport ,setListeRapport , updateStudent ,updatRapport,addRapport,deleteStudent ,listeSurveillants ,listeReserviste}) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants ,listeRapport,setListeRapport,updateStudent,updatRapport,addRapport,deleteStudent,listeSurveillants,listeReserviste }}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
