import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
  name: String;
  email: String;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: String, password: String) => Promise<void>;
  signup: (name: String, email: String, password: String) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const checkStatus = async () => {
     const data =  await checkAuthStatus();
     if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
    };
    checkStatus();
  }, []);

  const login = async (email: String, password: String) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: String, email: String, password: String) => {};
  const logout = async () => {};

  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
