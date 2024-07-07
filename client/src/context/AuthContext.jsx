import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  //! Here we are taking the local storage from browser to utilize the data and send it everywhere in the program
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//? In React, createContext is a function that is used to create a Context object. Context provides a way to share values between components without having to explicitly pass props through every level of the tree. This is particularly useful for global data such as the current authenticated user, theme, or preferred language.
//TODO Need to wrap app.js or root file with AuthcontextProvider to use it globally => AuthContext
