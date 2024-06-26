import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
export const About = (props) => {
  const isMobileDevice = useMediaQuery(
    "only screen and (min-width: 200px) and (max-width: 550px)"
  );
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-8">
            {!isMobileDevice && (
            <img src="img/event2.jpg" className="img-responsive" alt="" />)}
            {isMobileDevice && (<img src="img/event2.jpg" className="img-responsive" alt="" style={{width: "380px", margin:"0 0 20px"}}/>)}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text text-right">
              <h2>درباره ایونتیفای</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>چرا ایونتیفای</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
