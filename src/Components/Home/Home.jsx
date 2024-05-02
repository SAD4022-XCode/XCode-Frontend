import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
import {useNavigate} from 'react-router-dom';
import UpcomingEvents from "./UpcomingEvents/upcomingEvents";
import Events from "../Events List/Events";
import './Home.css'
import Wallet from "../Wallet/wallet";
import { useAuth } from "../Authentication/authProvider";
import axios from "axios";

const Home = () => {
    const auth = useAuth();

    const navigator=useNavigate();
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        //changing title of html pages dynamically
        document.title = "ایونتیفای";
      }, []);
    const printUserDate =async()=>{
        console.log("my token:",auth.token);
        try{
        //    const response2 = await axios.get('http://eventify.liara.run/account/me/',{headers: {
        //     "Content-Type": "application/json",
        //     accept: "application/json",
        //     Authorization:`JWT ${auth.token}`,
        // }});
        const respone= await fetch('http://eventify.liara.run/account/me/',{ 
            method :"GET",
            headers :{'Content-Type':'application/json','Authorization': `JWT ${auth.token}`}
        })
        console.log("my token2:",auth.token); 
        }catch(error){
            console.log("account me errors:",error);
        }
        
    }
    return (
        <center>
            <Navbar />
            <div className="home-page">
                <button onClick={printUserDate}>
                    نمایش اطلاعات کاربر
                </button>
                <UpcomingEvents/>
                <Events />
            </div>            
        </center>
    )

};
export default Home;
