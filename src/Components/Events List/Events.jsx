import React from "react";
import EventsList from "./EventsList";
import Card from "./Card";
const Events = () => {
  return (
    <Card className="events">
      <div className="items-wrapper">
        <div className="items-title">
          <h4>All Items</h4>
        </div>
        <EventsList />
      </div>
    </Card>
  );
};

export default Events;
