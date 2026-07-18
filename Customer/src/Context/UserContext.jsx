import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentItem")
    if(storedUser){
        setCurrentUser(JSON.parse(storedUser))
    }
  },[])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >{children}</UserContext.Provider>
  );
};

export default UserProvider;
