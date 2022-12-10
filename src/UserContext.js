import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  setIsChecked: () => {},
  setCurrentUser: () => {},
  setSelectedUsers: () => {},
});

export const UserProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);

  const contextValues = {
    isChecked,
    setIsChecked,
    currentUser,
    setCurrentUser,
    selectedUsers,
    setSelectedUsers,
  };

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};