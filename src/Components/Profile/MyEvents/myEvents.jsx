import './myEvents.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar/navbar';
import ProfileSidebar from '../ProfileSidebar/profileSidebar';
import axios from "axios";

const MyEvents = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [isOnline, setIsOnline] = useState("");
    
    let eventData = {
        name: eventName,
        date: eventDate,
        online: isOnline,
    };

    // axios.get('https://eventify.liara.run/account/my_events/', eventData).then(response => {
    //     console.log('Data sent successfully:', response.data);
    //     if (response.data['message'] === "Data received successfully") {
    //         setEventName("");
    //         // setEnteredRegisterEmail("");
    //         setEventDate("");
    //         setIsOnline("");
    //         // toast.success("!با موفقیت عضو شدید");
    //         setTimeout(() => {
    //           navigator('/home');
    //         }, 4000);
        //   } else if (response.data['message'] === `username is already taken`) {
            // setShowViolation(true);
            // setRegisterUserNameValidation(false);
            // setRegisterUserNameValidationMsg("نام کاربری موردنظر در سیستم ثبت شده است");

        //   } else if (response.data['message'] === `email address has already been registered in our system`) {
            // setShowViolation(true);
            // setRegisterEmailValidation(false);
            // setRegisterEmailValidationMsg("ایمیل موردنظر در سیستم ثبت شده است");
        //   }
        // })

    // }


    return(
        <div className="myEventsAll">

            <header>
                <Navbar/>
            </header>

            <ProfileSidebar/>

            <div class="myEvent">

            <section id="varieties">
                {/* <h3 class="section-heading">VARIETIES</h3> */}
                <div class="sec-content-div">
                <div class="tile">
                    <img src="https://i.ibb.co/t2x706V/amber.jpg" alt="photo of amber apples" />
                    <h4>ایونت1</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                <div class="tile">
                    <img
                    src="https://i.ibb.co/H4Cnh7v/american-trel.png"
                    alt="photo of american trel apples"
                    />
                    <h4>ایونت2</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/jTDgqYB/red-delicious.png" alt="photo of red delicious apple" />
                    <h4>ایونت3</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/MSvg1QN/maharaja.png" alt="photo of Maharaej apples" />
                    <h4>ایونت4</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/zVR1LB2/hazal.png/" alt="photo of Hazratbael apples" />
                    <h4>ایونت5</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/BNFrnZn/golden.png" alt="photo of Golden Delicious apples" />
                    <h4>ایونت6</h4>
                    <p>
                    <br/>
                    2022/2/1
                    <br/>
                    حضوری
                    </p>
                </div>
                </div>
            </section>
        </div>

    </div>
    );



}

export default MyEvents;