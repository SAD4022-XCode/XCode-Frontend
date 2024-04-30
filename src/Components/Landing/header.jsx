import React from "react";

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
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <button
                  className="btn-custom btn-lg page-scroll"
                >
                  اطلاعات بیشتر
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
