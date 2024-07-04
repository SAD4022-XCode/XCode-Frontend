import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import PageNotFound from "../PageNotFound/PageNotFound";
import Navbar from "../Navbar/navbar";
import './eventdetails.css'
import OrganizerInfoModal from "./organizer-contact-info";
import MainComment from "./Comment/MainComment";
import moment from 'moment-jalaali';
import animationData from "./Animation - 1715854965467.json";
import Lottie from "react-lottie";
// import { Alert } from 'react-alert'
// import { toast } from "react-toastify";
import MapComponent from "../MapComponent/MapComponent";
import { useAuth } from "../Authentication/authProvider";

const EventDetails = () => {
    const [show, setShow] = useState(false);
    const [canPurchase, setCanPurchase] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentUrl = window.location.href;
    const defaultOptions = {
        loop: true,
        autoplay: true,
        clickToPause: true,
        animationData: animationData,
      };
    const navigator=useNavigate();
    let { id } = useParams();
    const monthDict ={0:"فروردین", 1:"اردیبهشت",2:"خرداد",3:"تیر",4:"مرداد",5:"شهریور",6:"مهر",7:"آبان",8:"آذر",9:"دی",10:"بهمن",11:"اسفند"};
    const dayDict ={"Monday":"دوشنبه","Tuesday":"سه شنبه","Wednesday":"چهارشنبه","Thursday":"پنج شنبه","Friday":"جمعه","Saturday":"شنبه","Sunday":"یک شنبه"};
    const [eventDateTime,setEventDateTime] = useState(
        {
        startWeekDay:"",
        startMonth:"",
        startTime:"",
        startYear:"",
        startDay:"",
        endWeekDay:"",
        endMonth:"",
        endTime:"",
        endYear:"",
        endDay:"",
    }
        );
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
        organizer_name:"",
        organizer_phone:"09123456789",
        organizer_email:"organizer@gmail.com",
        description:"",
        tags:[]

    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isBookmarked, setBookmark] = useState(false);
    let userData = JSON.parse(localStorage.getItem("userData"));

    const bookmarkToggler = () =>{
        if (userData != null){
    
            if (isBookmarked === false){
                setBookmark(true);
                // return "bi bi-bookmark-plus";
            }
            else{
                setBookmark(false);
                // return "bi bi-bookmark-plus-fill";
            }
            
        }
        else{
            toast.error('برای افزودن به علاقه مندی ها باید وارد سیستم شوید!');
            setTimeout(() => {
                navigator('/login');
            }, 2500);
        }
    }
    const auth = useAuth();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                console.log("start fetching data")
                const response = await axios.get('https://eventify.liara.run/events/'+id,{headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                  }},);
                console.log("Console:\n",response.data)
                setEventDetails(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("Authentication failed. Please log in again.");
                    auth.logOut()
                } else {
                    console.error("An error occurred:", error);
                }
                setError(true); 
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                
            } finally { 
                // setLoading(false);
            }
        };
        fetchData();
        //disable vertical scrollbar
        document.documentElement.style.overflowY = 'hidden';
        //change title of html page dynamically
        document.title = "جزئیات رویداد";
        let width = window.innerWidth;
        if(width<576){
            setScreenSize('extra small');
        }else if(width>=576 && width<768){
            setScreenSize('small');
        }
        else if(width>=768 && width<1200){
            setScreenSize('medium');
        }else{
            setScreenSize('large');
        }
    }, []);
    const [screenSize,setScreenSize] = useState()
    useEffect(() => {
        const handleResize = () => {
            let width = window.innerWidth;
            if(width<576){
                setScreenSize('extra small');
            }else if(width>=576 && width<865){
                setScreenSize('small');
            }
            else if(width>=865 && width<1200){
                setScreenSize('medium');
            }else{
                setScreenSize('large');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    })

    useEffect(() => {
        if (eventDetails.starts && eventDetails.ends) {
            const sdayOfWeek = moment(eventDetails.starts).format('dddd');
            const stime = moment(eventDetails.starts).format('HH:mm:ss');
            const syear = moment(eventDetails.starts).format('jYYYY');
            const sday = moment(eventDetails.starts).format('jD');

            const edayOfWeek = moment(eventDetails.ends).format('dddd');
            const etime = moment(eventDetails.ends).format('HH:mm:ss');
            const eyear = moment(eventDetails.ends).format('jYYYY');
            const eday = moment(eventDetails.ends).format('jD');
            setEventDateTime({
                startWeekDay: dayDict[sdayOfWeek],
                startMonth: monthDict[moment(eventDetails.starts).locale('fa').jMonth()],
                startTime: moment(stime, 'HH:mm:ss').subtract(3, 'hours').subtract(30, 'minutes').format('HH:mm:ss').substring(0, 5),
                startYear: syear,
                startDay: sday,

                endWeekDay: dayDict[edayOfWeek],
                endMonth: monthDict[moment(eventDetails.ends).locale('fa').jMonth()],
                endTime: moment(etime, 'HH:mm:ss').subtract(3, 'hours').subtract(30, 'minutes').format('HH:mm:ss').substring(0, 5),
                endYear: eyear,
                endDay: eday,
            });
            const inputDate = moment(eventDetails.starts);
            const inputTime = moment(moment(stime, 'HH:mm:ss').subtract(3, 'hours').subtract(30, 'minutes').format('HH:mm:ss'), 'HH:mm:ss');
            const currentDate = moment();
            const currentTime = moment().format('HH:mm:ss');
            const currentTimeMoment = moment(currentTime, 'HH:mm:ss');
            if (inputDate.isBefore(currentDate, 'day')) {
                setCanPurchase(false);
            }
            if (inputDate.isSame(currentDate, 'day')) {
                if (inputTime.isBefore(currentTimeMoment)) {
                    setCanPurchase(false);
                }
               
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            
        }
    }, [eventDetails]); 
    const copyToClipboard = () => {
        copy(currentUrl)
        .then(() => {
            console.log('آدرس کپی شد:', currentUrl);
        })
        .catch(err => {
            console.error('خطا در کپی کردن آدرس:', err);
        });
    };

    const copyLinkToClipboard = () => {
        console.log("event date & time:",eventDateTime)
        copy(eventDetails.onlineevent.url)
        .then(() => {
            console.log('لینک کپی شد:', eventDetails.onlineevent.url);
        })
        .catch(err => {
            console.error('خطا در کپی کردن لینک برگزاری:', err);
        });
    };

    const handleMapData = (data) =>{
        
        console.log("mapData")
    }

    const searchTagHandler = (tag) =>{
        console.log(`selected tag: #${tag}`)
    }
    const eventTags = eventDetails.tags.map(tag => <div className="container" onClick={() =>searchTagHandler(tag)} style={{cursor:"pointer",borderRadius:"5px",margin:"5px",paddingTop:"3px",paddingBottom:"2px",paddingLeft:"4px",paddingRight:"4px",background:"#808080",width:"fit-content",fontSize:"12px",height:"20px"}}>{tag}#</div>);
    if (loading) {
        return(
            <div className="event-details"> 
                <Navbar/>
                
                <div className="container col loading" style={{height:"200px",width:"200px" ,marginTop:"15%"}}>
                    <Lottie options={defaultOptions} />
                </div>
            </div>
        );
        
    }
    if (error) {
        return <PageNotFound />;
    }
    

    // if (!eventDetails) return <div>No data available</div>;

    return (
        <>
            <Navbar/>
            <ToastContainer closeOnClick  className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"60px"}} pauseOnHover={false} autoClose={3000} />
            

            <div className="event-details"> 
                {screenSize==='large' && <>
                        <div className="row justify-content-center" style={{marginTop:"30px"}}>
                            <div className="event-details-mcard py-3 mr-0 ml-2 px-3 mb-2" styel={{width:"350px",maxWidth:"350px"}}>
                                    <p className="pb-3 ed-message text-right" style={{fontSize:"14px"}}>{eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>
                                    <h4 className=" pb-3 text-right"> {eventDetails.title} </h4>
                                    <div className="row px-3"> 
                                        <i class="bi bi-tag-fill icons-style"></i>
                                        {eventDetails.is_paid && <p className="ed-message">{eventDetails.ticket_price.toLocaleString()} تومان</p>}
                                        {!eventDetails.is_paid && <p className="ed-message">رایگان</p>}
                                    </div>
                                    {eventDetails.attendance==="O" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message"style={{fontSize:"14px"}}>آنلاین</p>
                                    </div>)}
                                    
                                    {eventDetails.attendance==="I" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message"style={{fontSize:"14px"}}>{eventDetails.inpersonevent.province}-{eventDetails.inpersonevent.city}</p>
                                    </div>)}
                                    <div className="row px-3 pb-3">
                                        <p class="bi bi-grid icons-style"></p>
                                        <p className="ed-message"style={{fontSize:"14px"}}>{eventDetails.category}</p>
                                    </div>
                                    <div className="row px-3 pt-4" >
                                        <img className="mt-1" 
                                        src={(eventDetails.organizer_photo!=="" && eventDetails.organizer_photo!== null)?eventDetails.organizer_photo : require("../../assets/profile.png")}
                                        
                                        style={{height:"45px",borderRadius: "50%" }} alt="profile"/>
                                        <div className="col">
                                            <p className="pt-3 px-0 text-right"> {eventDetails.organizer_name} </p>
                                        </div>
                                    </div>
                                        <div className="row px-3"style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            >
                                            دنبال کردن 
                                        </button>
                                            <button
                                                className="btn  mt-1 mx-1"
                                                onClick={handleShow}
                                                >
                                                تماس  
                                            </button>
                                        </div>
                                    
                                </div>

                            <div>
                            <img className="" 
                                    src={(eventDetails.photo!=="" && eventDetails.photo!== null)?eventDetails.photo : require("../../assets/events.jpg")}
                                    alt="Your Image"
                                    style={{ width: "770px", height: "400px" }}
                                />
                                
                            </div>
                        </div> 

                    <div className="row justify-content-center">
                    <div className="event-details-card py-3 mr-0 ml-2 px-3 mb-2" style={{width:"350px",height:"fit-content"}}>
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-1 ed-message">شروع: {eventDateTime.startWeekDay} {eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>

                                </div>
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-3 ed-message">پایان: {eventDateTime.endWeekDay} {eventDateTime.endDay} {eventDateTime.endMonth} {eventDateTime.endYear} ساعت {eventDateTime.endTime} </p>

                                </div>
                                {eventDetails.attendance==="I" &&<>
                                    <div className="row px-3 pt-1" >
                                        <div className="col">
                                            <p className="pt-2 px-0 mb-0 text-right">آدرس برگزاری</p>
                                            <div className="row px-3">
                                                <p className="pb-3 ed-message">{eventDetails.inpersonevent.address}</p>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    
                                    <MapComponent  sendDataToParent={handleMapData} lati={eventDetails.inpersonevent.location_lat} long={eventDetails.inpersonevent.location_lon} onlyShow={true} name="EventDetails"/>

                                </>
                                
                                } 
                                {eventDetails.attendance==="O"  && 
                                    <div className="row px-3 pt-1" >
                                        <div className="col">
                                            <p className="pt-2 px-0 mb-0 text-right">لینک برگزاری</p>
                                            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{eventDetails.onlineevent.url}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyLinkToClipboard}>
                                                کپی لینک  
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                }
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0 mb-0 text-right"> اشتراک گذاری رویداد</p>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{window.location.href}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyToClipboard}>
                                                کپی   
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <center className="mt-2">
                                    {/* <button
                                        className="btn  mt-1 mx-1"
                                        onClick={handleShow}
                                        >
                                        <div className="row">
                                            <h6 class="bi bi-bookmark-plus mb-0" ></h6>
                                             بعدا یادآوری کن
                                            
                                        </div>
                                    </button> */}
                                    <div className="row px-3">
                                        <a class={isBookmarked ? 'bi bi-bookmark-plus-fill': 'bi bi-bookmark-plus'} 
                                        onClick={bookmarkToggler}></a>
                                        <p className="message">افزودن به علاقه مندی ها</p>
                                    </div>
                                </center>
                                
                            </div>

                        <div>
                            <div className="event-details-card py-3 mr-0 ml-2 px-3 mb-2" style={{width:"770px",maxWidth:"100%"}}>
                                    <h4 className="pb-3" style={{textAlign: "center"}}>توضیحات</h4>
                                    <p className="ed-message" style={{whiteSpace:"pre-line", textAlign: "right"}}>{eventDetails.description}</p>
                                    <center>
                                    {canPurchase && 
                                        <button
                                            className="btn  mt-1 mx-1"
                                            onClick={(e) => navigator('/register-event/'+id.toString())}
                                            >
                                            ثبت نام  
                                        </button>
                                    }
                                        
                                    </center>
                                    
                                    </div>
                                  <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', marginBottom: "25px", marginTop: "5px", width: "770px", maxWidth: "100%" }}>
                                    {eventTags}
                                </div>  
                            </div>
                </div> 
                </>
                }
 




                {(screenSize==='medium' || screenSize==="small" || screenSize==="extra small") && 
                    <center>
                        <>
                            <div>
                            <img className="" 
                                    src={(eventDetails.photo!=="" && eventDetails.photo!== null)?eventDetails.photo : require("../../assets/events.jpg")}
                                    alt="Your Image"
                                    style={{ maxWidth:'90%',width: "770px", height: "fit-content" ,marginTop:"30px",marginLeft:"15px"}}
                                />
                            </div>
                            <div>
                        <div className="event-details-card py-3 mr-0 ml-2 px-3 mb-2">
                            <h4 className="pb-3">توضیحات</h4>
                            <p className="ed-message" style={{whiteSpace:"pre-line", textAlign: "right"}}>{eventDetails.description}</p>
                            <center>
                                    {canPurchase && 
                                        <button
                                            className="btn  mt-1 mx-1"
                                            onClick={(e) => navigator('/register-event/'+id.toString())}
                                            >
                                            ثبت نام  
                                        </button>
                                    }
                            </center>
                            </div>
                        </div>

                        {screenSize==='medium' &&
                        <div className="row justify-content-right" style={{width:"770px"}}>
                            <div className="event-details-card  py-3 mr-0 ml-2 px-3 mb-2" style={{ height:"fit-content",width:"372px"}}>
                            <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-1 ed-message">شروع: {eventDateTime.startWeekDay} {eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>

                                </div>
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-3 ed-message">پایان: {eventDateTime.endWeekDay} {eventDateTime.endDay} {eventDateTime.endMonth} {eventDateTime.endYear} ساعت {eventDateTime.endTime} </p>

                                </div>
                                {eventDetails.attendance==="O"  && 
                                    <div className="row px-3 pt-1" >
                                        <div className="col">
                                            <p className="pt-2 px-0 mb-0 text-right">لینک برگزاری</p>
                                            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{eventDetails.onlineevent.url}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyLinkToClipboard}>
                                                کپی لینک  
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                }{eventDetails.attendance==="I" &&<>
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0 mb-0 text-right">آدرس برگزاری</p>
                                        <div className="row px-3">
                                            <p className="pb-3 ed-message">{eventDetails.inpersonevent.address}</p>
                                        </div>
                                    
                                    </div>
                                </div>
                                <MapComponent  sendDataToParent={handleMapData} lati={eventDetails.inpersonevent.location_lat} long={eventDetails.inpersonevent.location_lon} onlyShow={true} name="EventDetails"/>

                            </>
                            
                            } 
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0 mb-0 text-right"> اشتراک گذاری رویداد</p>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{window.location.href}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyToClipboard}>
                                                کپی   
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <center className="mt-2">
                                    {/* <button
                                        className="btn  mt-1 mx-1"
                                        onClick={handleShow}
                                        >
                                        <div className="row">
                                            <h6 class="bi bi-bookmark-plus mb-0" ></h6>
                                             بعدا یادآوری کن
                                            
                                        </div>
                                    </button> */}
                                    <div className="row px-3">
                                        <a class={isBookmarked ? 'bi bi-bookmark-plus-fill': 'bi bi-bookmark-plus'} 
                                        onClick={bookmarkToggler}>
                                        </a>

                                        <p className="message">افزودن به علاقه مندی ها</p>
                                    </div>
                                </center>
                                
                            </div>
                            <div className="event-details-card  py-3 mr-0 ml-2 px-3 mb-2" style={{ height:"fit-content",width:"372px",marginLeft:"10px"}}>
                            <p className="pb-3 ed-message text-right">{eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>
                                    <h4 className=" pb-3 text-right"> {eventDetails.title} </h4>
                                    <div className="row px-3">
                                        <i class="bi bi-tag-fill icons-style"></i>
                                        {eventDetails.is_paid && <p className="ed-message">{eventDetails.ticket_price.toLocaleString()} تومان</p>}
                                        {!eventDetails.is_paid && <p className="ed-message">رایگان</p>}
                                    </div>
                                    {eventDetails.attendance==="O" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message">آنلاین</p>
                                    </div>)}
                                    
                                    {eventDetails.attendance==="I" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message">{eventDetails.inpersonevent.province}-{eventDetails.inpersonevent.city}</p>
                                    </div>)}
                                    <div className="row px-3 pb-3">
                                        <p class="bi bi-grid icons-style"></p>
                                        <p className="ed-message">{eventDetails.category}</p>
                                    </div>
                                    <div className="row px-3 pt-4" >
                                        <img className="mt-1" 
                                        src={(eventDetails.organizer_photo!=="" && eventDetails.organizer_photo!== null)?eventDetails.organizer_photo : require("../../assets/profile.png")}
                                        style={{height:"45px",borderRadius: "50%" }} alt="profile"/>
                                        <div className="col">
                                            <p className="pt-3 px-0 text-right"> {eventDetails.organizer_name} </p>
                                        </div>
                                    </div>
                                    <div className="row px-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            >
                                            دنبال کردن 
                                        </button>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            onClick={handleShow}
                                            >
                                            تماس  
                                        </button>
                                    </div>
                            </div>
                        </div>
                        }











                        {(screenSize==='small' || screenSize==='extra small') && 
                            <>
                                <div className="event-details-card  py-3 mr-0 ml-2 px-3 mb-2" style={{ height:"fit-content",marginLeft:"10px"}}>
                            <p className="pb-3 ed-message text-right">{eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>
                                    <h4 className=" pb-3 text-right"> {eventDetails.title} </h4>
                                    <div className="row px-3">
                                        <i class="bi bi-tag-fill icons-style"></i>
                                        {eventDetails.is_paid && <p className="ed-message">{eventDetails.ticket_price.toLocaleString()} تومان</p>}
                                        {!eventDetails.is_paid && <p className="ed-message">رایگان</p>}
                                    </div>
                                    {eventDetails.attendance==="O" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message">آنلاین</p>
                                    </div>)}
                                    
                                    {eventDetails.attendance==="I" && (<div className="row px-3">
                                        <i class="bi bi-geo-alt-fill icons-style"></i>
                                        <p className="ed-message">{eventDetails.inpersonevent.province}-{eventDetails.inpersonevent.city}</p>
                                    </div>)}
                                    <div className="row px-3 pb-3">
                                        <p class="bi bi-grid icons-style"></p>
                                        <p className="ed-message">{eventDetails.category}</p>
                                    </div>
                                    <div className="row px-3 pt-4" >
                                        <img className="mt-1" 
                                        src={(eventDetails.organizer_photo!=="" && eventDetails.organizer_photo!== null)?eventDetails.organizer_photo : require("../../assets/profile.png")}
                                        style={{height:"45px",borderRadius: "50%" }} alt="profile"/>
                                        <div className="col">
                                            <p className="pt-3 px-0 text-right"> {eventDetails.organizer_name} </p>
                                        </div>
                                    </div>
                                    <div className="row px-3" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            >
                                            دنبال کردن 
                                        </button>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            onClick={handleShow}
                                            >
                                            تماس  
                                        </button>
                                    </div>
                            </div>




                                <div className="event-details-card  py-3 mr-0 ml-2 px-3 mb-2" style={{ height:"fit-content"}}>
                            <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-1 ed-message">شروع: {eventDateTime.startWeekDay} {eventDateTime.startDay} {eventDateTime.startMonth} {eventDateTime.startYear} ساعت {eventDateTime.startTime} </p>

                                </div>
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-3 ed-message">پایان: {eventDateTime.endWeekDay} {eventDateTime.endDay} {eventDateTime.endMonth} {eventDateTime.endYear} ساعت {eventDateTime.endTime} </p>

                                </div>
                                {eventDetails.attendance==="O"  && 
                                    <div className="row px-3 pt-1" >
                                        <div className="col">
                                            <p className="pt-2 px-0 mb-0 text-right">لینک برگزاری</p>
                                            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{eventDetails.onlineevent.url}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyLinkToClipboard}>
                                                کپی لینک  
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                }{eventDetails.attendance==="I" &&<>
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0 mb-0 text-right">آدرس برگزاری</p>
                                        <div className="row px-3">
                                            <p className="pb-3 ed-message">{eventDetails.inpersonevent.address}</p>
                                        </div>
                                    
                                    </div>
                                </div>
                                <MapComponent  sendDataToParent={handleMapData} lati={eventDetails.inpersonevent.location_lat} long={eventDetails.inpersonevent.location_lon} onlyShow={true} name="EventDetails"/>

                            </>
                            
                            } 
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0 mb-0 text-right"> اشتراک گذاری رویداد</p>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p className="ed-message ellipsis" style={{fontSize:"12px"}}>{window.location.href}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyToClipboard}>
                                                کپی   
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <center className="mt-2">
                                    {/* <button
                                        className="btn  mt-1 mx-1"
                                        onClick={handleShow}
                                        >
                                        <div className="row">
                                            <h6 class="bi bi-bookmark-plus mb-0" ></h6>
                                             بعدا یادآوری کن
                                            
                                        </div>
                                    </button> */}
                                    <div className="row px-3">
                                        <a class={isBookmarked ? 'bi bi-bookmark-plus-fill': 'bi bi-bookmark-plus'} 
                                        onClick={bookmarkToggler}></a>
                                        <p className="message">افزودن به علاقه مندی ها</p>
                                    </div>
                                </center>
                                
                            </div>

                            
                            </>

                        }
                        <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', marginBottom: "25px", marginTop: "5px", width: "770px", maxWidth: "90%" }}>
                            {eventTags}
                        </div>

                        
                    </>
                    </center>

                }



                










                <MainComment id={id}/>
            </div> 
            
            <OrganizerInfoModal show = {show} handleClose={handleClose} email={"aaghz1381@gmail.com"} phone={eventDetails.organizer_phone} id={eventDetails.creator_id}/>
            
        
        
        </>
    );
}

export default EventDetails;