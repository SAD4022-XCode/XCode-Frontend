import './myEvents.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../Navbar/navbar';
import ProfileSidebar from '../ProfileSidebar/profileSidebar';


const MyEvents = () => {

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