import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // AI Survey State
  const [aiData, setAiData] = useState({
    userType: '', // '초등 생존수영' | '노트북 사용자' | '스포츠 장비 사용자' | '노트북+스포츠 장비'
    aiRecommendation: '',
    feedback: '',
    showComplete: false // added for scrolling navigation
  });

  const value = {
    aiData,
    setAiData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
