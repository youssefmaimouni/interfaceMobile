import React, { createContext, useState, useContext } from 'react';

const EtudiantsContext = createContext();

export const EtudiantsProvider = ({ children,listeEtudiants,setListeEtudiants }) => {
 

    return (
        <EtudiantsContext.Provider value={{ listeEtudiants, setListeEtudiants }}>
            {children}
        </EtudiantsContext.Provider>
    );
};

export const useEtudiants = () => useContext(EtudiantsContext);
