import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import PasswordRecovery from "./Components/PasswordRecovery/passwordRecovery";
import UserInfo from "./Components/User Info/UserInfo";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import CreateEvent from './Components/CreateEvent/createEvents';
// import "jalaali-react-date-picker/lib/styles/index.css";
import ProfileSidebar from "./Components/Profile/ProfileSidebar/profileSidebar";
import MyEvents from "./Components/Profile/MyEvents/myEvents";
import AuthProvider from "./Components/Authentication/authProvider";
import PrivateRoute from "./Components/Authentication/privateRoute";
import Navbar from "./Components/Navbar/navbar";
import MapComponent from "./Components/MapComponent/MapComponent";
import EventDetails from "./Components/EventDetails/eventdetails";
import RegisterEvent from "./Components/RegisterEvent/registerEvent";
import Landing from "./Components/Landing/Landing";
import NotificationPanel from "./Components/NotificationPanel/NotificationPanel";
import RegisteredEvents from "./Components/RegisteredEvents/RegisteredEvents";
import ChatBox from "./Components/ChatBox/chatbox";
import MainChat from "./Components/Chat/MainChat";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/password-recovery" element={<PasswordRecovery />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/create-event" element={<CreateEvent />}/>
            <Route exact path="/user-info" element={<UserInfo />} />
            <Route exact path="/created-events" element={<MyEvents />}/>
            <Route exact path="/registered-events" element={<RegisteredEvents />} />
            <Route path="chat" element={<MainChat />} />
            <Route exact path="/register-event/:id" element={<RegisterEvent />}/>
          </Route>
          <Route exact path="/map" element={<MapComponent />} />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="notifications" element={<NotificationPanel />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;