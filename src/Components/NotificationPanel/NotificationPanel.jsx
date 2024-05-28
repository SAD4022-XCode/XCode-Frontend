import React, { useState } from "react";
import "./NotificationPanel.css";
import Switch from "@mui/material/Switch";
import { Modal } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "./Animation - 1715616866327.json";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import moment from "moment-timezone";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      recipient: "",
      title: "ایونت شماره 1 ایجاد شد",
      content: "ایونت شماره 1",
      time: "2024-05-28T16:54:37.465Z",
      is_read: false,
    },
    {
      id: 2,
      recipient: "",
      title: "ایونت شماره 2 ایجاد شد",
      content: "ایونت شماره 2",
      time: "2024-05-28T16:54:37.465Z",
      is_read: false,
    },
    {
      id: 3,
      recipient: "",
      title: "ایونت شماره 3 ایجاد شد",
      content: "ایونت شماره 3",
      time: "2024-05-28T16:54:37.465Z",
      is_read: true,
    },
    {
      id: 4,
      recipient: "",
      title: "ایونت شماره 4 ایجاد شد",
      content: "ایونت شماره 4",
      time: "2024-05-28T16:54:37.465Z",
      is_read: true,
    },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let count = 0;
  notifications.map((notification) => {
    !notification.is_read ? count++ : (count = count);
  });
  const [notificationsCount, setNotificationsCount] = useState(count);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    clickToPause: true,
    animationData: animationData,
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleShowAll = (event) => {
    setShowAll(event.target.checked);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      is_read: true,
    }));
    setNotifications(updatedNotifications);
    setNotificationsCount(0);
  };
  const date = new Date().toISOString();
  const translateTime = (time) => {
    let translatedTime = moment.utc(time).local().fromNow();
    const translations = {
      ago: "قبل",
      "a few seconds": "لحظاتی",
      days: "روز",
      a: "یک",
      day: "روز",
      month: "ماه",
      months: "ماه",
      year: "سال",
      years: "سال",
      week: "هفته",
      weeks: "هفته",
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
    <>
      <div className="lottie-parent" onClick={toggleModal}>
        <div className="lottie">
          <Lottie options={defaultOptions} />
        </div>
        <p>{notificationsCount}</p>
      </div>
      <Modal
        show={modalIsOpen}
        onHide={toggleModal}
        centered
        className="notification-modal"
      >
        <div className="notification-panel text-right">
          <h5 className="close-section pb-0 mb-3 text-right">
            <CloseOutlinedIcon
              onClick={toggleModal}
              style={{ cursor: "pointer" }}
            />
          </h5>
          <h4>اعلان ها</h4>
          <div class="container">
            <div class="row">
              <hr className="custom-hr" />
              <hr className="custom-hr" />
            </div>
          </div>
          <label>
            نمایش همه اعلان ها
            <Switch checked={showAll} onChange={toggleShowAll} />
          </label>
          <p id="read-all" onClick={markAllAsRead}>
            خواندن همه
          </p>
          <ul>
            {notifications
              .filter((notification) => showAll || !notification.is_read)
              .map((notification) => (
                <li
                  key={notification.id}
                  className={notification.is_read ? "is_read" : "unread"}
                  onClick={() => {
                    const updatedNotifications = notifications.map((notif) => {
                      if (notif.id === notification.id) {
                        return { ...notif, is_read: true };
                      }
                      return notif;
                    });
                    setNotifications(updatedNotifications);
                    count = 0;
                    updatedNotifications.map((notification) => {
                      !notification.is_read ? count++ : (count = count);
                    });
                    setNotificationsCount(count);
                  }}
                >
                  <div className="title">
                    {!notification.is_read && (
                      <span className="blue-bullet"></span>
                    )}
                    <p id="notification-title">{notification.title}</p>
                    {/* place bullet here */}
                  </div>
                  <div className="content">
                    <p id="notification-content">{notification.content}</p>
                    <p id="notification-time">
                      {translateTime(notification.time)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default NotificationPanel;
