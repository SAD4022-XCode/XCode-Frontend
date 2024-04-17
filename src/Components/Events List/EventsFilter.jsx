import React, { useState } from "react";
import "./EventsFilter.css";
const EventsFilter = () => {
  return (
    <center>
      <div className="event-filter">
        <div className="column">
            <div className="event-filter__date">
              <div className="row"> 
                <div className="event-filter__date-start">
                  <label>تاریخ شروع رویداد</label>
                  <input></input>
                  <i className="input-icon uil uil-calendar-alt"></i>
                </div>
                <div className="event-filter__date-end">
                  <label>تاریخ پایان رویداد</label>
                  <input></input>
                  <i className="input-icon uil uil-calendar-alt"></i>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="event-filter__category">
                <label>دسته بندی رویداد</label>
                <input></input>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__type">
                <label>نوع رویداد</label>
                <select>
                  <option value="A">همه رویدادها</option>
                  <option value="H">حضوری</option>
                  <option value="O">آنلاین</option>
                </select>
              </div>
              <div className="event-filter__price">
                <label>قیمت</label>
                <select>
                  <option value="A">همه رویدادها</option>
                  <option value="F">رایگان</option>
                  <option value="P">غیر رایگان</option>
                </select>
              </div>
            </div>
          </div>
          <button type="button">اعمال فیلتر</button>
        </div>
    </center>
  );
};

export default EventsFilter;
