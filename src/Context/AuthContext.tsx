import React, { createContext, ReactNode, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";


type user = {
  name: string;
  email: string;
};

type userAuth = {
  isLoggedIn: boolean;
  user: user | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const authContext = createContext<userAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if user cookies are available then skip login
    async function checkStatus(){
      const data =await checkAuthStatus();
      if (data){
        setUser({email:data.email , name:data.name  });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // call backend to login
    const data = await loginUser(email, password);

    // if success then set user and isLoggedIn
    if (data){
      console.log(data);
      
      setUser({email:data.email , name:data.name  });
      setIsLoggedIn(true);
    }
    // else throw error
  };

  const signup = async (name: string, email: string, password: string) => {
    // call backend to signup
    // if success then set user and isLoggedIn
    // else throw error
  };

  const logout = async () => {
    // call backend to logout
    // clear user and isLoggedIn    
    // else throw error
  };

 

  

  return <authContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
      }}
      >
      {children}
    </authContext.Provider>
  
};