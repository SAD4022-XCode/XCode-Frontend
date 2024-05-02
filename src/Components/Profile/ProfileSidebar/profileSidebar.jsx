import './profileSidebar.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


const ProfileSidebar = () => {
    // // const [expandSidebar, setExpandSidebar] = useState(true);
    // const [showLoginPassword, setShowLoginPassword] = useState(false);

    const expandHandler = (e) => {
        let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
            let arrowParent = e.target.parentElement.parentElement.parentElement; //selecting main parent of arrow
            // console.log(arrowParent);
            arrowParent.classList.toggle("showMenu");
        }

    }

    return(

            <div class="sidebar">
                <div class="logo-details">
                    {/* <img class='bx bxl-c-plus-plus'></img> */}
                    <span class="logo_name">پروفایل</span>
                </div>
                <ul class="nav-links">

                <li>
                    <a href="#">
                        <span class="link_name">رویداد های ثبت نام شده</span>
                        <i class='bx bx-purchase-tag' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                        <li><a class="link_name" href="#">اعتبار من</a></li>
                    </ul> */}
                </li>
                
                <li>
                    <a href="#">
                        <span class="link_name">رویداد های ساخته شده</span>
                        <i class='bx bx-grid-alt' ></i>
                    </a>
                </li>
                

                <li>
                    <div class="icon-link">
                        <a onClick={expandHandler} href="#">
                            <i class='bx bxs-chevron-down arrow' ></i>
                            <span class="link_name arrow">اعتبار من</span>
                            <i class='bx bx-dollar arrow'></i>
                        </a>
                    </div>
                        
                    <ul class="sub-menu">
                        <li><a class="link_name" href="#">اعتبار من</a></li>
                        <li><a href="#">:اعتبار شما</a></li>
                        <li><a href="#">افزایش اعتبار</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <span class="link_name">رویداد های نشان شده</span>
                        <i class='bx bxs-heart' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Analytics</a></li>
                    </ul> */}
                </li>
     
                <li>
                    <a href="/user-info">
                        <span class="link_name">تغییر مشخصات کاربری</span>
                        <i class='bx bx-cog' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                        <li><a class="link_name" href="#">Setting</a></li>
                    </ul> */}
                </li>
                
                {/* <li>
                <div class="profile-details">
                <div class="profile-content">
                    <img src="image/profile.jpg" alt="profileImg"/>
                </div>
                <div class="name-job">
                    <div class="profile_name">Prem Shahi</div>
                    <div class="job">Web Desginer</div>
                </div>
                <i class='bx bx-log-out' ></i>
                </div>
            </li> */}
            </ul>
        </div>


    )
}

export default ProfileSidebar;