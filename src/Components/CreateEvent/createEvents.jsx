import React, { useState, useEffect} from "react";
import Navbar  from "../Navbar/navbar";
import {json, useNavigate} from 'react-router-dom';
import './createEvents.css'
import defaultImage from '../../assets/events.jpg'
import CityList from "./cityList";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/yellow.css"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from 'moment-jalaali';
import { useFormik } from "formik";
import { createEventValidationSchema } from "./validation";
import MultiSelectTag from "./multiSelectTag";
import SelectCategory from "./selectCategory";
import MapComponent from "../MapComponent/MapComponent";
import axios from 'axios'
import { useAuth } from "../Authentication/authProvider";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const CreateEvent = () => {
    const auth = useAuth();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || "");


    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        { value: 'entrepreneurship', label: 'کارآفرینی', color: '#5243AA' });
    const navigator = useNavigate();
    const [showViolations, setShowViolations] = useState(false)
    const [eventPhotoFile, setEventPhotoFile] = useState(null);
    const [eventPhoto, setEventPhoto] = useState(defaultImage);
    const [eventType, setEventType] = useState("O");
    const [selectedProvince, setSelectedProvince] = useState("تهران");
    const [selectedCity, setSelectedCity] = useState("تهران");
    const [isFree, setIsFree] = useState(false);
    const [ticketCardHeight, setTicketCardHeight] = useState(window.innerWidth > 575 ? 180 : 320)
    const [datetimeCardHeight, setDatetimeCardHeight] = useState(window.innerWidth > 770 ? 400 : 500)
    const [todayJalaliDate, setTodayJalaliDate] = useState('');
    const [mapData, setMapData] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    
    const printEventData = (event)=>{
        console.log("")
    };
    const [showError ,setShowError] = useState([true,true,true,true,true,true,true,true,true]);
    const createEventHandler =(event)=>{
        event.preventDefault()
        console.log("ssssssssssssssssssssssssssss")
        setShowViolations(true)
        let canSubmit = true;
        if (eventType==="O"){
            if(showError[0] || showError[1] || showError[2] || showError[3] || showError[4] || showError[5] || showError[6] || startTime===null || startTime===null || endDate===null || endTime===null){
                canSubmit=false
                // toast.warning("فیلدهای مربوطه را به درستی پر کنید",{toastId:"warning in create event"})

            }else{
                setShowViolations(false)
            }
        }else{
            if(showError[0] || showError[1] || showError[3] || showError[4] || showError[5] || showError[6] || showError[7] || showError[8] || startTime===null || startTime===null || endDate===null || endTime===null){
                canSubmit=false
                // toast.error("فیلدهای مربوطه را به درستی پر کنید",{toastId:"warning in create event"})

            }else{
                setShowViolations(false)

            }
        }

       
       
        if (canSubmit){
            let jalaliDate = startDate.year.toString()+"/"+(startDate.monthIndex+1).toString()+"/"+startDate.day.toString()
            let miladiDate = moment(jalaliDate,'jYYYY/jM/jD').format('YYYY-MM-DD')
            const startIsoDate = moment(miladiDate).toISOString();
            const time1 = startTime.hour.toString()+":"+startTime.minute.toString();
            const startDateTime = `${miladiDate}T${time1}:00`

            let jalaliDate2 = endDate.year.toString()+"/"+(endDate.monthIndex+1).toString()+"/"+endDate.day.toString()
            let miladiDate2 = moment(jalaliDate2,'jYYYY/jM/jD').format('YYYY-MM-DD')
            const endIsoDate = moment(miladiDate2).toISOString();
            const time2 = endTime.hour.toString()+":"+endTime.minute.toString();
            const endDateTime = `${miladiDate2}T${time2}:00`;
            
            let tags = []
            for(let i=0;i<selectedTags.length;i++){
                tags.push(selectedTags[i].value)
            }
    
            let createEventData = {
                title:eventName,
                category:selectedCategory.label,
                tags:JSON.stringify(tags),
                photo:eventPhotoFile,
                description:eventDescription,
                attendance:eventType,
                url:eventLink,
                province:selectedProvince,
                city:selectedCity,
                address:address,
                is_paid:!isFree,
                location_lat:Math.round(mapData.lat*1000000)/1000000,
                location_lon:Math.round(mapData.lng*1000000)/1000000,
                starts:startDateTime,
                ends:endDateTime,
                maximum_tickets:Number(ticketCount),
                ticket_price:ticketPrice==="رایگان"? 0:Number(ticketPrice),
                organizer_phone:phoneNumber,
                organizer_SSN:ssn,
                
            }
            console.log(createEventData)
            
            axios.post('https://eventify.liara.run/events/',createEventData,
                {headers:{
                    "Content-Type": "multipart/form-data",
                    Authorization:`JWT ${auth.token}`,
                }})
                .then(response => {
                    console.log('Data sent successfully:', response.data);
                    toast.success("رویداد ایجاد شد")
                    setTimeout(() => {
                    navigator('/home');
                    }, 7000);
                })
                .catch(error => {
                    console.log('Error sending data:', error);
                    console.log("status code is:",error.response.status)
                    toast.error("خطا در ایجاد رویداد")
                    if (error.response && error.response.status === 401) {
                        console.log("Authentication failed. Please log in again.");
                        auth.logOut()
                    } else {
                        console.error("An error occurred:", error);
                    }

                });
        }
        
    }

    
    
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        document.title = "ایجاد رویداد";
        const todayGregorianDate = moment().locale('en').format('YYYY-MM-DD');
        const todayJalali = moment(todayGregorianDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        setTodayJalaliDate(todayJalali);
        const handleResize = () => {
            setTicketCardHeight(window.innerWidth > 575 ? 180 : 320);
            if (showError[6]){
                setTicketCardHeight(window.innerWidth > 575 ? 200 : 350);
            }
            let increase = 0
            if (startDate===null || startTime===null){
                increase = increase+20
            }
            if (endDate===null || endTime===null){
                increase = increase+20
            }
            setDatetimeCardHeight(window.innerWidth > 770 ? 400+increase : 450+increase)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);
    
    
    const handleeventPhotoFile = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file =event.target.files[0];
        console.log("file:",file)
        reader.onloadend = () => {
            setEventPhotoFile(file);
            setEventPhoto(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const [eventName ,setEventName] = useState("");
    
    const handleEventName = (event)=>{
        event.preventDefault();
        let errors = showError
        setEventName(event.target.value)
        if(event.target.value.length<3 || event.target.value.length>50){
            errors[0]=true
        }else{
            errors[0]=false
        }
        setShowError(errors)
    }

    const [eventDescription ,setEventDescription] = useState("");
    const handleEventDescription = (event) =>{
        event.preventDefault();
        let errors = showError
        setEventDescription(event.target.value)
        if(event.target.value.length<20 || event.target.value.length>2000){
            errors[1]=true
        }else{
            errors[1]=false
        }
        setShowError(errors)
    }
    
    const regLink = /^(http:\/\/|https:\/\/)(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    const [eventLink ,setEventLink] = useState("");
    const handleEventLink = (event)=>{
        event.preventDefault();
        let errors = showError
        setEventLink(event.target.value)
        if (!regLink.test(event.target.value)){
            errors[2]=true
        }else{
            errors[2]=false
        }
        setShowError(errors)

    }
    const regSSN = /^\d{10}$/
    const [ssn ,setSSN] = useState("");
    const handleSSN = (event)=>{
        event.preventDefault();
        let errors = showError
        setSSN(event.target.value)
        if (!regSSN.test(event.target.value)){
            errors[3]=true
        }else{
            errors[3]=false
        }
        setShowError(errors)

    }
    const regPhoneNumber = /^\d{11}$/
    const [phoneNumber, setPhoneNumber]=useState("");
    const handlePhoneNumber = (event)=>{
        event.preventDefault();
        let errors = showError
        setPhoneNumber(event.target.value)
        if (!regPhoneNumber.test(event.target.value)){
            errors[4]=true
        }else{
            errors[4]=false
        }
        setShowError(errors)

    }

    const [ticketCount, setTicketCount] = useState('');
    const handleTiketCount = (event)=>{
        event.preventDefault();
        let errors = showError
        setTicketCount(event.target.value)
        if(event.target.value<1 || event.target.value>10000){
            errors[5]=true
        }else{
            errors[5]=false
        }
        setShowError(errors)

    }
    const [ticketPrice, setTicketPrice] = useState('');
    const handleTicketPrice = (event)=>{
        event.preventDefault();
        let errors = showError
        if(!isFree){
            setTicketPrice(event.target.value)
            if(event.target.value<1 || event.target.value>10000000){
                errors[6]=true
            }else{
                errors[6]=false
            }
        }
        
        setShowError(errors)

    }
    const [address,setAddress] = useState("")
    const handleAddress = (event)=>{
        let errors = showError
        setAddress(event.target.value)
        if (event.target.value.length>100){
            errors[8]=true
        }else{
            errors[8]=false
        }
        setShowError(errors)
    }
    const handleMapData = (data) =>{
        let errors = showError
        errors[7]=false
        setShowError(errors)
        setMapData(data);
        // console.log(mapData)
    }

    const handleEventType = (event) => {
        printEventData();
        setShowViolations(false)
        console.log("change event type")
        if (eventType==="I"){
            setEventType("O");
        }
        else{
            setEventType("I");
        }
    }

    const handleIsFree = (event) => {
        let errors = showError
        if(!isFree){
            setTicketPrice("رایگان");
            errors[6]=false
            document.getElementById("ticketPrice").disabled = true;
        }else{
            errors[6]=true
            document.getElementById("ticketPrice").disabled = false;
        }
        setIsFree(!isFree);
        setShowError(errors)
        
        
    }


    

    return (
        <center>
            <Navbar/>
            <ToastContainer closeOnClick  className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"60px"}} pauseOnHover={false} autoClose={3000} />
            <form className="create-event">
                <div className="container pt-2">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:"780px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className="mb-3 pb-2">مشخصات رویداد</h4>

                                <div className="row">
                                    <div className="col-6 text-right">
                                        <p className="mb-1">نام رویداد</p>
                                        <div className={`form-group mt-2 ${showError[0] && showViolations ? "invalid" : ""}`}>
                                            <input
                                            value={eventName}
                                            onChange={handleEventName}
                                            id="eventName"
                                            
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="نام رویداد"
                                            />
                                        </div>
                                        {showError[0] && showViolations && (<p className="mb-0 mt-2 validationMsg">عنوان رویداد باید بین 3 تا 50 کاراکتر باشد</p>)}
                                    </div>
                                    <div className="col-6 text-right">
                                        <p className="mb-1">دسته بندی</p>
                                        
                                        <div className={`form-group mt-2`}>
                                            <SelectCategory
                                                selectedCategory={selectedCategory}
                                                setSelectedCategory={setSelectedCategory}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="mb-1 mt-2">تگ های رویداد</p>
                                    <MultiSelectTag
                                        selectedTags={selectedTags} 
                                        setSelectedTags={setSelectedTags}
                                    />
                                </div>
                                
                                <div style={{ position: "relative" }}>
                                    {eventPhoto && 
                                    <img
                                        src={eventPhoto}
                                        style={{ paddingBottom: "15px", paddingTop: "20px", maxHeight:"200px",width:"auto",maxWidth:"400px" }}
                                        alt="تصویر رویداد"
                                    />
                                    }
                                    <div style={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)" }}>
                                        <label for="file-upload" class="custom-file-upload">
                                            <div className="row align-items-center">
                                                <p class="upload-icon bi bi-camera"></p>
                                                <p class="upload-text">انتخاب تصویر</p>
                                            </div>
                                        </label>
                                        <input id="file-upload" type="file" style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleeventPhotoFile}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <p className="mb-1 mt-1 text-right"> توضیحات</p>
                                    <div className={`form-group mt-2 ${showError[1] && showViolations ? "invalid" : ""}`}>
                                        <textarea 
                                            id="eventDescription"
                                            value={eventDescription}
                                            onChange={handleEventDescription}

                                        rows="5" cols="80" className="form-style-ce-area" dir="rtl" placeholder="توضیحات برگزاری رویداد">
                                        </textarea>
                                    </div>
                                    {showError[1] && showViolations && (<p className="mb-0 mt-2 validationMsg">توضیحات رویداد باید بین 20 تا 2000 کاراکتر باشد</p>)}

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
                        <div className="card-3d-wrap-ce" style={{height:`${eventType==="O"? datetimeCardHeight.toString()+"px" : (datetimeCardHeight+600).toString()+"px"}`}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className="mb-4 pb-3">اطلاعات برگزاری رویداد</h4>
                                <div className="text-right pb-2">نوع برگزاری </div>
                                <div class="radio-inputs">
                                    <label class="radio">
                                        <input type="radio" name="radio" value="online" checked={eventType==="O"} onChange={handleEventType}/>
                                        <span class="name">آنلاین</span>
                                    </label>
                                        
                                    <label class="radio">
                                        <input type="radio" name="radio" value="in-person" checked={eventType==="I"} onChange={handleEventType}/>
                                        <span class="name">حضوری</span>
                                    </label>
                                </div>
                                {eventType==="O" && 
                                    <div>
                                        <div className={`mb-2 mt-2 text-right`} style={{fontSize:"16px"}}>لینک برگزاری </div>
                                        <div className={`form-group mb-1 ${showError[2] && showViolations ? "invalid" : ""}`}>
                                            <input
                                            dir="ltr"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="https://"
                                            id="eventLink"
                                            value={eventLink}
                                            onChange={handleEventLink}
                                            style={{textAlign:"left"}}
                                            />
                                        </div>
                                        {eventLink!=="" && eventType==="O"&& showError[2] && showViolations && (<p className="mb-0 mt-2 validationMsg">فرمت لینک نادرست است</p>)}
                                        {eventLink==="" && eventType==="O"&& showError[2] && showViolations && (<p className="mb-0 mt-2 validationMsg">لینک رویداد را وارد کنید</p>)}

                                    </div>
                                }
                                {eventType==="I" && 
                                    <div >
                                        <div className="text-right mt-2">استان و شهر</div>
                                        <CityList 
                                        selectedProvince={selectedProvince} 
                                        setSelectedProvince={setSelectedProvince}
                                        selectedCity={selectedCity}
                                        setSelectedCity={setSelectedCity}
                                     />
                                     <div className="text-right mt-2">آدرس</div>
                                     <div className={`form-group mb-1 mt-1 ${(address==="" || address.length>100)&&showViolations  && eventType==="I" ? "invalid" : ""}`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="آدرس"
                                            value = {address}
                                            onChange={handleAddress}
                                            style={{textAlign:"right"}}
                                            />
                                        </div>
                                        {address==="" && showError[8] && eventType==="I" && showViolations && (<p className="mb-0 mt-2 validationMsg">آدرس را وارد کنید</p>)}
                                        {address.length>100  && showError[8] && eventType==="I" && showViolations &&(<p className="mb-0 mt-2 validationMsg">طول آدرس کمتر از 100 کاراکتر باید باشد</p>)}
                                        {/* <MapComponent sendDataToParent={handleMapData}/> */}
                                        <MapComponent sendDataToParent={handleMapData} lati={35.6997} long={51.338} onlyShow={false}/>

                                        {showError[7] && eventType==="I" && showViolations && (<p className="mb-0 mt-2 mb-2 validationMsg"> محل برگزاری رویداد را بر روی نقشه مشخص کنید  </p>)}

                                    </div>
                                }
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 col-sm-12 form-group text-right pr-3 pl-3">
                                        <p className="mt-2 mb-2">تاریخ و ساعت شروع </p>
                                        <div className="row">    
                                            <div className="col-8">
                                                <DatePicker portal
                                                    inputClass={`form-style-ce ${startDate===null && showViolations ? "invalid" : ""}`}
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    calendarPosition="bottom-right"
                                                    digits={[0,1,2,3,4,5,6,7,8,9]}
                                                    weekDays={["ش","ی","د","س","چ","پ","ج"]}
                                                    monthYearSeparator={" "}
                                                    value={startDate}
                                                    onChange={setStartDate}
                                                    minDate={todayJalaliDate}
                                                    placeholder={todayJalaliDate}
                                                />
                                            {(startDate===null || startTime===null) && showViolations && (<p className="mb-0 mt-2 validationMsg"> تاریخ و ساعت شروع را مشخص کنید</p>)}
                                            </div>
                                            <div className="col-4">
                                                <DatePicker portal
                                                    value={startTime}
                                                    onChange={setStartTime}
                                                    inputClass={`form-style-ce ${startTime===null && showViolations ? "invalid" : ""}`}
                                                    disableDayPicker
                                                    format="HH:mm"
                                                    placeholder="18:00"
                                                    plugins={[
                                                    <TimePicker hideSeconds />
                                                    ]} 
                                                />
                                            </div>
                                            
    
                                        </div>
                                        
                                    </div>

                                    <div className="col-xl-6 col-md-6 form-group text-right pl-3 pr-3">
                                        
                                        <p className="mt-2 mb-2">تاریخ و ساعت پایان </p>
                                        <div className="row">    
                                            <div className="col-8">
                                                <DatePicker portal
                                                    inputClass={`form-style-ce ${endDate===null && showViolations ? "invalid" : ""}`}
                                                    calendar={persian}
                                                    locale={persian_fa}
                                                    calendarPosition="bottom-right"
                                                    digits={[0,1,2,3,4,5,6,7,8,9]}
                                                    weekDays={["ش","ی","د","س","چ","پ","ج"]}
                                                    monthYearSeparator={" "}
                                                    value={endDate}
                                                    onChange={setEndDate}
                                                    formattingIgnoreList={["a"]}
                                                    minDate={todayJalaliDate}
                                                    placeholder={todayJalaliDate}
                                                />
                                              {(endDate===null || endTime===null) && showViolations && (<p className="mb-0 mt-2 validationMsg"> تاریخ و ساعت پایان را مشخص کنید</p>)}

                                            </div>
                                            <div className="col-4">
                                                <DatePicker portal
                                                    value={endTime}
                                                    onChange={setEndTime}
                                                    inputClass={`form-style-ce ${endTime===null && showViolations ? "invalid" : ""}`}
                                                    disableDayPicker
                                                    format="HH:mm"
                                                    placeholder="19:00"
                                                    plugins={[
                                                    <TimePicker hideSeconds />
                                                    ]} 
                                                    
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
                    </div>
            </div>



            <div className="container">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:ticketCardHeight.toString()+"px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className=" pb-2"> بلیت </h4>
                                    
                                    <div className="row">
                                        <div className="col-lg-2 col-md-3 col-sm-4 ">
                                            <p className="mb-0 pb-1 text-right">نوع بلیت</p>
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
                                        <div className="col-lg-5 col-md-4 col-sm-4  text-right">
                                            <p className="mb-1">تعداد</p>
                                            <div className={`form-group mb-1 ${showError[5] && showViolations ? "invalid" : ""}`}>
                                                <input
                                                    id="ticketCount"
                                                    value = {ticketCount}
                                                    onChange={handleTiketCount}
                                                    dir="rtl"
                                                    type="number"
                                                    className="form-style-ce"
                                                    placeholder="100" />
                                            </div> 
                                            {showError[5] && showViolations && (<p className="mb-0 mt-2 validationMsg">تعداد بلیت باید 1 تا 10هزار باشد</p>)}

                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-4  text-right">
                                                <p className="mb-1">قیمت</p> 
                                                <div className={`form-group mb-1 ${showError[6] && showViolations && !isFree  ? "invalid" : ""}`}>
                                                    <input
                                                        id="ticketPrice"
                                                        value = {isFree===true ?"رایگان" :ticketPrice}
                                                        onChange={handleTicketPrice}
                                                        dir="rtl"
                                                        type={isFree===true ?"text" : "number"}
                                                        className="form-style-ce "

                                                        placeholder={isFree===true ?"رایگان" : "50000"} />
                                                </div>
                                                {showError[6] && showViolations && !isFree &&(<p className="mb-0 mt-2 validationMsg">قیمت  بلیت رویداد حداکثر 10 میلیون تومان می تواند باشد </p>)}
                                        </div>
                                        
                                    
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>

            

            
            <div className="container pb-5 mb-5">
                <div className="row">
                    <div className="section">
                        <div className="card-3d-wrap-ce" style={{height:(ticketCardHeight+90).toString()+"px"}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className=" pb-3"> مشخصات برگزارکننده </h4>
                                    
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6  pt-2 text-right">
                                            <p className="mb-1">شماره تلفن</p>
                                            <div className={`form-group mt-2 ${showError[4] && showViolations ? "invalid" : ""}`}>
                                                <input
                                                    id="phoneNumber"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneNumber}
                                                    dir="rtl" 
                                                    type="number"
                                                    className="form-style-ce" 
                                                    placeholder="09123456789" 
                                                    maxLength="11"
                                                    />
                                            </div>
                                            {showError[4] && showViolations && (<p className="mb-0 mt-2 validationMsg">َشماره تلفن شامل یک عدد 11 رقمی است</p>)}
                                        </div><div className="col-lg-6 col-md-6 col-sm-6 pt-2 text-right">
                                                <p className="mb-1">کدملی</p>
                                                <div className={`form-group mt-2 ${showError[3] && showViolations ? "invalid" : ""}`}>
                                                    <input
                                                        id="ssn"
                                                        value={ssn}
                                                        onChange={handleSSN}
                                                        dir="rtl"
                                                        type="number"
                                                        className="form-style-ce"
                                                        placeholder="0123456789"
                                                        maxLength="10"
                                                        />
                                                </div>
                                                {showError[3] && showViolations && (<p className="mb-0 mt-2 validationMsg">کدملی یک عدد 10 رقمی باید باشد</p>)}
                                        </div>
                                    </div>
                                    <button
                                        // type="submit"
                                        className="btn mt-4"
                                        onClick={(e) => createEventHandler(e)}
                                        // onClick={printEventData}
                                    >
                                        ایجاد رویداد
                                    </button>

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


