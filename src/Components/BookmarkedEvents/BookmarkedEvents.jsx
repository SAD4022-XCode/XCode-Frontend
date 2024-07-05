import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";
import animationData from "../EventDetails/Animation - 1715854965467.json";
import Lottie from "react-lottie";

import photo1 from "../../assets/events.jpg";
import Card from "../Events List/Card";
import "./BookmarkedEvents.css";
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
import Navbar from "../Navbar/navbar";
import { useAuth } from "../Authentication/authProvider";
const BookmarkedEvents = () => {
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
      try{
      setLoading(true);

      const baseUrl = "https://eventify.liara.run/account/bookmarked_events/";
      
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `JWT ${auth.token}` },
      });
      let events = response.data;
      // Replace date strings with month names
      if (events) {
        events = events.map((event) => ({
          ...event,
          start_date: replaceMonthNames(event.start_date),
        }));
        setPosts(events);
      }
      setLoading(false);
    }
    catch (error) {
      
    }
  }

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
      <Card className="bookmarked-events">
        <div className="container-fluid bookmarked-events-container justify-content-center align-content-center pb-5 mb-5 mr-5">
          {/* {isLaptopOrDesktop && ( */}
          <div className="items pb-5 mb-5 pt-5 mr-5">
            {loading && (
              <div className="loading">
                <Lottie options={defaultOptions} />
              </div>
            )}
            {!loading && posts.length === 0 && (
              <div className="loading">
                <h2>شما رویدادی ذخیره نکرده اید</h2>
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

export default BookmarkedEvents;
