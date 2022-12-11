import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  setIsChecked: () => {},
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const contextValues = {
    isChecked,
    setIsChecked,
    currentUser,
    setCurrentUser
  };

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};