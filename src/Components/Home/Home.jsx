import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
import {useNavigate} from 'react-router-dom';
import UpcomingEvents from "./UpcomingEvents/upcomingEvents";
import Events from "../Events List/Events";
import './Home.css'
import Wallet from "../Wallet/wallet";
const Home = () => {
    const navigator=useNavigate();
    const [openModal, setOpenModal] = useState(false)
    const showModal = () => {
        setOpenModal(!openModal)
        console.log("show modal")
    }

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        //changing title of html pages dynamically
        document.title = "ایونتیفای";
      }, []);
    return (
        <center>
            <Navbar />
            <div className="home-page">
{/*                 <button onClick={showModal} style={{marginTop:"70px",marginBottom:"10px"}}>
                    show wallet
                </button> */}
{/*                 {openModal && <Wallet openModel={openModal} setOpenModel={setOpenModal} />} */}
                <UpcomingEvents/>
                <Events />
            </div>            
        </center>
    )

};
export default Home;
