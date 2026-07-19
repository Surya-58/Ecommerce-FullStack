import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if(storedUser){
        setCurrentUser(JSON.parse(storedUser))
    }
  },[])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
      }}
    >{children}</UserContext.Provider>
  );
};

export default UserProvider;
