import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom'
import './navbar.css'
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../Authentication/authProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Wallet from "../Wallet/wallet";
import axios from "axios";
// import Noty from "./Noty"
import NotificationPanel from "../NotificationPanel/NotificationPanel";
const Navbar = () => {
    const auth = useAuth();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || "");
    const navigator=useNavigate();
    const [showDrawer, setshowDrawer] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [searchBoxText, setSearchBoxText] = useState("")
    const [showBorder, setShowBorder] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")) || "");
        if(auth.token !==""){
            if(!isLoggedIn){
                async function fetchUserData() {
                //     const response = await axios.get(`https://eventify.liara.run/account/me/`,{headers: {
                //         "Content-Type": "application/json",
                //         Authorization:`JWT ${auth.token}`,
                //     }});
                //     localStorage.setItem("userData",JSON.stringify(response.data));
                //     setUserData(response.data);
                //     console.log(response.data)
                //     setIsLoggedIn(true) 
                    try {
                        const response = await axios.get(`https://eventify.liara.run/account/me/`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `JWT ${auth.token}`,
                            }
                        });
                        
                        localStorage.setItem("userData", JSON.stringify(response.data));
                        setUserData(response.data);
                        setIsLoggedIn(true);
                        console.log("Navbar: ",response);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            console.log("Authentication failed. Please log in again.");
                            auth.logOut()
                        } else {
                            console.error("An error occurred:", error);
                        }
                    }
                }
                    
                fetchUserData();
            }
            
        }else{
            setIsLoggedIn(false)
        }
        const handleResize = () => {
            if (window.innerWidth>630){
                setshowDrawer(false);
                setShowBorder(true);
            }
        };
        function handleClickOutside(event) {
            if (isOpen && !event.target.closest('.dropdown-container')) {
              setIsOpen(false);
            }
          }
        window.addEventListener('resize', handleResize);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        window.removeEventListener('resize', handleResize);
        };
        
      
        

    }, [isOpen]);

    const handleshowDrawer = () => {
        console.log("show navbar",showDrawer)
        setshowDrawer(!showDrawer) ;
        console.log("show navbar",showDrawer)
        if(showBorder===false){
            setTimeout(() => {setShowBorder(!showBorder)}, 300);
        }else{
            setShowBorder(!showBorder)
        }
        
    }
    const searchBoxTextHandler = () => {
        //get reccomendations from server to show 
    }
    const searchHandler = () => {
        //get search results from server
    }
    
 
    return (
    <nav className="navbar">
        {/* <ToastContainer closeOnClick  className="toastify-container" position="bottom-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginBottom:"60px"}} pauseOnHover={false} autoClose={3000} /> */}

        <div className="container">
            <div >
                <NavLink to={"/home"}>
                <img className="logo"
                    src={require("../../assets/logo.png")}
                    style={{paddingBottom:"15px"}}
                    alt="Google Logo"   
                />
                </NavLink>
            </div>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="جستجو..." 
                    className="search-input" 
                    value={searchBoxText}
                    onChange={(e) => setSearchBoxText(e.target.value)}
                />
                <button className="search-button" onClick={searchHandler}>
                    <p class="bi bi-search search-icon"></p>
                </button>
            </div>
            
            


            <div className="menu-icon" onClick={handleshowDrawer}>
                <i class="bi bi-list" style={{ fontSize: '28px' ,paddingBottom : "15px"}}></i>
            </div>
            <div className={`nav-elements  ${showDrawer && 'active'}`}>
                <ul>
                    { !showDrawer && auth.token && (
                    <li>
                        <NotificationPanel />
                    </li>
                    )}
                    {!showDrawer && auth.token && (
                    <li>
                        <Wallet balance={userData.balance}/>
                    </li>
                    )}
                    <li>
                    <NavLink to="/home" >خانه </NavLink>
                    </li>
                    <li>
                    <NavLink to="/events">رویدادها</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-event" > ایجاد رویداد </NavLink>
                    </li>
                    {!showDrawer &&
                        <div className={!auth.token && showBorder && "auth-link"}>
                        {!auth.token &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                        {!auth.token &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}</div>
                    }

                        {!showDrawer && auth.token && 
                        <div className="dropdown-container" onMouseEnter={() => setIsOpen(true)}>
                        
                        <div className="row" >
                            {userData && <p className="pt-2 px-2 ellipsis"> {userData.user.username}</p>}
                            {userData.profile_picture && <img src={userData.profile_picture} style={{height:"40px",width:"40px",borderRadius: "50%"  }} alt="profile"/>}
                            {!userData.profile_picture && <img src={require("../../assets/profile.png")} style={{height:"40px",width:"40px",borderRadius: "50%"  }} alt="profile"/>}
                            
                            
                        </div>
                          
                        
                        {isOpen && (
                          <div className="col dropdown-content">
                                <div className="row pr-2 pt-2  dropdown-item1" onClick={() =>navigator('/created-events')}>
                                        <i class="pl-1 ml-0  uil uil-user"></i>
                                        <p className="pt-0 mb-0">حساب کاربری</p>
                                </div>
                                {/* <div className="row pr-2 pb-0 mb-0   dropdown-item3">
                                        <i class="pl-1 ml-0 pr-1 mt-0 pb-0 bi bi-wallet2"></i>
                                        <p className="pt-1 mb-0 mt-1"><Wallet/> </p>
                                    
                                </div> */}
                                <div className="row pr-2 pb-2  dropdown-item2" >
                                       <i className=" pl-2 pr-1 mt-1 bi bi-box-arrow-right"></i>
                                         <p className="pt-2 mb-0 mt-1" onClick={() => {
                                toast.error("از حساب کاربری خارج شدید")
                                setTimeout(() => {
                                    auth.logOut()
                                    setIsLoggedIn(false)
                                  }, 4000);
                            }}>خروج </p>

                                </div>
                        </div>
                        )}
                      </div>
                        
                    }
                    
                    {showDrawer && !auth.token &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                    {showDrawer && !auth.token &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}
                    {showDrawer && auth.token && (<li className="auth-link-li">
                            <NavLink to="/created-events" > حساب کاربری </NavLink>
                            </li>
                        )
                    }
                    {showDrawer  && auth.token &&(<li className="auth-link-li" style={{marginRight:"15px"}}>
                                <NotificationPanel/>
                            </li>
                        )
                    }
                    {showDrawer  && auth.token &&(<li className="auth-link-li" style={{marginRight:"15px"}}>
                                <Wallet balance={userData.balance}/>
                            </li>
                        )
                    }
                    {/* {showDrawer && auth.token && (
                        <li className="auth-link-li pb-1">
                            <Wallet />
                        </li>
                        
                        )
                    } */}
                    {showDrawer && auth.token && (<li className="auth-link-li pb-1">
                            <p onClick={() => {
                                toast.error("از حساب کاربری خارج شدید")
                                setTimeout(() => {
                                    auth.logOut()
                                    setIsLoggedIn(false)
                                  }, 4000);

                            }}>خروج </p>
                            </li>
                        )
                    }
                    
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
