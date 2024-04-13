import React from "react";

import "./Card.css";

const Card = (props) => {
  const classes = "card " + props.className;

  return (
    <center>
      <div className={classes}>{props.children}</div>
    </center>
  );
};  

export default Card;
