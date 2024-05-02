import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
import {useNavigate} from 'react-router-dom';
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

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const CreateEvent = () => {

    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        { value: 'entrepreneurship', label: 'کارآفرینی', color: '#5243AA' });
    const navigator = useNavigate();
    const [showViolations, setShowViolations] = useState(false)
    const [eventPhoto, setEventPhoto] = useState(defaultImage);
    const [eventType, setEventType] = useState("online");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [isFree, setIsFree] = useState(false);
    const [ticketPrice, setTicketPrice] = useState();
    const [ticketCardHeight, setTicketCardHeight] = useState(window.innerWidth > 575 ? 180 : 320)
    const [datetimeCardHeight, setDatetimeCardHeight] = useState(window.innerWidth > 770 ? 400 : 500)
    const [todayJalaliDate, setTodayJalaliDate] = useState('');
    const [mapData, setMapData] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [address,setAddress] = useState("")
    const {values, errors, touched, handleBlur,handleChange} = useFormik({
            initialValues :{
                eventName:"",
                eventDescription:"",
                phoneNumber:"",
                ssn:"",
                ticketCount:'',
                ticketPrice:'',
                eventLink:'',
            },
            validationSchema: createEventValidationSchema,
            validateOnBlur:false
        }
    );
  
    const createEventHandler =(event)=>{
        event.preventDefault()
        let canSubmit = false;
        setShowViolations(true)
        if (values.eventName &&
            values.eventDescription &&
            values.phoneNumber &&
            values.ssn &&
            values.ticketCount &&
            values.ticketPrice &&
            values.eventLink && Object.keys(errors).length===0){
                if (eventType==="online" && values.eventLink){
                   canSubmit = true 
                }
                if (eventType==="in-person" && address!=""){
                    canSubmit = true 
                }
        }
        if (canSubmit){
            let createEventData = {
                name:values.eventName,
                category:selectedCategory.value,
                tags:selectedTags,
                photo:eventPhoto,
                description:values.eventDescription,
                type:eventType,
                link:values.eventLink,
                province:selectedProvince,
                city:selectedCity,
                address:address,
                latlang:mapData,
                startDay:startDate.weekDay.name,
                endDay:endDate.weekDay.name,
                startDate:[startDate.year,startDate.month.name,startDate.day],
                endDate:[endDate.year,endDate.month.name,endDate.day],
                startTime:[startTime.hour,startTime.minute],
                endTime:[endTime.hour,endTime.minute],
                ticketCount:values.ticketCount,
                ticketPrice:values.ticketPrice,
                phoneNumber:values.phoneNumber,
                ssn:values.ssn,
            }
            console.log(createEventData)
            axios.post('http://127.0.0.1:8000/create-event/', createEventData,
                {headers:{
                    "Content-Type": "application/json",
                    accept: "application/json"
                }})
                .then(response => {
                    console.log('Data sent successfully:', response.data);
                    toast.success("رویداد ایجاد شد")
                    navigator('/home')
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                    toast.error("مشکل در ایجاد رویداد")

                });
        }else{
        }
        
    }

    
    const handleMapData = (data) =>{
        setMapData(data);
        console.log(mapData)
    }
    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
        document.title = "ایجاد رویداد";
        const todayGregorianDate = moment().locale('en').format('YYYY-MM-DD');
        const todayJalali = moment(todayGregorianDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        setTodayJalaliDate(todayJalali);
        const handleResize = () => {
            setTicketCardHeight(window.innerWidth > 575 ? 180 : 320);
            setDatetimeCardHeight(window.innerWidth > 770 ? 400 : 450)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

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
        console.log("change event type")
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
            values.ticketPrice=0;
            document.getElementById("ticketPrice").disabled = true;
        }else{
            document.getElementById("ticketPrice").disabled = false;
        }
        setIsFree(!isFree);
        
        
    }


    

    return (
        <center>
            <Navbar/>
            <ToastContainer className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"60px"}} pauseOnHover={false} autoClose={3000} />
            <form className="create-event">
                <div className="container pt-5">
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
                                        <div className={`form-group mt-2 ${errors.eventName && touched.eventName ? "invalid" : ""}`}>
                                            <input
                                            value={values.eventName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="eventName"
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="نام رویداد"
                                            />
                                        </div>
                                        {errors.eventName && touched.eventName && (<p className="mb-0 mt-2 validationMsg">{errors.eventName}</p>)}
                                    </div>
                                    <div className="col-6 text-right">
                                        <p className="mb-1">دسته بندی</p>
                                        
                                        <div className={`form-group mt-2 ${errors.eventCategory && touched.eventCategory  ? "invalid" : ""}`}>
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
                                            onChange={handleEventPhoto}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <p className="mb-1 mt-1 text-right"> توضیحات</p>
                                    <div className={`form-group mt-2 ${errors.eventDescription && touched.eventDescription ? "invalid" : ""}`}>
                                        <textarea 
                                            id="eventDescription"
                                            value={values.eventDescription}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        rows="5" cols="80" className="form-style-ce-area" dir="rtl" placeholder="توضیحات برگزاری رویداد">
                                        </textarea>
                                    </div>
                                    {errors.eventDescription && touched.eventDescription && (<p className="mb-0 mt-2 validationMsg">{errors.eventDescription}</p>)}

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
                        <div className="card-3d-wrap-ce" style={{height:`${eventType==="online"? datetimeCardHeight.toString()+"px" : (datetimeCardHeight+700).toString()+"px"}`}}>
                            <div className="card-back ">
                            <div className="center-wrap">
                                <div className="section">
                                <h4 className="mb-4 pb-3">اطلاعات برگزاری رویداد</h4>
                                <div className="text-right pb-2">نوع برگزاری </div>
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
                                        <div className={`mb-2 mt-2 text-right`} style={{fontSize:"16px"}}>لینک برگزاری </div>
                                        <div className={`form-group mb-1 ${errors.eventLink && touched.eventLink ? "invalid" : ""}`}>
                                            <input
                                            dir="ltr"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="https://"
                                            id="eventLink"
                                            value={values.eventLink}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            style={{textAlign:"left"}}
                                            />
                                        </div>
                                        {errors.eventLink && touched.eventLink && (<p className="mb-0 mt-2 validationMsg">{errors.eventLink}</p>)}
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
                                     <div className={`form-group mb-1 mt-1 ${(address==="" || address.length>100)&&showViolations ? "invalid" : ""}`}>
                                            <input
                                            dir="rtl"
                                            type="text"
                                            className="form-style-ce"
                                            placeholder="آدرس"
                                            value = {address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            style={{textAlign:"right"}}
                                            />
                                        </div>
                                        {address==="" && showViolations && (<p className="mb-0 mt-2 validationMsg">آدرس را وارد کنید</p>)}
                                        {address.length>100 && showViolations &&(<p className="mb-0 mt-2 validationMsg">طول آدرس کمتر از 100 کاراکتر باید باشد</p>)}
                                        <MapComponent sendDataToParent={handleMapData}/>
                                    </div>
                                }
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 col-sm-12 form-group text-right pr-3 pl-3">
                                        <p className="mt-2 mb-2">تاریخ و ساعت شروع </p>
                                        <div className="row">    
                                            <div className="col-8">
                                                <DatePicker portal
                                                    inputClass="form-style-ce"
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
                                                {errors.startDate && touched.startDate && (<p className="mb-0 mt-2 validationMsg">{errors.startDate}</p>)}
                                            </div>
                                            <div className="col-4">
                                                <DatePicker portal
                                                    value={startTime}
                                                    onChange={setStartTime}
                                                    inputClass="form-style-ce"
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
                                                    inputClass="form-style-ce"
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
                                            </div>
                                            <div className="col-4">
                                                <DatePicker portal
                                                    value={endTime}
                                                    onChange={setEndTime}
                                                    inputClass="form-style-ce"
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
                                            <div className={`form-group mb-1 ${errors.ticketCount && touched.ticketCount ? "invalid" : ""}`}>
                                                <input
                                                    id="ticketCount"
                                                    value={values.ticketCount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    dir="rtl"
                                                    type="number"
                                                    className="form-style-ce"
                                                    // value={ticketCount}
                                                    placeholder="100" />
                                            </div> 
                                            {errors.ticketCount && touched.ticketCount && (<p className="mb-0 mt-2 validationMsg">{errors.ticketCount}</p>)}

                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-4  text-right">
                                                <p className="mb-1">قیمت</p> 
                                                <div className={`form-group mb-1 ${errors.ticketPrice && touched.ticketPrice && !isFree  ? "invalid" : ""}`}>
                                                    <input
                                                        id="ticketPrice"
                                                        value={isFree===true ?"رایگان" :values.ticketPrice}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        dir="rtl"
                                                        type={isFree===true ?"text" : "number"}
                                                        className="form-style-ce "
                                                        // value={ticketPrice}
                                                        // onChange={ticketPriceHandler}

                                                        placeholder={isFree===true ?"رایگان" : "50000"} />
                                                </div>
                                                {errors.ticketPrice && touched.ticketPrice && !isFree &&(<p className="mb-0 mt-2 validationMsg">{errors.ticketPrice}</p>)}
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
                                            <div className={`form-group mt-2 ${errors.phoneNumber && touched.phoneNumber ? "invalid" : ""}`}>
                                                <input
                                                    id="phoneNumber"
                                                    value={values.phoneNumber} 
                                                    onChange={handleChange} 
                                                    onBlur={handleBlur} 
                                                    dir="rtl" 
                                                    type="text"
                                                    className="form-style-ce" 
                                                    placeholder="09123456789" />
                                            </div>
                                            {errors.phoneNumber  && touched.phoneNumber && (<p className="mb-0 mt-2 validationMsg">{errors.phoneNumber}</p>)}
                                        </div><div className="col-lg-6 col-md-6 col-sm-6 pt-2 text-right">
                                                <p className="mb-1">کدملی</p>
                                                <div className={`form-group mt-2 ${errors.ssn  && touched.ssn ? "invalid" : ""}`}>
                                                    <input
                                                        id="ssn"
                                                        value={values.ssn}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        dir="rtl"
                                                        type="text"
                                                        className="form-style-ce"
                                                        placeholder="0123456789"
                                                        maxLength="10"
                                                        />
                                                </div>
                                                {errors.ssn  && touched.ssn && (<p className="mb-0 mt-2 validationMsg">{errors.ssn}</p>)}
                                        </div>
                                    </div>
                                    <button
                                        // type="submit"
                                        className="btn mt-4"
                                        onClick={(e) => createEventHandler(e)}
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



