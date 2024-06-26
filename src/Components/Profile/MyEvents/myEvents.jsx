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

const MyEvents = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [isOnline, setIsOnline] = useState("");
    const navigator = useNavigate();
    const [jalaliDate, setJalaliDate] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [eventDetails, setEventDetails] = useState([
        {"photo":"https://eventify.liara.run/media/events/e138ed26e7acc72a629c8fa9000e58fa.webp"}])
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        clickToPause: true,
        animationData: animationData,
      };

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                console.log("start fetching data")
                const response = await axios.get('https://eventify.liara.run/events/');
                console.log("Console Event details response:\n",response.data)
                setEventDetails(response.data.results);
                console.log("Console Event Details state:\n", eventDetails)
                setIsLoaded(true);
            } catch (error) {
                console.log("we have error")
                
            } finally { 
            }
        };
        fetchData();
    }, []);

    const dateConverter=(date) => {
        const jalali = moment(date).locale('fa').format('jYYYY/jMM/jDD');
        
        console.log(jalali);
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

                    {eventDetails.map((event) => (
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
                </div>
            </section>
        </div>

    </div>
    );



}

export default MyEvents;