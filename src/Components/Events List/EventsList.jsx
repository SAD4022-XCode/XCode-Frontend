import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import photo1 from "../../assets/events.jpg";
import photo2 from "../../assets/logo.png";
import photo3 from "../../assets/profile.png";
import photo4 from "../../assets/red pin.png";
import photo5 from "../../assets/blue pin.png";
import EventDetails from "../EventDetails/eventdetails";
import Card from "./Card";
import "./EventsList.css";
import EventsFilter from "./EventsFilter";
let EVENTS = [
  {
    id: 1,
    title: "Occupational Therapist",
    date: "2006-04-22",
    address: "Mulleriyawa",
    price: 57,
    photo: "http://dummyimage.com/191x113.png/5fa2dd/ffffff",
    category: "This World, Then the Fireworks",
  },
  {
    id: 2,
    title: "Registered Nurse",
    date: "2006-01-03",
    address: "Bánov",
    price: 33,
    photo: "http://dummyimage.com/183x128.png/5fa2dd/ffffff",
    category: "Heartbreak Hotel",
  },
  {
    id: 3,
    title: "Office Assistant I",
    date: "2008-05-10",
    address: "Sheshan",
    price: 98,
    photo: "http://dummyimage.com/116x317.png/ff4444/ffffff",
    category: "Thor: The Dark World",
  },
  {
    id: 4,
    title: "Media Manager II",
    date: "2014-02-15",
    address: "Bloomington",
    price: 80,
    photo: "http://dummyimage.com/184x120.png/cc0000/ffffff",
    category: "Silence, The (Tystnaden)",
  },
  {
    id: 5,
    title: "Nuclear Power Engineer",
    date: "2010-11-20",
    address: "Khanabad",
    price: 81,
    photo: "http://dummyimage.com/161x180.png/5fa2dd/ffffff",
    category: "Science of Sleep, The (La science des rêves)",
  },
  {
    id: 6,
    title: "Web Designer I",
    date: "2012-09-10",
    address: "San Antonio de los Baños",
    price: 88,
    photo: "http://dummyimage.com/152x109.png/ff4444/ffffff",
    category: "Shaolin Kung Fu Mystagogue (Da mo mi zong)",
  },
  {
    id: 7,
    title: "Mechanical Systems Engineer",
    date: "2003-03-28",
    address: "Novhorodka",
    price: 94,
    photo: "http://dummyimage.com/205x128.png/ff4444/ffffff",
    category: "Mirrors 2",
  },
  {
    id: 8,
    title: "Data Coordinator",
    date: "2023-03-21",
    address: "Ngetkib",
    price: 89,
    photo: "http://dummyimage.com/126x249.png/ff4444/ffffff",
    category: "Motivation, The",
  },
  {
    id: 9,
    title: "Senior Editor",
    date: "2017-01-05",
    address: "Arani",
    price: 42,
    photo: "http://dummyimage.com/150x273.png/cc0000/ffffff",
    category: "Which Way Home",
  },
  {
    id: 10,
    title: "Programmer IV",
    date: "2018-04-08",
    address: "Ngrowo",
    price: 37,
    photo: "http://dummyimage.com/195x112.png/ff4444/ffffff",
    category: "Ugly Duckling and Me!, The",
  },
  {
    id: 11,
    title: "Structural Analysis Engineer",
    date: "2012-06-29",
    address: "Visoko",
    price: 75,
    photo: "http://dummyimage.com/228x224.png/cc0000/ffffff",
    category: "To Sir with Love",
  },
  {
    id: 12,
    title: "Software Engineer IV",
    date: "2023-07-21",
    address: "Namibe",
    price: 84,
    photo: "http://dummyimage.com/157x183.png/cc0000/ffffff",
    category: "Somers Town",
  },
  {
    id: 13,
    title: "Clinical Specialist",
    date: "2017-02-25",
    address: "Loreto",
    price: 91,
    photo: "http://dummyimage.com/223x234.png/5fa2dd/ffffff",
    category: "Cazuza - O Tempo Não Pára",
  },
  {
    id: 14,
    title: "Media Manager II",
    date: "2001-01-15",
    address: "Maracanã",
    price: 49,
    photo: "http://dummyimage.com/242x287.png/cc0000/ffffff",
    category: "Lord Love a Duck",
  },
  {
    id: 15,
    title: "GIS Technical Architect",
    date: "2001-09-11",
    address: "Sariwŏn",
    price: 35,
    photo: "http://dummyimage.com/126x220.png/dddddd/000000",
    category: "Storm of the Century",
  },
  {
    id: 16,
    title: "Librarian",
    date: "2012-08-28",
    address: "Muzhijie",
    price: 99,
    photo: "http://dummyimage.com/100x144.png/5fa2dd/ffffff",
    category: "From the East (D'Est)",
  },
  {
    id: 17,
    title: "Editor",
    date: "2012-11-13",
    address: "Ulan Us",
    price: 76,
    photo: "http://dummyimage.com/160x310.png/ff4444/ffffff",
    category: "Season's Greetings",
  },
  {
    id: 18,
    title: "Web Designer III",
    date: "2020-08-03",
    address: "Lagunillas",
    price: 34,
    photo: "http://dummyimage.com/107x244.png/ff4444/ffffff",
    category: "Made in Jamaica",
  },
  {
    id: 19,
    title: "Sales Representative",
    date: "2017-09-14",
    address: "Huo’erqi",
    price: 66,
    photo: "http://dummyimage.com/216x120.png/5fa2dd/ffffff",
    category: "Obvious Child",
  },
  {
    id: 20,
    title: "Geologist III",
    date: "2019-10-19",
    address: "Taocheng",
    price: 89,
    photo: "http://dummyimage.com/156x334.png/ff4444/ffffff",
    category: "Fred: The Movie",
  },
];
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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
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
      <div className="container-fluid">
        {isLaptopOrDesktop && (
          <div className="items">
            {EVENTS.map((event) => (
              <div className="col-3 text-right justify-content-center align-items-center ">
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
        )}
      </div>
    </Card>
  );
};

export default EventsList;
