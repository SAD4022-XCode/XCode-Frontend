import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

export const Image = ({ title, largeImage, smallImage }) => {
  const isMobileDevice = useMediaQuery(
    "only screen and (min-width: 200px) and (max-width: 550px)"
  );
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        {" "}
        <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          {!isMobileDevice && (
            <img src={smallImage} className="img-responsive" alt={title} />
          )}
          {isMobileDevice && (
            <img
              src={smallImage}
              className="img-responsive"
              alt={title}
              style={{ width: "380px" }}
            />
          )}
        </a>{" "}
      </div>
    </div>
  );
};
