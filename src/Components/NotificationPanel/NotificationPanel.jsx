import React, { useState, useEffect } from "react";
import "./NotificationPanel.css";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "./Animation - 1715616866327.json";
const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New email received", read: false },
    { id: 2, message: "Friend request accepted", read: false },
    { id: 3, message: "Update available", read: true },
    { id: 4, message: "System rebooted", read: true },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    clickToPause: false,
    animationData: animationData,
  };
  const showNotifHandler = () => {
    setShowNotif(!showNotif);
  };
  const toggleShowAll = (event) => {
    setShowAll(event.target.checked);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };
  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       setLoading(true);
  //       const baseUrl = "https://eventify.liara.run/filter";
  //       const response = await axios.get(baseUrl);
  //       setLoading(false);
  //     };
  //     fetchEvents();
  //   });
  return (
    <>
    <div className="lottie-parent">
      {
        <div className="lottie">
          <Lottie options={defaultOptions} />
        </div>
      }
      </div>
      <div className="notification-panel text-right">
        {showNotif && (
          <>
            <h4>اعلان ها </h4>
            <label>
              نمایش همه اعلان ها
              <Switch checked={showAll} onChange={toggleShowAll} />
            </label>
            <p onClick={markAllAsRead}>خواندن همه</p>
            <ul>
              {notifications
                .filter((notification) => showAll || !notification.read)
                .map((notification) => (
                  <li
                    key={notification.id}
                    className={notification.read ? "read" : "unread"}
                  >
                    {notification.message}
                  </li>
                ))}
            </ul>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
