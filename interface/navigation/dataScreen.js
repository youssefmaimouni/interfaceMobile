import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants ,listeRapport ,setListeRapport , updateStudent ,updateRapport,addRapport,deleteStudent ,listeSurveillants ,listeReserviste,deleteRapport}) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants ,listeRapport,setListeRapport,updateStudent,updateRapport,addRapport,deleteStudent,listeSurveillants,listeReserviste ,deleteRapport}}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
