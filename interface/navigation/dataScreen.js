import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants ,listeRapport ,setListeRapport }) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants ,listeRapport,setListeRapport }}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
