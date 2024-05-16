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
import { Alert } from 'react-alert'
import {useNavigate} from 'react-router-dom';

const EventsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  
  // bookmark items
  let userData = JSON.parse(localStorage.getItem("userData"));
//   const [isBookmarked, setBookmark] = useState(false);
  const navigator=useNavigate();
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});

  const [data, setData] = useState({
    eventPrice: "",
    eventType: "",
    eventStartDate: "",
    eventEndDate: "",
    selectedTags: "",
  });
  const [defaultImage, setDefaultImage] = useState(photo1);
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
  const replaceImage = (err) => {
    err.target.src = defaultImage;
  };
  const handleFilteredPosts = (response) => {
    setData(response);
  };
  const replaceMonthNames = (date) => {
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
      // if (
      //   data ==
      //   {
      //     eventPrice: "",
      //     eventType: "",
      //     eventStartDate: "",
      //     eventEndDate: "",
      //     selectedTags: "",
      //   }
      // ) {
      //   const response = await axios.get(
      //     `https://eventify.liara.run/events/?page=${currentPage}`
      //   );
      //   console.log(response.data);
      //   // setPosts(response.data);
      //   setTotalPages(response.data.count);
      //   setPosts(response.data.results);
      //   setLoading(false);
      // } else {
      const baseUrl = "https://eventify.liara.run/events";
      let queryParams = [];
      // console.log(data);
      if (data.selectedTags.length > 0)
        queryParams.push(`tags=${(data.selectedTags)}`);
      if (data.eventType !== "")
        queryParams.push(`attendance=${data.eventType}`);
      if (data.eventPrice !== "")
        queryParams.push(`is_paid=${data.eventPrice}`);
      if (data.eventStartDate !== "")
        queryParams.push(`starts=${data.eventStartDate}T00%3A00%3A00Z`);
      if (data.eventEndDate !== "")
        queryParams.push(`ends=${data.eventEndDate}T00%3A00%3A00Z`);

      queryParams.push(`page=${currentPage}`);
      const fullUrl = `${baseUrl}?${queryParams.join("&")}`;
      console.log(fullUrl)
      // console.log(fullUrl);
      const response = await axios.get(fullUrl);
      // .then((response) => {
      // console.log("Data sent successfully:", response.data);
      setTotalPages(response.data.count);
      let events = response.data.results;
      // Replace date strings with month names
      events = events.map((event) => ({
        ...event,
        start_date: replaceMonthNames(event.start_date),
      }));
      setPosts(events);
      // console.log(response);
      setLoading(false);
    };
    // })
    // .catch((error) => {
    //   console.error("Failed to send data:", error);
    // });
    fetchEvents();
  }, [currentPage, data]);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    setLoading(true);
  };

  const is_bookmarked = (event_id) =>{
    if (event_id in bookmarkedEvents){
        return bookmarkedEvents[event_id];
    }
    else{
        return false
    }
  }

  const bookmarkToggler = (event_id) =>{
    if (userData == null){
        if (event_id in bookmarkedEvents){
            setBookmarkedEvents(!bookmarkedEvents[event_id]);
            console.log('event reversed')
        }
        else{
            setBookmarkedEvents[event_id] = true;
            console.log(bookmarkedEvents);
            console.log(event_id in bookmarkedEvents);
            console.log('event activated');
        }

        }
    else{
        // alert('برای افزودن به علاقه مندی ها باید وارد سیستم شوید!');
        // navigator('/login');
    }
}

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
                          <a class={is_bookmarked(event.id) ? 'bi bi-bookmark-plus-fill': 'bi bi-bookmark-plus'} 
                                    onClick={() => bookmarkToggler(event.id)}></a>
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
