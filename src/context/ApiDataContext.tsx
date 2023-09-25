import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DataContext = createContext<null | {
  userData: any[];
  unitData: any[];
  releaseData: any[];
}>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [userData, setUserData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3005/usuarios');
        const unitsResponse = await axios.get('http://localhost:3005/unidades');
        const releasesResponse = await axios.get(
          'http://localhost:3005/lancamentos'
        );

        setUserData(usersResponse.data);
        setUnitData(unitsResponse.data);
        setReleaseData(releasesResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ userData, unitData, releaseData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);
