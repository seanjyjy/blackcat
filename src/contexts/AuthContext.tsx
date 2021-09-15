import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext<
  | {
      name: string;
      pw: string;
      auth: boolean;
      avatar: string;
      setName: React.Dispatch<React.SetStateAction<string>>;
      setPw: React.Dispatch<React.SetStateAction<string>>;
      setAuth: React.Dispatch<React.SetStateAction<boolean>>;
      setAvatar: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

type AuthProviderProps = { children: React.ReactNode };

function AuthProvider({ children }: AuthProviderProps) {
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [auth, setAuth] = useState(false);
  const [avatar, setAvatar] = useState("");

  const value = {
    name,
    pw,
    auth,
    setName,
    setPw,
    setAuth,
    avatar,
    setAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useContext must be used inside a provider");
  }
  return context;
}

export { useAuth, AuthProvider };
