import React, { useState, useEffect } from "react";
import "./registerEvent.css";

import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/navbar";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "./Animation - 1715854965467.json";

const RegisterEvent = () =>{
    const [checked, setChecked] = React.useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    // checkbox click handler
    function handleClick() {
      setChecked(!checked);
    };

    const eventIdExtractor = () => {
        const url = window.location.pathname;
        const event_id = url.split('/').pop();
        // console.log("event_id", event_id);
        return event_id;
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        clickToPause: true,
        animationData: animationData,
      };

    const [eventDetails, setEventDetails] = useState({
        eventTitle:"",
        ticket_price:"",
        attendance:"O",
        onlineevent:{url:""},
        province:"",
        city:"",
        photo:"",
        category:"",
        organizer_photo:"",
        organizerName:"",
        organizer_phone:"09123456789",
        organizer_email:"organizer@gmail.com",
        description:"",
        tags:[]

    })
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const event_id = eventIdExtractor();
                console.log("start fetching data")
                const response = await axios.get(`https://eventify.liara.run/events/${event_id}/`);
                setEventDetails(response.data);
                console.log("Console:\n", eventDetails)
                setTimeout(() => {
                    setIsLoaded(true);
                }, 1000);
            } catch (error) {
                console.log("we have error")
                // setError(true); 
                setTimeout(() => {
                    setIsLoaded(false);
                }, 1000);
                
            } finally { 
                // setLoading(false);
            }
        };
        fetchData();
    }, []);

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
        <>
        <Navbar/>
        <div className="registerEvent" 
            //  style={{ 
            //         backgroundImage: `url(${eventDetails.photo})` 
            //         }}
        >
        
            <div className="main">

            <div className="container">
                <form method="POST" className="appointment-form " id="appointment-form">
                    <h2>
                        ثبت نام در رویداد
                        <br/>
                        {eventDetails.title}
                        </h2>
                    <div className="form-group-1">
                        <input type="text" name="title" itemID="title" placeholder="نام" required />
                        <input type="text" name="name" itemID="name" placeholder="نام خانوادگی" required />
                        <input type="email" name="email" itemID="email" placeholder="ایمیل" required />
                        <input type="number" name="phone_number" itemID="phone_number" placeholder="شماره تماس" required />
                        {/* <input type="number" name="phone_number" itemID="phone_number" placeholder="شماره تماس" required /> */}
                        {/* <div className="select-list">
                            <select name="course_type" itemID="course_type">
                                <option slected value="">Course Type</option>
                                <option value="society">Society</option>
                                <option value="language">Language</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="form-group-2">
                        <div className="select-list">
                            <select name="confirm_type" itemID="confirm_type">
                                <option seleected value="">مرد</option>
                                <option value="by_email">زن</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-check">
                        {/* <input type="checkbox" name="agree-term" itemID="agree-term" className="agree-term" /> */}
                        <input type="checkbox" checked={checked} onChange={handleClick}/>
                        <label for="agree-term" className="label-agree-term">
                            <span>
                            </span>
                            <a href="#" className="term-service">ضوابط و قوانین&nbsp;</a>را مطالعه کردم و می‌پذیرم
                        </label>
                    </div>
                    <h3>هزینه بلیط: {eventDetails.ticket_price}</h3>
                    <div className="form-submit">
                        <input type="submit" name="submit" itemID="submit" className="submit" value="ثبت نام و پرداخت" />
                    </div>
                </form>
            </div>

        </div>


        </div>
    </>
    )
}

export default RegisterEvent;


{/* <script src="vendor/jquery/jquery.min.js"></script>
<script src="js/main.js"></script> */}