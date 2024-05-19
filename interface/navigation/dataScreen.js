import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants ,listeRapport ,setListeRapport , updateStudent }) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants ,listeRapport,setListeRapport,updateStudent }}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
