import React from "react";
import "react-chat-elements/dist/main.css";
import { ChatList, MessageBox } from "react-chat-elements";

import "./MyChat.css";
const MyChat = () => {
  return (
    <>
    <ChatList
      className="chat-list"
      dataSource={[
        {
          avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
          alt: "kursat_avatar",
          title: "Kursat",
          subtitle: "Why don't we go to the No Way Home movie this weekend ?",
          date: new Date(),
          unread: 3,
        },  
      ]}
    />
    <MessageBox
  position={"left"}
  type={"text"}
  title={"Message Box Title"}
  text="Here is a text type message box"
/>
</>
  );
};

export default MyChat;
