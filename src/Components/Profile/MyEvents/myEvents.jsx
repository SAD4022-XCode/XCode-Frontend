import './myEvents.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar/navbar';
import ProfileSidebar from '../ProfileSidebar/profileSidebar';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import moment from 'moment-jalaali';
import Lottie from "react-lottie";
import animationData from "./Animation - 1715854965467.json";
import { useAuth } from "../../Authentication/authProvider";

const MyEvents = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [isOnline, setIsOnline] = useState("");
    const navigator = useNavigate();
    const [jalaliDate, setJalaliDate] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [eventDetails, setEventDetails] = useState()
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        clickToPause: true,
        animationData: animationData,
      };
    const auth = useAuth();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('https://eventify.liara.run/account/my_events/',{headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    Authorization:`JWT ${auth.token}`,
                }});
                setEventDetails(response.data);
                
                
            } catch (error) {
                
            } finally { 
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
      }, [eventDetails]);

    const dateConverter=(date) => {
        const jalali = moment(date).locale('fa').format('jYYYY/jMM/jDD');
        
        return jalali;
    }

    if (isLoaded === false){
        return(
            <div className="event-details"> 
                <Navbar/>
                
                <div className="container col loading" style={{height:"200px",width:"200px" ,marginTop:"15%"}}>
                    <Lottie options={defaultOptions} />
                </div>
            </div>
        );
    }
    return(
        <div className="myEventsAll">

            <header>
                <Navbar/>
            </header>

            <ProfileSidebar/>

            <div class="myEvent">

            <section id="varieties">
                <div class="sec-content-div">

                    {eventDetails.length>0 && eventDetails.map((event) => (
                    <div className='tile' onClick={() => navigator(`/event-details/${event.id}`)}>
                    {event.photo!== null  && <img src={event.photo} alt="photo" />}
                    {event.photo=== null  && <img src={require("../../../assets/events.jpg")} alt="photo" />}
                    
                    <h4>{event.title}</h4>
                    <p>
                    <br/>
                    {dateConverter(event.start_date)}
                    <br/>
                    {event.attendance ==="I" ? "حضوری" : "مجازی"}
                    </p>
                    </div>
                        
                    ))}
                    {eventDetails.length===0 && <div className="loading">
                        <h2 style={{marginTop:"50px",color:"#ffeba7"}}>شما تاکنون رویدادی ایجاد نکرده اید</h2>
                    </div>}
                </div>
            </section>
        </div>

    </div>
    );



}

export default MyEvents;