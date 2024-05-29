import './profileSidebar.css'
import React, { useState,useEffect } from "react";
// import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const ProfileSidebar = () => {
    // // const [expandSidebar, setExpandSidebar] = useState(true);
    // const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [toActive, setToActive] = useState("")
    const url = window.location.href
    
    const expandHandler = (e) => {
        let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
            let arrowParent = e.target.parentElement.parentElement.parentElement; //selecting main parent of arrow
            // console.log(arrowParent);
            arrowParent.classList.toggle("showMenu");
        }
    }
    
    const setActive= () =>{

        if (url.includes("created-events")){
            setToActive("created-events");
        }
        
        else if (url.includes("registered-events")){
            setToActive("registered-events");
        }
        
        else if (url.includes("bookmarked-events")){
            setToActive("bookmarked-events");
        }
        
        else if (url.includes("user-info")){
            setToActive("user-info");
        }
    }
    // setActive()
        
        return(
            <div class="sidebar">
                <div class="logo-details">
                    {/* <img class='bx bxl-c-plus-plus'></img> */}  
                    <span class="logo_name">پروفایل</span>
                </div>
                <ul class="nav-links">
            {/* ------------------------------------------------------------ created-events */}
                {url.includes("created-events")==true && 
                <>
                <li style={{border:"1px solid #ffeba7"}}>
                    <a href="/created-events">
                        <span class="link_name">رویداد های ساخته شده</span>
                        <i class='bx bx-grid-alt' ></i>
                    </a>
                </li>
                </>
                }

                {url.includes("created-events")!=true && 
                <>
                <li >
                    <a href="/created-events">
                        <span class="link_name">رویداد های ساخته شده</span>
                        <i class='bx bx-grid-alt' ></i>
                    </a>
                </li>
                </>
                }



                {/* ------------------------------------------------------------ registered-events */}
                {url.includes("registered-events")==true && 
                <>
                <li style={{border:"1px solid #ffeba7"}}>
                    <a href="/registered-events">
                        <span class="link_name">رویداد های ثبت نام شده</span>
                        <i class='bx bx-purchase-tag' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                        <li><a class="link_name" href="#">اعتبار من</a></li>
                    </ul> */}
                </li>
                </>
                }
                
                
                {url.includes("registered-events")!=true && 
                <>
                <li>
                    <a href="/registered-events">
                        <span class="link_name">رویداد های ثبت نام شده</span>
                        <i class='bx bx-purchase-tag' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                        <li><a class="link_name" href="#">اعتبار من</a></li>
                    </ul> */}
                </li>
                </>
                }

                {/* ------------------------------------------------------------ icon-link */}
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
                
                {/* ------------------------------------------------------------ bookmarked-events */}
                {url.includes("bookmarked-events")==true && 
                <>
                <li style={{border:"1px solid #ffeba7"}}>
                    <a href="/bookmarked-events">
                        <span class="link_name">رویداد های نشان شده</span>
                        <i class='bx bxs-heart' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Analytics</a></li>
                    </ul> */}
                </li>
                </>
                }   

                {url.includes("bookmarked-events")!=true && 
                <>
                <li>
                    <a href="/bookmarked-events">
                        <span class="link_name">رویداد های نشان شده</span>
                        <i class='bx bxs-heart' ></i>
                    </a>
                    {/* <ul class="sub-menu blank">
                    <li><a class="link_name" href="#">Analytics</a></li>
                    </ul> */}
                </li>
                </>
                }   



                {/* ------------------------------------------------------------ user-info */}
                {url.includes("user-info")==true && 
                <>
                <li style={{border:"1px solid #ffeba7"}}>
                    <a href="/user-info">
                        <span class="link_name">تغییر مشخصات کاربری</span>
                        <i class='bx bx-cog' ></i>
                    </a>
                </li>
                </>
                }

                {url.includes("user-info")!=true && 
                <>
                <li>
                    <a href="/user-info">
                        <span class="link_name">تغییر مشخصات کاربری</span>
                        <i class='bx bx-cog' ></i>
                    </a>
                </li>
                </>
                }
                


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

        // -------------------------------------------



            // <div class="sidebar" style={({ height: "100vh" }, { display: "flex", flexDirection: "row-reverse" })}>
            //     {/* <Sidebar style={{ height: "100vh" }} rtl={true}> */}
            //         <Menu class="nav-links">
            //             <MenuItem
            //                 icon={<MenuOutlinedIcon />}
            //                 onClick={() => {
            //                     collapseSidebar();
            //                 }}
            //                 style={{ textAlign: "center" }}>
            //                 {" "}
            //                 <h2>پروفایل</h2>
            //                 </MenuItem>

            //             <MenuItem icon={<i class="bx bx-purchase-tag"></i>}>رویدادهای ثبت نام شده</MenuItem>
            //             <MenuItem icon={<i class="bx bx-grid-alt"></i>}>رویدادهای ساخته شده</MenuItem>
            //             <MenuItem icon={<i class="bx bxs-heart"></i>}>رویداد های نشان شده</MenuItem>
            //             <MenuItem icon={<i class="bx bx-cog"></i>}>تغییر نشخصات کاربری</MenuItem>
            //         </Menu>
            //     {/* </Sidebar> */}
            // </div>

        
        // <div id="app" style={({ height: "100vh" }, { display: "flex", flexDirection: "row-reverse" })}>
        //     <Sidebar style={{ height: "100vh" }} rtl={true}>
        //         <Menu>
        //         <MenuItem
        //             icon={<MenuOutlinedIcon />}
        //             onClick={() => {
        //             collapseSidebar();
        //             }}
        //             style={{ textAlign: "center" }}
        //         >
        //             {" "}
        //             <h2>پروفایل</h2>
        //         </MenuItem>

        //         <MenuItem icon={<i class="bx bx-purchase-tag"></i>}>رویدادهای ثبت نام شده</MenuItem>
        //         <MenuItem icon={<i class="bx bx-grid-alt"></i>}>رویدادهای ساخته شده</MenuItem>
        //         <MenuItem icon={<i class="bx bx-dollar arrow"></i>}>اعتبار من</MenuItem>
        //         <MenuItem icon={<i class="bx bxs-heart"></i>}>رویداد های نشان شده</MenuItem>
        //         <MenuItem icon={<i class="bx bx-cog"></i>}>تغییر نشخصات کاربری</MenuItem>
        //         {/* <MenuItem icon={<i class="bx bx-purchase-tag"></i>}>Calendar</MenuItem> */}
        //         </Menu>
        //     </Sidebar>

                


        //     <main>
        //         <h1 style={{ color: "white", marginLeft: "5rem" }}>
        //         React-Pro-Sidebar
        //         </h1>
        //     </main>
        // </div>


    )
}

export default ProfileSidebar;