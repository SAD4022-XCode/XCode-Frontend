import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom'
import './navbar.css'
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigator=useNavigate();

    const [showNavbar, setShowNavbar] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [searchBoxText, setSearchBoxText] = useState("")
    const [showBorder, setShowBorder] = useState(true);
    useEffect(() => {
        
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

    }, []);

    const handleShowNavbar = () => {
        
        setShowNavbar(!showNavbar) ;
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
                        )}</div>}

                        {!showNavbar && isLoggedIn && 
                        <div className="dropdown-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                        <div className="row" >
                          <p className="pt-2 px-2 ellipsis">رضا حسینی</p>
                          <img src={require("../../assets/profile.png")} style={{height:"35px"}} alt="profile"/>
                        </div>
                        {isOpen && (
                          <div className="col dropdown-content">
                                <div className="row pr-2 pt-2  dropdown-item1" onClick={() =>navigator('/userinfo')}>
                                        <i class="pl-1 ml-0  uil uil-user"></i>
                                        <p className="pt-0 mb-0">حساب کاربری</p>
                                </div>
                                <div className="row pr-2 pb-2 dropdown-item2" >
                                       <i className=" pl-2  bi bi-box-arrow-right"></i>
                                         <p className="pt-2 mb-0">خروج </p>

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
                    {showNavbar && isLoggedIn && (<li className="auth-link-li pb-1">
                            <p onClick={() => console.log("log out")}>خروج </p>
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
