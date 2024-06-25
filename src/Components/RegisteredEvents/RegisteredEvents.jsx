import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";
import animationData from "../EventDetails/Animation - 1715854965467.json";
import Lottie from "react-lottie";

import photo1 from "../../assets/events.jpg";
import Card from "../Events List/Card";
import "./RegisteredEvents.css";
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
import Navbar from "../Navbar/navbar";
import { useAuth } from "../Authentication/authProvider";
const RegisteredEvents = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultImage, setDefaultImage] = useState(photo1);
  const replaceImage = (err) => {
    err.target.src = defaultImage;
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    clickToPause: false,
    animationData: animationData,
  };
  const replaceMonthNames = (date) => {
    let shamsiStartDate = moment(date, "YYYY-MM-DD").format("jYYYY-jM-jD");
    date = shamsiStartDate;
    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    let [year, month, day] = date.split("-");
    if (day[0] == "0") {
      day = day[1];
    }
    const monthName = months[parseInt(month, 10) - 1];
    const start_date = `${day} ${monthName} ${year}`;
    return start_date;
  };
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const baseUrl = "https://eventify.liara.run/account/enrolled_events/";
      //   let queryParams = [];
      //   // console.log(data);
      //   if (data.selectedTags.length > 0)
      //     queryParams.push(`tags=${data.selectedTags.join(", ")}`);
      //   if (data.eventType !== "")
      //     queryParams.push(`attendance=${data.eventType}`);
      //   if (data.eventPrice !== "")
      //     queryParams.push(`is_paid=${data.eventPrice}`);
      //   if (data.eventStartDate !== "")
      //     queryParams.push(`starts=${data.eventStartDate}T00%3A00%3A00Z`);
      //   if (data.eventEndDate !== "")
      //     queryParams.push(`ends=${data.eventEndDate}T00%3A00%3A00Z`);

      //   queryParams.push(`page=${currentPage}`);
      //   const fullUrl = `${baseUrl}?${queryParams.join("&")}`;
      //   console.log("full url:", fullUrl);
      //   // console.log(fullUrl);
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `JWT ${auth.token}` },
      });
      // .then((response) => {
      // console.log("Data sent successfully:", response.data);
      let events = response.data.results;
      // Replace date strings with month names
      if (events) {
        events = events.map((event) => ({
          ...event,
          start_date: replaceMonthNames(event.start_date),
        }));
        setPosts(events);
      }
      // console.log(response);
      setLoading(false);
    };
    // })
    // .catch((error) => {
    //   console.error("Failed to send data:", error);
    // });
    fetchEvents();
  }, []);
  return (
    <>
      <Navbar />
      <ProfileSidebar />
      <Card className="saved-events">
        <div className="container-fluid registered-events justify-content-center align-content-center pb-5 mb-5 mr-5">
          {/* {isLaptopOrDesktop && ( */}
          <div className="items pb-5 mb-5 pt-5 mr-5">
            {loading && (
              <div className="loading">
                <Lottie options={defaultOptions} />
              </div>
            )}
            {!loading && posts.length === 0 && (
              <div className="loading">
                <h2>شما در رویدادی ثبت نام نکرده اید</h2>
              </div>
            )}
            {!loading &&
              posts.length > 0 &&
              posts.map((event) => (
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 justify-content-center align-items-center">
                  <div key={event.id} className="item mb-4">
                    <Link to={`/event-details/${event.id}`}>
                      <div className="event-img">
                        <img
                          alt={event.title}
                          src={event.photo != null ? event.photo : photo1}
                          onError={replaceImage}
                        />
                      </div>
                    </Link>

                    <div class="container">
                      <div class="row">
                        <hr className="custom-hr" />
                        <hr className="custom-hr" />
                      </div>
                    </div>

                    <Link to={`/event-details/${event.id}`}>
                      <div className="event-info">
                        <div className="event-info__title">
                          <h1 id="event-title">{event.title}</h1>
                        </div>
                        <div className="event-info__date">
                          <h4 id="event-date">تاریخ: {event.start_date}</h4>
                          <i className="input-icon uil uil-calendar-alt"></i>
                        </div>
                        <div className="event-info__address">
                          {event.attendance == "O" && (
                            <h4 id="event-address">آنلاین</h4>
                          )}
                          {event.attendance == "I" && (
                            <h4 id="event-address">{`${event.province} ${event.city}`}</h4>
                          )}
                          <i className="input-icon uil uil-location-point"></i>
                        </div>

                        <div className="event-info__category">
                          <h4 id="event-category">{event.category}</h4>
                          <i className="input-icon uil uil-apps"></i>
                        </div>
                        <div className="event-info__price">
                          {event.is_paid == true && (
                            <h5 id="event-price">{event.ticket_price} تومان</h5>
                          )}
                          {event.is_paid == false && (
                            <h5 id="event-price">رایگان</h5>
                          )}
                          <i className="input-icon uil uil-label-alt"></i>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            <br />
            <br />
          </div>
        </div>
      </Card>
    </>
  );
};

export default RegisteredEvents;
