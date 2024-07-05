import React, { useState, useEffect} from "react";
// import { NavLink } from 'react-router-dom';
import './upcomingEvents.css';
// import ReactDOM from 'react-dom';
import axios from "axios";
import moment from 'moment-jalaali';
import {useNavigate} from 'react-router-dom';
import animationData from "./Animation - 1715854965467.json";
import Lottie from "react-lottie";

const UpcomingEvents = () => {

    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [allEvents, setAllEvents] = useState([{}]);
    
    const [eventIds, setEventIds] = useState([ 
        "https://eventify.liara.run/events/91",
        "https://eventify.liara.run/events/92",
        "https://eventify.liara.run/events/93",
        "https://eventify.liara.run/events/90",
        "https://eventify.liara.run/events/95",
    ]);


    const navigator = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        clickToPause: true,
        animationData: animationData,
    };

    const events = [ 
        {
            url: 'https://picsum.photos/id/1/3200/900',
        },
        {
            url: 'https://picsum.photos/id/2/3200/900',
        },
        {
            url: 'https://picsum.photos/id/3/3200/900',
        },
        {
            url: 'https://picsum.photos/id/4/3200/900',
        },
        {
            url: 'https://picsum.photos/id/2/3200/900',
        }
    ];

    const getUpcomingEvents = async() => {
        const baseUrl = "https://eventify.liara.run/events/";
        const response = await axios.get(baseUrl)
        let eventsdata = response.data.results
        let eventURLs = []
        for (let i = 0; i < 5; i++) {
            let URL = "https://eventify.liara.run/events/" + eventsdata[i].id.toString()
            eventURLs.push(URL)
            // console.log("Event IDS")
            // console.log(URL)
        }
        setEventIds(eventURLs)
    }


        
    useEffect((eventsLoaded) => {  
        // if (eventsLoaded==true){
            if (eventsLoaded == false){
                // getUpcomingEvents()               --commented--
                // setTimeout(() => {
                setEventsLoaded(true);
                // }, 2000);
            }

            // console.log("All Event IDS in the loop")
            console.log("eventIds")
            console.log(eventIds)
            console.log(eventsLoaded)
            
            for (let i = 0; i < 5; i++){
                let event_url = eventIds[i];
                console.log("event url")
                console.log(event_url)
                
                const fetchData = async () => {
                    try {
                        const response = await axios.get(event_url);
                        events[i] = response.data
                        setIsLoaded(true);
                    } catch (error) {
                    console.log("we have error")
                } finally { 
                    // setLoading(false);
                }
                };
                fetchData();
            }
        // }
    // if(isLoaded){
        setAllEvents(events);
    // }
        
    console.log('all events: ', allEvents)
    }, []);
    
    const dateConverter=(date) => {
        const jalali = moment(date).locale('fa').format('jYYYY/jMM/jDD');
        
        // console.log(jalali);
        return jalali;
    }


     const [activeImageNum, setCurrent] = useState(0);
     const length = 5;
     const nextSlide = () => {
        setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
     };
     const prevSlide = () => {
        setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
     };

     const currentSlide = (n) => {
        setCurrent(n);
     };

     if (!Array.isArray(events) || events.length <= 0) {
        return null;
     }


    //  if (isLoaded === false){
    //     return(
    //         <div className="event-details"> 
    //             {/* <Navbar/> */}
                
    //             <div className="container col loading" style={{height:"200px",width:"200px" ,marginTop:"15%"}}>
    //                 <Lottie options={defaultOptions} />
    //             </div>
    //         </div>
    //     );
    // }





     return (
        <div className="UpcomingEvents">
           <section className = "image-slider">
              <div className = "left">
                <i className="bi bi-arrow-left-circle-fill" onClick = {prevSlide} />
              </div>
              <box-icon name='right-arrow-circle' type='solid' ></box-icon>
              <div className="right"> 
                 <i className="bi bi-arrow-right-circle-fill" onClick = {nextSlide} />
              </div>
              {allEvents.map((currentSlide, ind) => {
                 return (
                
              
                    <div
                       className={ind === activeImageNum ? "currentSlide active" : "currentSlide"}
                       key={ind}>

                       {ind === activeImageNum && 
                       <>
                        <div className="title">
                            <span className="titleParagraph">
                            {currentSlide.title}
                           {/* <br/> */}
                            {/* <br/>
                            برگزار کننده                            */}
                            </span>
                        </div>
                        <a className="linkedTile" onClick={() => navigator(`/event-details/${currentSlide.id}`)}>

                        <div class="tile">                            
                            {currentSlide.ticket_price===0 &&
                               <p dir="rtl" className="paragraph"> رایگان</p>

                            }
                            {currentSlide.ticket_price!==0 &&
                                 <p dir="rtl" className="paragraph">{currentSlide.ticket_price} تومان</p>

                            }
                            <i className="bi bi-cash" />
                            <p className="paragraph">{currentSlide.attendance ==="I" ? "حضوری" : "مجازی"}</p>
                            <i className="bi bi-geo-alt-fill" />
                            <p className="paragraph">{dateConverter(currentSlide.starts)}</p>
                            <i className="bi bi-calendar-date" />
                        </div>
                       
                        </a>
                        
                       <img src={currentSlide.photo} className="image" /> 
                        
                       </>
                        }
                       
                    </div>
                 );
              })}

              <div className="dots">
                <span className="dot" onClick = {() => currentSlide(0)}></span> 
                <span className="dot" onClick = {() => currentSlide(1)}></span> 
                <span className="dot" onClick = {() => currentSlide(2)}></span> 
                <span className="dot" onClick = {() => currentSlide(3)}></span> 
                <span className="dot" onClick = {() => currentSlide(4)}></span> 
              </div>  

           </section>
        </div>
     );
  
}

export default UpcomingEvents;