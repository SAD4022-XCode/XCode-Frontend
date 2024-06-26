import React from "react";
import { Link } from "react-router-dom";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <Link to={"/register/"}>
                <button className="btn-custom btn-lg page-scroll">
                  ثبت نام
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
