import React from "react";
import { Icon } from "react-materialize";
import photo1 from "../../assets/events.jpg";
import photo2 from "../../assets/logo.png";
import photo3 from "../../assets/profile.png";
import photo4 from "../../assets/red pin.png";
import photo5 from "../../assets/blue pin.png";
import "./EventsList.css";
const EVENTS = [
  {
    id: 1,
    title: "ایونت خوب",
    date: "1403-01-28",
    address: "تهران",
    price: "50 هزار تومن",
    photo: photo1,
  },
  {
    id: 2,
    title: "ایونت بد",
    date: "1403-02-04",
    address: "تهران",
    price: "90 هزار تومن",
    photo: photo2,
  },
  {
    id: 3,
    title: "ایونت 3",
    date: "1403-01-26",
    address: "اهواز",
    price: "10 هزار تومن",
    photo: photo3,
  },
  {
    id: 4,
    title: "ایونت مسخره",
    date: "1403-01-30",
    address: "مشهد",
    price: "70 هزار تومن",
    photo: photo4,
  },
  {
    id: 5,
    title: "ایونت مسخره",
    date: "1403-01-29",
    address: "گیلان",
    price: "70 هزار تومن",
    photo: photo5,
  },
];
const EventsList = () => {
  return (
    <div className="items">
      {EVENTS.map((event) => (
        <div key={event.id} className="item">
          <div className="event-img">
            <img alt={event.title} src={event.photo} />
          </div>
          <div className="event-details">
            <h1 id="event-title">{event.title}</h1>
            <h4 id="event-address">{event.address}</h4>
          </div>

          <div className="price-add">
            <h5 id="event-price">${event.price}</h5>
            <Icon small id="add-icon">
              add_shopping_cart
            </Icon>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
