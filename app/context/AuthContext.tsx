"use client";
import React, { createContext, useState } from "react";

interface AuthContextProps {
  setToken: (value: string) => void;
  token: string;
  userId: string;
  setUserId: (value: string) => void;
}
export const AuthContext = createContext({} as AuthContextProps);

export type Auth = {
  token: string;
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
