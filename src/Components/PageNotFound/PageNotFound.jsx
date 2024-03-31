import React from "react";
import Navbar from "../Navbar/navbar";
import "./PageNotFound.css";
import Lottie from "react-lottie";
import animationData from "./Animation - 1711566412254.json";
const PageNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    clickToPause: false,
    animationData: animationData,
  };
  return (
    <div className="pagenotfound">
      <Navbar />
      <div className="pagenotfound__content">
        <div className="lottie">
          <Lottie options={defaultOptions} />
        </div>
        <div className="pagenotfound__text">
          <h4>صفحه مورد نظر شما یافت نشد!</h4>
          <p>احتمالا این صفحه به آدرس دیگری تغییر کرده یا حذف شده است.</p>
          <button type="button" onClick={() => (window.location.href = "/")}>
            بازگشت به خانه
          </button>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
