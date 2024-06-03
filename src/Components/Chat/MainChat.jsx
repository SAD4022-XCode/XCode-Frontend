import React from "react";
import MyChat from "./MyChat";
import ChatBox from "../ChatBox/chatbox";
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
import Navbar from "../Navbar/navbar";
import './MainChat.css'
const MainChat = () => {
  return (
    <>
      <Navbar />
      <ProfileSidebar />
      <div className="main-chat">
        <div className="row">
          <div className="col-lg-5 col-md-6 com-sm-">
            <MyChat />
          </div>
          <div className="col-lg-6 col-md-6">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainChat;
