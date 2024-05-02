import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import photo1 from "../../assets/events.jpg";
import photo2 from "../../assets/logo.png";
import photo3 from "../../assets/profile.png";
import photo4 from "../../assets/red pin.png";
import photo5 from "../../assets/blue pin.png";
import EventDetails from "../EventDetails/eventdetails";
import Card from "./Card";
import "./EventsList.css";
import EventsFilter from "./EventsFilter";

// function replaceMonthNames(dateString) {
//   const months = [
//     "فروردین",
//     "اردیبهشت",
//     "خرداد",
//     "تیر",
//     "مرداد",
//     "شهریور",
//     "مهر",
//     "آبان",
//     "آذر",
//     "دی",
//     "بهمن",
//     "اسفند",
//   ];

//   let [year, month, day] = dateString.split("-");
//   if (day[0] == "0") {
//     day = day[1];
//   }
//   const monthName = months[parseInt(month, 10) - 1];
//   return `${day} ${monthName} ${year}`;
// }

// // Replace date strings with month names
// EVENTS = EVENTS.map((event) => ({
//   ...event,
//   date: replaceMonthNames(event.date),
// }));

const EventsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const isMobileDevice = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 730px)"
  );

  const isTabletDevice = useMediaQuery(
    "only screen and (min-width: 730px) and (max-width: 1100px)"
  );
  const isMiddleDevice1 = useMediaQuery(
    "only screen and (min-width: 1100px) and (max-width: 1360px)"
  );
  const isLaptopOrDesktop = useMediaQuery(
    "only screen and (min-width: 1350px) and (max-width: 1800px)"
  );
  const handleFilteredPosts = (data) => {
    setPosts(data);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://eventify.liara.run/events/?page=${currentPage}`
        );
        console.log(response.data);
        // setPosts(response.data);
        setTotalPages(response.data.count);
        setPosts(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [currentPage]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentEvents = posts.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    setLoading(true);
  };
  return (
    <Card className="events-list">
      <EventsFilter sendFilteredPosts={handleFilteredPosts} />
      <div className="container-fluid justify-content-center align-content-center pb-5 mb-5">
        {/* {isLaptopOrDesktop && ( */}
        <div className="items pb-5 mb-5 pt-5">
          {loading && (
            <div className="loading">
              <h2>Loading...</h2>
            </div>
          )}
          {posts.map(
            (event) =>
              !loading && (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 justify-content-center align-items-center">
                  <div key={event.id} className="item mb-4">
                    <Link to={`/event-details/${event.id}`}>
                      <div className="event-img">
                        <img alt={event.title} src={event.photo} />
                      </div>
                      <div class="container">
                        <div class="row">
                          <hr className="custom-hr" />
                          <hr className="custom-hr" />
                        </div>
                      </div>
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
                            <h5 id="event-price">{event.ticket_price}</h5>
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
              )
          )}
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalPages / postsPerPage)}
              color="primary"
              onChange={handleChangePage}
            />
          </Stack>
          <br />
          <br />
        </div>
        {/* )}
        {isMiddleDevice1 && (
          <div className="items">
            {EVENTS.map((event) => (
              <div className="col-4 text-right justify-content-center align-items-center ">
                <div key={event.id} className="item">
                  <Link to={`/event-details/${event.id}`}>
                    <div className="event-img">
                      <img alt={event.title} src={event.photo} />
                    </div>
                    <div class="container">
                      <div class="row">
                        <hr className="custom-hr" />
                        <hr className="custom-hr" />
                      </div>
                    </div>
                    <div className="event-info">
                      <div className="event-info__title">
                        <h1 id="event-title">{event.title}</h1>
                      </div>
                      <div className="event-info__date">
                        <h4 id="event-date">تاریخ: {event.date}</h4>
                        <i className="input-icon uil uil-calendar-alt"></i>
                      </div>
                      <div className="event-info__address">
                        <h4 id="event-address">{event.address}</h4>
                        <i className="input-icon uil uil-location-point"></i>
                      </div>
                      <div className="event-info__category">
                        <h4 id="event-category">{event.category}</h4>
                        <i className="input-icon uil uil-apps"></i>
                      </div>
                      <div className="event-info__price">
                        <h5 id="event-price">{event.price}</h5>
                        <i className="input-icon uil uil-label-alt"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {isTabletDevice && (
          <div className="items">
            {EVENTS.map((event) => (
              <div className="col-6 text-right justify-content-center align-items-center  ">
                <div key={event.id} className="item">
                  <Link to={`/event-details/${event.id}`}>
                    <div className="event-img">
                      <img alt={event.title} src={event.photo} />
                    </div>
                    <div class="container">
                      <div class="row">
                        <hr className="custom-hr" />
                        <hr className="custom-hr" />
                      </div>
                    </div>
                    <div className="event-info">
                      <div className="event-info__title">
                        <h1 id="event-title">{event.title}</h1>
                      </div>
                      <div className="event-info__date">
                        <h4 id="event-date">تاریخ: {event.date}</h4>
                        <i className="input-icon uil uil-calendar-alt"></i>
                      </div>
                      <div className="event-info__address">
                        <h4 id="event-address">{event.address}</h4>
                        <i className="input-icon uil uil-location-point"></i>
                      </div>
                      <div className="event-info__category">
                        <h4 id="event-category">{event.category}</h4>
                        <i className="input-icon uil uil-apps"></i>
                      </div>
                      <div className="event-info__price">
                        <h5 id="event-price">{event.price}</h5>
                        <i className="input-icon uil uil-label-alt"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {isMobileDevice && (
          <div className="items">
            {EVENTS.map((event) => (
              <div className="col-12 text-right justify-content-center align-items-center  ">
                <div key={event.id} className="item">
                  <Link to={`/event-details/${event.id}`}>
                    <div className="event-img">
                      <img alt={event.title} src={event.photo} />
                    </div>
                    <div class="container">
                      <div class="row">
                        <hr className="custom-hr" />
                        <hr className="custom-hr" />
                      </div>
                    </div>
                    <div className="event-info">
                      <div className="event-info__title">
                        <h1 id="event-title">{event.title}</h1>
                      </div>
                      <div className="event-info__date">
                        <h4 id="event-date">تاریخ: {event.date}</h4>
                        <i className="input-icon uil uil-calendar-alt"></i>
                      </div>
                      <div className="event-info__address">
                        <h4 id="event-address">{event.address}</h4>
                        <i className="input-icon uil uil-location-point"></i>
                      </div>
                      <div className="event-info__category">
                        <h4 id="event-category">{event.category}</h4>
                        <i className="input-icon uil uil-apps"></i>
                      </div>
                      <div className="event-info__price">
                        <h5 id="event-price">{event.price}</h5>
                        <i className="input-icon uil uil-label-alt"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </Card>
  );
};

export default EventsList;
