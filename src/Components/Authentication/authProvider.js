import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create', data);
        console.log(response.data);
        if (response.data) {
            setUser(response.data.user);
            setToken(response.data.access);
            localStorage.setItem("site", response.data.access);
            return "Data received successfully";
        } else if (response.data.message === 'username does not exist') {
            return "username does not exist";
        } else {
            return "password incorrect";
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};