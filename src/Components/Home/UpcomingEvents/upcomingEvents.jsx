import React, { useState, useEffect} from "react";
// import { NavLink } from 'react-router-dom';
import './upcomingEvents.css';
// import ReactDOM from 'react-dom';

const UpcomingEvents = () => {

    const sliderImages = [ 
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
     const [activeImageNum, setCurrent] = useState(0);
     const length = sliderImages.length;
     const nextSlide = () => {
        setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
     };
     const prevSlide = () => {
        setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
     };

     const currentSlide = (n) => {
        setCurrent(n);
     };

     if (!Array.isArray(sliderImages) || sliderImages.length <= 0) {
        return null;
     }
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
                
              
              {sliderImages.map((currentSlide, ind) => {
                 return (
                    <div
                       className={ind === activeImageNum ? "currentSlide active" : "currentSlide"}
                       key={ind}>

                       {ind === activeImageNum && 
                       <>
                        <div className="title">
                            <span className="titleParagraph">
                            عنوان
                           {/* <br/> */}
                            <br/>
                            برگزار کننده                           
                            </span>
                        </div>
                        <a className="linkedTile" href="#">

                        <div class="tile">                            
                            
                            <p className="paragraph">:قیمت</p>
                            <i className="bi bi-cash" />
                            <p className="paragraph">:مکان</p>
                            <i className="bi bi-geo-alt-fill" />
                            <p className="paragraph">:تاریخ</p>
                            <i className="bi bi-calendar-date" />
                        </div>
                       
                        </a>
                        
                       <img src={currentSlide.url} className="image" /> 
                        
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