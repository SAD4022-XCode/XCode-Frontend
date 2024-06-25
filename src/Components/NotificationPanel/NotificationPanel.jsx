import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import { Modal } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "./Animation - 1715616866327.json";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import moment from "moment-timezone";
import axios from "axios";

import { useAuth } from "../Authentication/authProvider";
import "./NotificationPanel.css";
// [{
//   id: 1,
//   recipient: "",
//   title: "ایونت شماره 1 ایجاد شد",
//   content: "ایونت شماره 1",
//   created_at: "2024-05-28T16:54:37.465Z",
//   is_read: false,
// },
// {
//   id: 2,
//   recipient: "",
//   title: "ایونت شماره 2 ایجاد شد",
//   content: "ایونت شماره 2",
//   created_at: "2024-05-28T16:54:37.465Z",
//   is_read: false,
// },
// {
//   id: 3,
//   recipient: "",
//   title: "ایونت شماره 3 ایجاد شد",
//   content: "ایونت شماره 3",
//   created_at: "2024-05-28T16:54:37.465Z",
//   is_read: true,
// },
// {
//   id: 4,
//   recipient: "",
//   title: "ایونت شماره 4 ایجاد شد",
//   content: "ایونت شماره 4",
//   created_at: "2024-05-28T16:54:37.465Z",
//   is_read: true,
// },]
const NotificationPanel = (reload) => {
  const auth = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const updateNotificationCount = (notifications) => {
    let count = 0;
    notifications.map((notification) => {
      !notification.is_read ? count++ : (count = count);
    });
    return count;
  };
  // axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://eventify.liara.run/account/inbox/",
        {
          headers: {
            Authorization: `JWT ${auth.token}`,
          },
        }
      );
      console.log(response);
      // setNotifications(response.data);
      // setTimeout(()=> {
      // setNotificationsCount(updateNotificationCount(notifications));
      // },1000);
      // console.log(notificationsCount);
      const sortedNotifications = response.data.sort((a, b) => {
        if (a.is_read === b.is_read) {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return a.is_read - b.is_read;
      });

      setNotifications(sortedNotifications);
      setNotificationsCount(updateNotificationCount(sortedNotifications));
    };
    fetchData();
  }, [reload, notificationsCount, auth.token]);

  const readNotification = async (id) => {
    const baseUrl = `https://eventify.liara.run/notifications/${id}/mark_as_read/`;
    axios.defaults.headers.common["Authorization"] = `JWT ${auth.token}`;
    await axios.patch(baseUrl).then(() => {
      setNotificationsCount(updateNotificationCount(notifications));
    });
    setTimeout(() => {
      reload = false;
    }, 400);
  };
  delete axios.defaults.headers.common["Authorization"];
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    for (const notification of updatedNotifications) {
      readNotification(notification.id);
    }
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
          {notifications.length > 0 ? (
            <>
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
                  .map((notification, index, self) => {
                    const isLastUnread =
                      index < self.length - 1 &&
                      !notification.is_read &&
                      self[index + 1].is_read;
                    return (
                      <React.Fragment key={notification.id}>
                        <li
                          className={
                            notification.is_read ? "is_read" : "unread"
                          }
                          onClick={() => {
                            const updatedNotifications = notifications.map(
                              (notif) => {
                                if (notif.id === notification.id) {
                                  readNotification(notif.id);
                                  return { ...notif, is_read: true };
                                }
                                return notif;
                              }
                            );
                            setNotifications(updatedNotifications);
                            setNotificationsCount(
                              updateNotificationCount(updatedNotifications)
                            );
                          }}
                        >
                          <div className="title">
                            {!notification.is_read && (
                              <span className="blue-bullet"></span>
                            )}
                            <p id="notification-title">{notification.title}</p>
                          </div>
                          <div className="content">
                            <p id="notification-content">
                              {notification.content}
                            </p>
                            <p id="notification-time">
                              {translateTime(notification.created_at)}
                            </p>
                          </div>
                        </li>
                        {isLastUnread && (
                          <div class="container">
                            <div class="row">
                              <hr className="custom-hr" />
                              <hr className="custom-hr" />
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </ul>
            </>
          ) : (
            <p>در حال حاضر پیامی ندارید</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NotificationPanel;
