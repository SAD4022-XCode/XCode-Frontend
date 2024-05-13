import React, { useState } from "react";
import "./NotificationPanel.css";
import Switch from "@mui/material/Switch";
import { Modal } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "./Animation - 1715616866327.json";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "ایونت شماره 1", read: false },
    { id: 2, message: "ایونت شماره 2", read: false },
    { id: 3, message: "ایونت شماره 3", read: true },
    { id: 4, message: "ایونت شماره 4", read: true },
  ]);
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let count = 0;
  notifications.map((notification) => {
    !notification.read ? count++ : (count = count);
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
      read: true,
    }));
    setNotifications(updatedNotifications);
    setNotificationsCount(0);
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
          <p onClick={markAllAsRead}>خواندن همه</p>
          <ul>
            {notifications
              .filter((notification) => showAll || !notification.read)
              .map((notification) => (
                <li
                  key={notification.id}
                  className={notification.read ? "read" : "unread"}
                  onClick={() => {
                    const updatedNotifications = notifications.map((notif) => {
                      if (notif.id === notification.id) {
                        return { ...notif, read: true };
                      }
                      return notif;
                    });
                    setNotifications(updatedNotifications);
                    count = 0;
                    updatedNotifications.map((notification) => {
                      !notification.read ? count++ : (count = count);
                    });
                    setNotificationsCount(count);
                  }}
                >
                  {notification.message}
                </li>
              ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default NotificationPanel;
