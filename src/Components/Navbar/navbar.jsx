import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom'
import './navbar.css'
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../Authentication/authProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Wallet from "../Wallet/wallet";
const Navbar = () => {
    const auth = useAuth();
    const navigator=useNavigate();
    const [showNavbar, setShowNavbar] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [searchBoxText, setSearchBoxText] = useState("")
    const [showBorder, setShowBorder] = useState(true);

    useEffect(() => {
        if(auth.token !==""){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
        const handleResize = () => {
            if (window.innerWidth>630){
                setShowNavbar(false);
                setShowBorder(true);
            }
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
        window.removeEventListener('resize', handleResize);
        };

    }, [isLoggedIn]);

    const handleShowNavbar = () => {
        console.log("show navbar",showNavbar)
        setShowNavbar(!showNavbar) ;
        console.log("show navbar",showNavbar)
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
    const [isOpen, setIsOpen] = useState(false);
 
    return (
    <nav className="navbar">
        <ToastContainer className="toastify-container" position="bottom-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginBottom:"60px"}} pauseOnHover={false} autoClose={3000} />

        <div className="container">
            <div >
                <img className="logo"
                    src={require("../../assets/logo.png")}
                    style={{paddingBottom:"15px"}}
                    alt="Google Logo"
                />
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
            


            <div className="menu-icon" onClick={handleShowNavbar}>
                <i class="bi bi-list" style={{ fontSize: '28px' ,paddingBottom : "15px"}}></i>
            </div>
            <div className={`nav-elements  ${showNavbar && 'active'}`}>
                <ul> 
                    <li>
                    <NavLink to="/" >خانه </NavLink>
                    </li>
                    <li>
                    <NavLink to="/blogs"> بلاگ ها</NavLink>
                    </li>
                    <li>
                    <NavLink to="/events">رویدادها</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-event" > ایجاد رویداد </NavLink>
                    </li>
                    {!showNavbar &&
                        <div className={!isLoggedIn && showBorder && "auth-link"}>
                        {!isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                        {!isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}</div>
                    }

                        {!showNavbar && isLoggedIn && 
                        <div className="dropdown-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                        <div className="row" >
                          <p className="pt-2 px-2 ellipsis"> {auth.user.username}</p>
                          <img src={require("../../assets/profile.png")} style={{height:"35px",borderRadius: "50%"  }} alt="profile"/>
                        </div>
                        {isOpen && (
                          <div className="col dropdown-content">
                                <div className="row pr-2 pt-2  dropdown-item1" onClick={() =>navigator('/user-info')}>
                                        <i class="pl-1 ml-0  uil uil-user"></i>
                                        <p className="pt-0 mb-0">حساب کاربری</p>
                                </div>
                                <div className="row pr-2 pb-0 mb-0   dropdown-item3">
                                        <i class="pl-1 ml-0 pr-1 mt-0 pb-0 bi bi-wallet2"></i>
                                        <p className="pt-1 mb-0 mt-1"><Wallet/> </p>
                                    
                                </div>
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
                    
                    {showNavbar && !isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                    {showNavbar && !isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}
                    {showNavbar && isLoggedIn && (<li className="auth-link-li">
                            <NavLink to="/userinfo" > حساب کاربری </NavLink>
                            </li>
                        )
                    }
                    {showNavbar && isLoggedIn && (
                        <li className="auth-link-li pb-1">
                            <Wallet />
                        </li>
                        
                        )
                    }
                    {showNavbar && isLoggedIn && (<li className="auth-link-li pb-1">
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
