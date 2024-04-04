<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import PasswordRecovery from "./Components/PasswordRecovery/passwordRecovery";
import UserInfo from "./Components/User Info/UserInfo";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import CreateEvent from './Components/CreateEvent/createEvents';
import "jalaali-react-date-picker/lib/styles/index.css";
import AuthProvider from "./Components/Authentication/authProvider";
import PrivateRoute from "./Components/Authentication/privateRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/password-recovery" element={<PasswordRecovery />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/create-event" element={<CreateEvent />}/>
            <Route exact path="/user-info" element={<UserInfo />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import PasswordRecovery from './Components/PasswordRecovery/passwordRecovery';
import Navbar from './Components/Navbar/navbar';
import ProfileSidebar from './Components/Profile/ProfileSidebar/profileSidebar';
import MyEvents from './Components/Profile/MyEvents/myEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/> 
        <Route exact path="/password-recovery" element={<PasswordRecovery />} />
        <Route exact path="/profile" element={<> 
                                                <Navbar/> 
                                                <ProfileSidebar />
                                                <MyEvents />
                                                </> }/>
      </Routes>
>>>>>>> remotes/origin/feat/profileSidebar
    </Router>
  );
}

export default App;
