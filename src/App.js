import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
// import Signup from './Components/Login-Register/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/login';
import Register from './Components/Register/register';
import PasswordRecovery from './Components/PasswordRecovery/passwordRecovery';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />}/> */}
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/> 
        <Route exact path="/password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;
