import React, { useState, useEffect } from "react";
import { Icon } from "react-materialize";
import photo1 from "../../assets/events.jpg";
import photo2 from "../../assets/logo.png";
import photo3 from "../../assets/profile.png";
import photo4 from "../../assets/red pin.png";
import photo5 from "../../assets/blue pin.png";
import EventDate from "./EventDate";
import Card from "./Card";
import "./EventsList.css";
import EventsFilter from "./EventsFilter";
let EVENTS = [
  {
    id: 1,
    title: "ایونت 1",
    date: "1403-01-28",
    address: "تهران",
    price: "50 هزار تومن",
    photo: photo1,
  },
  {
    id: 2,
    title: "ایونت 2",
    date: "1403-02-04",
    address: "تهران",
    price: "90 هزار تومن",
    photo: photo1,
  },
  {
    id: 3,
    title: "ایونت 3",
    date: "1403-01-26",
    address: "اهواز",
    price: "10 هزار تومن",
    photo: photo1,
  },
  {
    id: 4,
    title: "ایونت 4",
    date: "1403-01-30",
    address: "مشهد",
    price: "70 هزار تومن",
    photo: photo1,
  },
  {
    id: 5,
    title: "ایونت 5",
    date: "1403-01-29",
    address: "گیلان",
    price: "70 هزار تومن",
    photo: photo1,
  },
];
function replaceMonthNames(dateString) {
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

  let [year, month, day] = dateString.split("-");
  if (day[0] == "0") {
    day = day[1];
  }
  const monthName = months[parseInt(month, 10) - 1];
  return `${day} ${monthName} ${year}`;
}

// Replace date strings with month names
EVENTS = EVENTS.map((event) => ({
  ...event,
  date: replaceMonthNames(event.date),
}));

const EventsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <Card className="events-list">
      <EventsFilter />
      <div className="items">
        {console.log(EVENTS)}
        {EVENTS.map((event) => (
          <div className="col-3 text-right ">
            <div key={event.id} className="item">
              <div className="event-img">
                <img alt={event.title} src={event.photo} />
              </div>
              <div class="container">
                <div class="row">
                  <hr className="custom-hr" />
                  <hr className="custom-hr" />
                </div>
              </div>
              <div className="event-details">
                <h1 id="event-title">{event.title}</h1>
                <h4 id="event-date">تاریخ: {event.date}</h4>
                <h4 id="event-address">{event.address}</h4>
              </div>
              <div className="event-price">
                <h5 id="event-price">{event.price}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EventsList;
