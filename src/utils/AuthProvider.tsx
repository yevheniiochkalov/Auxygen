import { createContext } from "react";

interface AuthContextProps {
  user: string;
  setUser: (user: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);
