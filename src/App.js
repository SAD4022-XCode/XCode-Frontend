import './App.css';
import Signup from './Components/Signup';
import LoginButton from "./Components/Login-Register/google";
import { useEffect } from 'react';
import {gapi} from 'gapi-script';

const clientID = "191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:clientID,
        scope: ""
      })
    };
    gapi.load('client:auth2',start);
  });

  return (
    <div className="App">
      <LoginButton />
      <Signup />
    </div>
  );
}

export default App;
