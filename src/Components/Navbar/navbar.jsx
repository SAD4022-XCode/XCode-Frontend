import React, { useState, useEffect} from "react";
import { NavLink } from 'react-router-dom'
import './navbar.css'



const Navbar = () => {
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
                    {!showNavbar &&<div className={showBorder && "auth-link"}>
                        {!isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                        {!isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}
                        {isLoggedIn && (<p>عکس پروفایل و نام</p>)

                        }
                    </div>}
                    {showNavbar && !isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/login" > ورود </NavLink>
                            </li>)}
                    {showNavbar && !isLoggedIn &&(<li className="auth-link-li">
                            <NavLink to="/register" > عضویت </NavLink>
                            </li>
                        )}
                    {showNavbar && isLoggedIn && (<p>عکس پروفایل و نام</p>)
                        
                    }
                    
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
