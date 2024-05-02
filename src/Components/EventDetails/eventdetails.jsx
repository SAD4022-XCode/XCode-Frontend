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
const EventDetails = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentUrl = window.location.href;

    const navigator=useNavigate();
    let { id } = useParams();

    const [eventDetails, setEventDetails] = useState({
        startDay:"پنج شنبه",
        startDate:[1403,"فروردین",30],
        startTime:[18,30],
        endDay:"جمعه",
        endDate:[1403,"فروردین",31],
        endTime:[22,30],
        eventName:"دوره جامع هوش‌مصنوعی پروژه-محور سمپوزیوم نوروساینس",
        price:1500000,
        type:"آنلاین",
        category:"تکنولوژی",
        tags:["پایتون","سرور","شبکه","دیتا ماینینگ","هوش مصنوعی"],
        organizerPhoto:"../../assets/sample-organizer.webp",
        organizerName:"پژوهشکده علوم شناختی دانش های بنیادی (IPM)",
        organizerPhone:"09123456789",
        organizerEmail:"organizer@gmail.com",
        description:`ششمین سمپوزیوم نوروساینس شریف (2024) با همکاری پژوهشکده علوم شناختی پژوهشگاه دانش های بنیادی (IPM)
        دوره آنلاین جامع هوش مصنوعی و یادگیری عمیق (شامل جلسات ایده پردازی انجام پروژه پژوهشی یا صنعتی فردی یا گروهی و مقاله نویسی)
        مدرس: آقای فرخ کریمی (مدرس و پژوهشگر پژوهشکده علوم شناختی پژوهشگاه دانش های بنیادی، مرکز مغز شریف و آکادمی نورومچ آمریکا)
        ثبت نام برای عموم آزاد و ظرفیت و مهلت ثبت نام محدود است در صورت تمایل لطفا قبل از اتمام ظرفیت ثبت نام خود را انجام دهید
        زمانبندی:
        از 30 فروردین تا 28 اردیبهشت 1403 هر هفته پنجشنبه جمعه ها به تعداد 10 روز کلاس آنلاین از ساعت 9 تا 18 به وقت ایران و جمعه 29 تیر 1403 مباحثه و ارائه پروژه ها
        برنامه:
        در طی دوره آموزش های تئوری و عملی، ارزیابی مستمر، جلسات تمرین و رفع اشکال، ایده پردازی و پروژه های صنعتی یا پژوهشی فردی یا گروهی انجام می شود. بعد جلسه محتوای ضبط شده از طریق پنل امن اسپات پلیر با با قابلیت پخش بر روی یک سیستم در اختیار شرکت کننده ها قرار داده خواهد شد. پس از پایان آموزش ها آزمون جامع گرفته خواهد شد و شرکت کنندگان در صورت تمایل می توانند با همراهی استاد پروژه خود را تا تابستان با اهداف پژوهش، استارتاپ یا مقاله ادامه دهند. در نهایت در تابستان ارائه و ارزیابی پروژه ها انجام و پروژه های برتر واجد شرایط به مرکز نوآوری پژوهشگاه و دانشگاه معرفی خواهند شد. در صورت امکان یک برنامه کوهپیمایی ساده اختیاری و یک جلسه حضوری و همزمان آنلاین برای افراد راه دور به منظور تعامل بیشتر شرکت کنندگان با همدیگر و استاد در نظر می باشد.
        
        `,
        tags:["هوش مصنوعی","پایتون","دیتاماینینگ","پردازش تصویر","LLM مدل زبانی بزرگ"]

    })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('/event-details/'+id,{headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                  }},);
                setEventDetails(response.data);
            } catch (error) {
                setError(error);
                
            } finally {
                setLoading(false);
            }
        };
        
        fetchData(); 
        //disable vertical scrollbar
        document.documentElement.style.overflowY = 'hidden';
        //change title of html page dynamically
        document.title = "جزئیات رویداد";

    }, []);

    const eventTags = eventDetails.tags.map(tag => <div className="container" style={{margin:"5px",padding:"2px",background:"#808080",width:"fit-content",fontSize:"12px",height:"20px"}}>#{tag}</div>);
    const copyToClipboard = () => {
        copy(currentUrl)
        .then(() => {
            console.log('آدرس کپی شد:', currentUrl);
        })
        .catch(err => {
            console.error('خطا در کپی کردن آدرس:', err);
        });
    };

    // if (loading) return <center>Loading...</center>;
    // if (error) return <PageNotFound />;
    // if (!eventDetails) return <div>No data available</div>;


    return (
        <>
            <Navbar/>
            <ToastContainer className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"60px"}} pauseOnHover={false} autoClose={3000} />
            

            {/* <div className="container">
                <img
                    src={require("../../assets/sample-event.webp")}
                    alt="Blurred Background"
                    style={{
                        position:'fixed',
                        top: 70,
                        left: 0,
                        width: '99%',
                        height: '100%', 
                        // maxHeight:"450px",
                        objectFit:"cover",
                        filter: 'blur(30px)', 
                        zIndex: 0,
                        overflow: "hidden",
                        overflowX:"hidden"
                    }}
                />
            </div>  */}
            




             <div className="event-details"> 
                <div className="section pb-0">
                    <div className="row justify-content-center">
                        <div className="card-3d-wrap-ce" style={{height:"400px", width:"350px"}}>
                            <div className="card-back text-right px-3 py-4">
                                <p className="pb-3 message">{eventDetails.day} {eventDetails.startDate[2]} {eventDetails.startDate[1]} {eventDetails.startDate[0]} ساعت {eventDetails.startTime[0]}:{eventDetails.startTime[1]}</p>
                                <h4 className=" pb-3"> {eventDetails.eventName} </h4>
                                <div className="row px-3">
                                    <i class="bi bi-tag-fill icons-style"></i>
                                    <p className="message">{eventDetails.price.toLocaleString()} تومان</p>
                                </div>
                                <div className="row px-3">
                                    <i class="bi bi-geo-alt-fill icons-style"></i>
                                    <p className="message">{eventDetails.type}</p>
                                </div>
                                <div className="row px-3 pb-3">
                                    <p class="bi bi-grid icons-style"></p>
                                    <p className="message">{eventDetails.category}</p>
                                </div>
                                <div className="row px-3 pt-4" >
                                    <img className="mt-1" src={require("../../assets/sample-organizer.webp")} style={{height:"45px",borderRadius: "50%" }} alt="profile"/>
                                    <div className="col">
                                        <p className="pt-2 px-0"> {eventDetails.organizerName}</p>
                                    </div>
                                </div>
                                <div className="row px-3">
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

                        <div>
                            <img
                                src={require("../../assets/sample-event.webp")}
                                alt="Your Image"
                                style={{ maxWidth: "770px",width:"auto", maxHeight: "400px" ,marginTop:"30px"}}
                            />
                        </div>
                    </div>
                </div>




                <div className="section pb-0" style={{marginLeft:"80px"}}>
                    <div className="row justify-content-center">
                        <div className="card-3d-wrap-ce" style={{height:"260px", width:"335px" , marginTop:"15px"}}>
                            <div className="card-back text-right px-3 py-4">
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-1 message">شروع: {eventDetails.startDay} {eventDetails.startDate[2]} {eventDetails.startDate[1]} {eventDetails.startDate[0]} ساعت {eventDetails.startTime[0]}:{eventDetails.startTime[1]}</p>

                                </div>
                                <div className="row px-3">
                                    <i class="bi bi-clock  icons-style"></i>
                                    <p className="pb-3 message">پایان: {eventDetails.endDay} {eventDetails.endDate[2]} {eventDetails.endDate[1]} {eventDetails.endDate[0]} ساعت {eventDetails.endTime[0]}:{eventDetails.endTime[1]}</p>

                                </div>
                                <div className="row px-3 pt-1" >
                                    <div className="col">
                                        <p className="pt-2 px-0"> اشتراک گذاری رویداد</p>
                                        <div className="row">
                                            <p className="message ellipsis" style={{fontSize:"12px"}}>{window.location.href}</p>
                                            <button className="btn  mt-1 mx-1" onClick={copyToClipboard}>
                                                کپی لینک  
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <center className="mt-2">
                                    <button
                                        className="btn  mt-1 mx-1"
                                        onClick={handleShow}
                                        >
                                        <div className="row">
                                            <h6 class="bi bi-bookmark-plus mb-0" ></h6>
                                             بعدا یادآوری کن
                                            
                                        </div>
                                    </button>
                                </center>
                                 
                            </div>
                            

                        </div>

                        <div>
                        <div className="section py-1 mr-0 ml-2 px-0 mb-2 pb-5">
                                <div className="card-3d-wrap-description pb-5 mb-5 mx-0 px-0" style={{minHeight:"455px",height:"auto"}} >
                                    <div className="card-back text-right px-3 pt-4  pb-1 mb-1" >
                                    <h4 className="pb-3">توضیحات</h4>
                                    <p className="message" style={{whiteSpace:"pre-line"}}>{eventDetails.description}</p>
                                    <center>
                                        <button
                                            className="btn  mt-1 mx-1"
                                            onClick={(e) => navigator('/payment')}
                                            >
                                            ثبت نام  
                                        </button>
                                    </center>
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',marginTop:"20px"}}>{eventTags}</div>  

                                    </div>

                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>{eventTags}</div>  

                                    
                        </div>
                    </div>
                </div>
            </div>  
            <OrganizerInfoModal show = {show} handleClose={handleClose} email={eventDetails.organizerEmail} phone={eventDetails.organizerPhone}/>
            
        
        
        </>
    );
}

export default EventDetails;

