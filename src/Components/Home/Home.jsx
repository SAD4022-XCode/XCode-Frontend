import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
import {useNavigate} from 'react-router-dom';
import UpcomingEvents from "./UpcomingEvents/upcomingEvents";
import Events from "../Events List/Events";
import './Home.css'
const Home = () => {
    const navigator=useNavigate();
   
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        //changing title of html pages dynamically
        document.title = "ایونتیفای";
      }, []);
    return (
        <center>
            <Navbar />
            <div className="home-page">
                <UpcomingEvents/>
                <Events />
            </div>            
        </center>
    )

//   useEffect(() => {
//     //changing title of html pages dynamically
//     document.title = "ایونتیفای";
//   }, []);
//   return (
//     <center>
//       <Navbar />
//       <div className="home-page">
//         <h1 style={{ paddingTop: "250px" }}>Home Page</h1>
//         <Events />
//       </div>
//     </center>
//   );
};
export default Home;
