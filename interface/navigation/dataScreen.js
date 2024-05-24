import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants , deleteReserviste,listeRapport ,setListeRapport , updateStudent,addSurveillants,updateRapport,addRapport ,listeSurveillants ,listeReserviste,deleteRapport}) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants,deleteReserviste ,listeRapport,setListeRapport,updateStudent,addSurveillants,updateRapport,addRapport,listeSurveillants,listeReserviste ,deleteRapport}}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
