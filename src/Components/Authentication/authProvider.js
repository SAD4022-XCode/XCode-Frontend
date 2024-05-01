import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
        const response = await axios.post('https://eventify.liara.run/auth/jwt/create', data,);
        if (response.data) {
            setUser(data);
            localStorage.setItem("userData",JSON.stringify(data));
            setToken(response.data.access);
            localStorage.setItem("token", response.data.access);
            return "Data received successfully";
        } else if (response.data.message === 'username does not exist') {
            return "username does not exist";
        } else {
            return "password incorrect";
        }
    } catch (error) {
        console.log("An error occurred:",error)
        return false;
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userData");
    setToken("");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ token, user,loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};