import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Signup from './Components/Login-Register/Signup';
import Home from './Components/Home/Home';


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
