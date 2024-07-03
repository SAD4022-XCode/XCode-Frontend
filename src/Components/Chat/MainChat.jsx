import React from "react";
import MyChat from "./MyChat";
import ChatBox from "../ChatBox/chatbox";
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
import Navbar from "../Navbar/navbar";
import './MainChat.css'
import { useState, useRef,useEffect  } from 'react';

const MainChat = () => {
  const [smallScreen,setSmallScreen] = useState()
  const [showChatBox,setShowChatBox] = useState(false)
  const [marginRight, setMarginRight] = useState("250px")
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth>767){
        setSmallScreen(false)
      }else{
        setSmallScreen(true)
      }
      
    };
    // const handleMargin = () => {
      
    //   if(window.innerWidth>1600){
    //     setMarginRight("250px")
    //   }else{
    //     setSmallScreen("7%")
    //   }
    // };
    window.addEventListener('resize', handleResize);
    // window.addEventListener('resize', handleMargin);
    handleResize();
    // handleMargin();

    return () => {
      window.removeEventListener('resize', handleResize);
      // window.addEventListener('resize', handleMargin);
    };
  }, []);

  return (
    <>
      <Navbar/>
      <ProfileSidebar />
      {smallScreen===false &&
        <div className="main-chat">
          <div className="row">
            <div className="col-lg-5 col-md-6 mt-2">
              <MyChat setShowChatBox={setShowChatBox} setUserName={setUserName} />
            </div>
            {showChatBox ===true &&
              <div className="col-lg-6 col-md-6 mt-2">
                <ChatBox setShowChatBox={setShowChatBox} userName={userName} />
              </div>
            }
            {/* ,marginRight:{marginRight} */}
            {showChatBox ===false &&
              <div className="col-lg-6 col-md-6" style={{ textAlign: 'center', color: 'white', fontSize: '24px',marginTop:"40vh",fontFamily:"iransansweb"}}>
                گفت و گویی را انتخاب کنید
              </div>
            // <div className="col-lg-6 col-md-6">
            //   <center >
            //     گفت و گویی را انتخاب کنید
            //   </center>
            // </div>
            }
            
          </div>
        </div>
      }
      {smallScreen===true &&
        <div className="main-chat">
          <div className="row">
            {showChatBox ===false &&
              <div className="col-lg-5 col-md-6">
                <MyChat setShowChatBox={setShowChatBox} setUserName={setUserName} />
              </div>
            }
            {showChatBox ===true &&
              <div className="col-lg-6 col-md-6">
                <ChatBox setShowChatBox={setShowChatBox} userName={userName}/>
              </div>
            }
          </div>
        </div>
      }
      
    </>
  );
};

export default MainChat;
