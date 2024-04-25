import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./EventsFilter.css";
import Calendar from "./Calendar";
import AxiosInstance from "./Axios";
import MultiSelectTag from "../CreateEvent/multiSelectTag";
const EventsFilter = () => {
  const [eventCategory, setEventCategory] = useState("A");
  const [eventType, setEventType] = useState("A");
  const [eventPrice, setEventPrice] = useState("A");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const isMobileDevice = useMediaQuery({
    query: "(min-device-width: 300px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(min-device-width: 730px)",
  });
  const isMiddleDevice1 = useMediaQuery({
    query: "(min-device-width: 1100px)",
  });
  const isLaptopOrDesktop = useMediaQuery({
    query: "(min-device-width: 1350px)",
  });

  const handleEventStartDate = (e) => {
    setEventStartDate(e);
  };
  const handleEventEndDate = (e) => {
    setEventEndDate(e);
  };
  const handleEventCategory = (e) => {
    setEventCategory(e.target.value);
  };
  const handleEventType = (e) => {
    setEventType(e.target.value);
  };
  const handleEventPrice = (e) => {
    setEventPrice(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    AxiosInstance.patch(`http://127.0.0.1:8000/account/me/`, {
      eventCategory: eventCategory,
      eventType: eventType,
      eventPrice: eventPrice,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
    });
  };
  return (
    <center>
      <form className="event-filter" onSubmit={submitHandler}>
        <div className="column">
          <div className="col-7">
            <div className="event-filter__category">
              <label>دسته بندی رویداد</label>
              <MultiSelectTag
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
              {/* <select onChange={handleEventCategory}>
                <option value="A">همه دسته بندی ها</option>
                <option value="management">مدیریت</option>
                <option value="business">کسب و کار</option>
                <option value="entrepreneurship">کارآفرینی</option>
                <option value="financial">مالی</option>
                <option value="technical">فنی، مهندسی و صنعت</option>
                <option value="technology">تکنولوژی</option>
                <option value="personal_development_and_family">
                  توسعه فردی و خانواده
                </option>
                <option value="educational">تحصیلی</option>
                <option value="humanities">علوم انسانی</option>
                <option value="medical">پزشکی</option>
                <option value="cultural_artistic">فرهنگی هنری</option>
                <option value="basic_sciences">علوم پایه</option>
                <option value="tourism">گردشگری</option>
                <option value="entertainment">سرگرمی</option>
                <option value="sports">ورزشی'</option>
                <option value="religious_and_social">مذهبی و مناسبتی</option>
                <option value="other">غیره</option>
              </select> */}
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="event-filter__type">
                <label>نوع رویداد</label>
                <select onChange={handleEventType}>
                  <option value="A">همه رویدادها</option>
                  <option value="H">حضوری</option>
                  <option value="O">آنلاین</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__price">
                <label>قیمت</label>
                <select onChange={handleEventPrice}>
                  <option value="A">همه رویدادها</option>
                  <option value="F">رایگان</option>
                  <option value="P">غیر رایگان</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__date-start">
                <label>تاریخ شروع رویداد</label>
                <Calendar sendDataToParent1={handleEventStartDate} />
                <i className="input-icon uil uil-calendar-alt"></i>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__date-end">
                <label>تاریخ پایان رویداد</label>
                <Calendar sendDataToParent2={handleEventEndDate} />
                <i className="input-icon uil uil-calendar-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </form>
    </center>
  );
};

export default EventsFilter;
