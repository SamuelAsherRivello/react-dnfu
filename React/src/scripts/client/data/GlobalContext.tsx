import React, { createContext, useContext, ReactNode } from 'react';

// Define the context
const GlobalContext = createContext<string | undefined>(undefined);

// Define the props for the GlobalProvider
interface GlobalProviderProps {
  websiteName: string;
  children: ReactNode;
}

// Create a provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ websiteName, children }) => {
  return (
    <GlobalContext.Provider value={websiteName}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useWebsite = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a GlobalProvider');
  }
  return context;
};