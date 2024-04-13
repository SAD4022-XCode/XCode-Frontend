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
                                                {/* <Navbar/>  */}
                                                {/* <ProfileSidebar /> */}
                                                <MyEvents />
                                                </> }/>
      </Routes>
    </Router>
  );
}

export default App;
