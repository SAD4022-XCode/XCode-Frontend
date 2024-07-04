import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { ChatList, MessageBox } from "react-chat-elements";
import axios from "axios";
import moment from "moment-timezone";
import { useAuth } from "../Authentication/authProvider";

import myData from "./MOCK_DATA.json";
import Card from "../Events List/Card";
import "./MyChat.css";
const MyChat = ({ setShowChatBox, setUserName , setConversationId, setProfile, setUserId}) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || ""
  );
  console.log(currentUserData);
  // const getUserData = async () => {
  //   const response = await axios.get(`https://eventify.liara.run/account/me/`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `JWT ${auth.token}`,
  //     },
  //   });
  //   setCurrentUserData(response.data)
  //   setTimeout(()=>{console.log(currentUserData)},1000)
  // };
  // getUserData();
  const translateTime = (time) => {
    let translatedTime = moment.utc(time).local().fromNow();
    const translations = {
      ago: "قبل",
      "a few seconds": "لحظاتی",
      days: "روز",
      a: "یک",
      day: "روز",
      months: "ماه",
      month: "ماه",
      years: "سال",
      year: "سال",
      weeks: "هفته",
      week: "هفته",
      minutes: "دقیقه",
      minute: "دقیقه",
      hours: "ساعت",
      hour: "ساعت",
      seconds: "ثانیه",
      few: "چند",
    };

    for (let key in translations) {
      if (translatedTime.includes(key)) {
        translatedTime = translatedTime.replace(key, translations[key]);
      }
    }

    return translatedTime;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://eventify.liara.run/account/conversations/",
          {
            headers: { Authorization: `JWT ${auth.token}` },
          }
        );
      //   console.log(response);
      //   let needed_data = []
      //   for (let i = 0; i < response.data.length; i++){
      //   if (response.data[i].participants[0].user.username === currentUserData.user.username){
      //     needed_data = {id: response.data[i].id, profile_picture:response.data[i].participants[1].profile_picture, username:response.data[i].participants[1].user.username, content: response.data[i].last_message.content, is_read: response.data[i].last_message.is_read, time: response.data[i].last_message.timestamp} 
      //     setContacts(contacts => [...contacts,needed_data])
      //     console.log(needed_data)
      //     // console.log(response.data[i].participants[1])
      //   }
      //   else{
      //     needed_data = {id: response.data[i].id, profile_picture:response.data[i].participants[0].profile_picture, username:response.data[i].participants[0].user.username, content: response.data[i].last_message.content, is_read: response.data[i].last_message.is_read, time: response.data[i].last_message.timestamp} 
      //     setContacts(contacts => [...contacts,needed_data])
      //     console.log(needed_data)
      //     // console.log(response.data[i].participants[0])
      //   }
      // }
    //     setTimeout(()=>{
    //     console.log(contacts)
    //     },1000)
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const newContacts = response.data.map((conversation) => {
      const participant =
        conversation.participants[0].user.username ===
        currentUserData.user.username
          ? conversation.participants[1]
          : conversation.participants[0];
      return {
        id: conversation.id,
        profile_picture: participant.profile_picture,
        username: participant.user.username,
        user_id : participant.user.id,
        content: conversation.last_message.content,
        is_read: conversation.last_message.is_read,
        time: conversation.last_message.timestamp,
      };
    });

    setContacts(newContacts);
    console.log(contacts)
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
    fetchData();
  }, []);
  return (
    <div className="my-chats">
      <div className="container-fluid justify-content-center align-content-center pb-5 mb-5 pt-1">
        <div className="items pb-5 mb-5 ">
          {/* {loading && (
            <div className="loading">
              <h2>Loading...</h2>
            </div>
          )} */}
          {contacts.map((item, index) => (
            <div key={item.id} className="col-lg-12">
              <ChatList
                className={`chat-list mt-2 col-lg-12 col-md-12 chat-list-${index}`}
                onClick={(e) => {
                  setShowChatBox(true);
                  setUserName(item.username);
                  setConversationId(item.id)
                  setUserId(item.user_id)
                  setProfile(item.profile_picture)
                }}
                dataSource={[
                  {
                    avatar: item.profile_picture,
                    alt: item.alt,
                    title: item.username,
                    subtitle: item.content,

                    unread: item.unread,
                  },
                ]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChat;
