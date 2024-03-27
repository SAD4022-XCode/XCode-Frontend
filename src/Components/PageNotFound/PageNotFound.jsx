import React from "react";
import Navbar from "../Navbar/navbar";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="pagenotfound">
      <Navbar />
      <div className="pagenotfound__content">
        <div className="pagenotfound__title">
          <h1>خطای 404</h1>
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
