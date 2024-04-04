import './myEvents.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar  from "../../Navbar/navbar";
// import DatePicker from "react-multi-date-picker"
// import persian from "react-date-object/calendars/persian"
// import persian_fa from "react-date-object/locales/persian_fa"
// import "react-multi-date-picker/styles/colors/yellow.css"
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import moment from 'moment-jalaali';
// import defaultImage from '../../assets/events.jpg'
// import CityList from "./cityList";


const MyEvents = () => {

    // const navigator = useNavigate();
    // const [eventPhoto, setEventPhoto] = useState(defaultImage);
    const [eventType, setEventType] = useState("online");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [isFree, setIsFree] = useState(false);
    const [ticketPrice, setTicketPrice] = useState();
    const [ticketCount, setTicketCount] = useState();
    const [ticketCardHeight, setTicketCardHeight] = useState(window.innerWidth > 575 ? 180 : 320)
    const [datetimeCardHeight, setDatetimeCardHeight] = useState(window.innerWidth > 770 ? 400 : 500)

    const [dateInput, setDateInput] = useState('');
    const [timeInput, setTimeInput] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [todayJalaliDate, setTodayJalaliDate] = useState('');





    return(
        <center>
            <section className="create-event">
                <div className="container">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:"600px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">

                                <div style={{ position: "relative" }}>
                                    {<img
                                        // src={eventPhoto}
                                        src="https://picsum.photos/320/180"
                                        style={{ 
                                            paddingBottom: "20px", 
                                            paddingTop: "0px", 
                                            height: "auto", 
                                            width: "700px"}}
                                        alt="تصویر رویداد"
                                    />}
                                </div>

                                <div className="row">
                                    <div className="col-6 text-right">
                                        <div className={`form-group mt-1`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="نام رویداد"
                                            disabled
                                            />
                                        </div>
                                    </div>
                                

                                <div className="col-xl-6 col-md-6 col-sm-12 form-group text-right pr-3 pl-3">
                                        
                                        <p className="mt-2 mb-2">تاریخ و ساعت شروع: </p>
                                    
                                        <p className="mt-2 mb-2">تاریخ و ساعت پایان: </p>

                                </div>

                            </div>

                                <div class="radio-inputs">
                                    <label class="radio">
                                        <input type="radio" name="radio" value="online" checked={eventType==="online"} 
                                        />
                                        <span class="name">آنلاین</span>
                                    </label>
                                        
                                    <label class="radio">
                                        <input type="radio" name="radio" value="in-person" checked={eventType==="in-person"} 
                                        />
                                        <span class="name">حضوری</span>
                                    </label>
                                </div>



                                </div>






                            
                            </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>


            </section>
        </center>


    );



}

export default MyEvents;