import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
import {useNavigate} from 'react-router-dom';
import './createEvents.css'
import defaultImage from '../../assets/events.jpg'
import CityList from "./cityList";
const CreateEvent = () => {
    const navigator = useNavigate();
    const [eventPhoto, setEventPhoto] = useState(defaultImage);
    const [eventType, setEventType] = useState("online");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [isFree, setIsFree] = useState(false);
    const [ticketPrice, setTicketPrice] = useState();
    const [ticketCount, setTicketCount] = useState();
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        document.title = "ایجاد رویداد";
      }, []);

    const handleEventPhoto = (event) => {
        const file = event.target.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = (e) => {
                setEventPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleEventType = (event) => {
        if (eventType==="in-person"){
            setEventType("online");
        }
        else{
            setEventType("in-person");
        }
    }

    const handleIsFree = (event) => {
        if(!isFree){
            setTicketPrice("رایگان");
        }
        setIsFree(!isFree);
        
    }

    const ticketPriceHandler = (event) => {
        if (isFree){
            setTicketPrice("رایگان")
        }else{
            setTicketPrice(event.target.value)
        }
    }

    return (
        <center>
            <Navbar/>
            <form className="create-event">
            
                <div className="container">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:"450px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className="mb-4 pb-3">مشخصات رویداد</h4>

                                <div className="row">
                                    <div className="col-6 text-right">
                                        <p className="mb-1">نام رویداد</p>
                                        <div className={`form-group mt-1`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="نام رویداد"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 text-right">
                                        <p className="mb-1">موضوع رویداد</p>
                                        <div className={`form-group mb-1`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="موضوع رویداد"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: "relative" }}>
                                    {eventPhoto && <img
                                        src={eventPhoto}
                                        style={{ paddingBottom: "15px", paddingTop: "20px", height: "250px", width: "500px" }}
                                        alt="تصویر رویداد"
                                    />}
                                    <div style={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)" }}>
                                        <label for="file-upload" class="custom-file-upload">
                                            <div className="row align-items-center">
                                                <p class="upload-icon bi bi-camera"></p>
                                                <p class="upload-text">انتخاب تصویر</p>
                                            </div>
                                        </label>
                                        <input id="file-upload" type="file" style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleEventPhoto}
                                        />
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>






            <div className="container">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:`${eventType==="online"? "300px" : "400px"}`}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className="mb-4 pb-3">اطلاعات مربوط به برگزاری رویداد</h4>
                                <div className="text-right">نوع برگزاری رویداد</div>
                                <div class="radio-inputs">
                                    <label class="radio">
                                        <input type="radio" name="radio" value="online" checked={eventType==="online"} onChange={handleEventType}/>
                                        <span class="name">آنلاین</span>
                                    </label>
                                        
                                    <label class="radio">
                                        <input type="radio" name="radio" value="in-person" checked={eventType==="in-person"} onChange={handleEventType}/>
                                        <span class="name">حضوری</span>
                                    </label>
                                </div>
                                {eventType==="online" && 
                                    <div>
                                        <p className="mb-2 mt-2 text-right" style={{fontSize:"16px"}}>لینک برگزاری رویداد</p>
                                        <div className={`form-group mb-1`}>
                                            <input
                                            dir="ltr"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="https://"
                                            style={{textAlign:"left"}}
                                            />
                                        </div>
                                    </div>
                                }
                                {eventType==="in-person" && 
                                    <div >
                                        <div className="text-right mt-2">استان و شهر</div>
                                        <CityList 
                                        selectedProvince={selectedProvince} 
                                        setSelectedProvince={setSelectedProvince}
                                        selectedCity={selectedCity}
                                        setSelectedCity={setSelectedCity}
                                     />
                                     <div className="text-right mt-2">آدرس</div>
                                     <div className={`form-group mb-1 mt-1`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="آدرس"
                                            style={{textAlign:"right"}}
                                            />
                                        </div>
                                    </div>
                                }
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>




            <div className="container pb-5">
                <div className="row">
                    <div className="section pb-5">
                        <div className="card-3d-wrap-ce" style={{height:"200px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className=" pb-3"> بلیت </h4>
                                    
                                    <div className="row">
                                        <div className="col-2">
                                            <p className="mb-0 text-right">نوع بلیت</p>
                                            <div className="row pt-0 mt-0 align-items-center">
                                                <input 
                                                    type="checkbox" 
                                                    className="switchButton" 
                                                    value={isFree}
                                                    onChange={handleIsFree}
                                                />
                                                <p className="pt-3">رایگان</p>
                                            </div>
                                        </div>
                                        <div className="col-5 text-right">
                                            <p className="mb-1">تعداد</p>
                                            <div className={`form-group mt-1`}>
                                                <input
                                                    dir="rtl"
                                                    type="number"
                                                    className="form-style-ce"
                                                    value={ticketCount}
                                                    placeholder="100" />
                                            </div>
                                        </div><div className="col-5 text-right">
                                                <p className="mb-1">قیمت</p>
                                                <div className={`form-group mb-1`}>
                                                    <input
                                                        dir="rtl"
                                                        type={isFree===true ?"text" : "number"}
                                                        className="form-style-ce "
                                                        value={ticketPrice}
                                                        onChange={ticketPriceHandler}
                                                        placeholder={isFree===true ?"رایگان" : "50000"} />
                                                </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
            </form>
        </center>
    )

}
export default CreateEvent;



