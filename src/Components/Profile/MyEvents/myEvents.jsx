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
                <div class="sec-content-div flexible">
                <div class="tile">
                    <img src="https://i.ibb.co/t2x706V/amber.jpg" alt="photo of amber apples" />
                    <h4>Amber</h4>
                    <p>
                    This red, medium-sized fruit becomes fully ripe in mid-October. It
                    is mostly grown in Shopian and Kulgam.
                    </p>
                </div>
                <div class="tile">
                    <img
                    src="https://i.ibb.co/H4Cnh7v/american-trel.png"
                    alt="photo of american trel apples"
                    />
                    <h4>American Trel</h4>
                    <p>
                    A small, rounded, very crispy and sweet fruit variety that ripens
                    in mid-September.
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/jTDgqYB/red-delicious.png" alt="photo of red delicious apple" />
                    <h4>Red Delicious</h4>
                    <p>
                    A very popular and widely cultivated variety of apple that ripens
                    in mid-September. Its flesh is greenish white, grainy and juicy.
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/MSvg1QN/maharaja.png" alt="photo of Maharaej apples" />
                    <h4>Maharaej</h4>
                    <p>
                    A large apple with red and green color. It tastes a bit sour but
                    sweetens with time and is available by late October.
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/zVR1LB2/hazal.png/" alt="photo of Hazratbael apples" />
                    <h4>Hazratbael</h4>
                    <p>
                    A quickly perishable variety that ripens in early July. It is the
                    oldest variety of apples cultivated in the valley and is mostly
                    consumed domestically
                    </p>
                </div>
                <div class="tile">
                    <img src="https://i.ibb.co/BNFrnZn/golden.png" alt="photo of Golden Delicious apples" />
                    <h4>Golden Delicious</h4>
                    <p>
                    A variety with comparatively longer shelf life, it is crispy,
                    juicy and has thick greenish-white flesh which turns golden upon
                    ripening. It is available till January.
                    </p>
                </div>
                </div>
            </section>
        </div>

    </div>
    );



}

export default MyEvents;