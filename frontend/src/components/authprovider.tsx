import { useState, createContext, ReactNode, FC } from "react";

interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
