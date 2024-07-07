import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });
  //! Here we are taking the local storage from browser to utilize the data and send it everywhere in the program
  const updateUser = (data) => {
    setCurrentUser(data);
  }; //? everytime refresh garda matra data gairako xa to avoid that

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//? In React, createContext is a function that is used to create a Context object. Context provides a way to share values between components without having to explicitly pass props through every level of the tree. This is particularly useful for global data such as the current authenticated user, theme, or preferred language.
//TODO Need to wrap app.js or root file with AuthcontextProvider to use it globally => AuthContext
