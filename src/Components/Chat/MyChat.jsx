import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { ChatList, MessageBox } from "react-chat-elements";
import axios from "axios";
import moment from "moment-timezone";

import myData from "./MOCK_DATA.json";
import Card from "../Events List/Card";
import "./MyChat.css";
const MyChat = () => {
  const [loading, setLoading] = useState(true);
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
  return (
    <div className="my-chats">
      <div className="container-fluid justify-content-center align-content-center pb-5 mb-5 pt-1">
        <div className="items pb-5 mb-5 ">
          {/* {loading && (
            <div className="loading">
              <h2>Loading...</h2>
            </div>
          )} */}
          {myData.map((item, index) => (
            <div key={item.id} className="col-lg-12">
              <ChatList
                className={`chat-list mt-2 col-lg-12 col-md-12 chat-list-${index}`}
                dataSource={[
                  {
                    avatar: item.avatar,
                    alt: item.alt,
                    title: item.title,
                    subtitle: item.subtitle,
                    
                    unread: item.unread,
                  },
                ]}
              />
            </div>
          ))}

          <ChatList
            className="chat-list mt-2 col-lg-10 col-md-10"
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                alt: "kursat_avatar",
                title: "Kursat",
                subtitle:
                  "Why don't we go to the No Way Home movie this weekend ?",
                date: new Date(),
                unread: 10,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MyChat;
