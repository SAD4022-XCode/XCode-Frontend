import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import "./EventsFilter.css";
import Calendar from "./Calendar";
import axios from "axios";
import MultiSelectTag from "../CreateEvent/multiSelectTag";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import moment from "moment-jalaali";
import { Controller, useForm } from "react-hook-form";
import { json } from "react-router-dom";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const EventsFilter = ({ sendFilteredPosts }) => {
  const digits = persian_fa.digits;
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [eventStartDate, setEventStartDate] = useState();
  const [eventEndDate, setEventEndDate] = useState();
  const { control } = useForm();
  const startDateHandler = (date, { input, isTyping }) => {
    if (!isTyping) {
      if (date != null) {
        for (let i = 0; i < persianNumbers.length; i++) {
          date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
        }

        date = date.replace(/\//g, "-");
      }

      return setEventStartDate(date);
    } // user selects the date from the calendar and no needs for validation.

    let value = input.value;

    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    const strings = value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;
    if (date != null) {
      for (let i = 0; i < persianNumbers.length; i++) {
        date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
      }

      date = date.replace(/\//g, "-");
    }
    setEventStartDate(date);
  };
  const endDateHandler = (date, { input, isTyping }) => {
    if (!isTyping) {
      if (date != null) {
        for (let i = 0; i < persianNumbers.length; i++) {
          date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
        }

        date = date.replace(/\//g, "-");
      }

      return setEventEndDate(date);
    } // user selects the date from the calendar and no needs for validation.

    let value = input.value;

    for (let digit of digits) {
      value = value.replace(new RegExp(digit, "g"), digits.indexOf(digit));
    }

    const strings = value.split("/");
    const numbers = strings.map(Number);
    const [year, month, day] = numbers;

    if (input.value && numbers.some((number) => isNaN(number))) {
      return false; //in case user enter something other than digits
    }

    if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
    if (day < 0 || (date && day > date.day)) return false;
    if (strings.some((val) => val.startsWith("00"))) return false;
    if (date != null) {
      for (let i = 0; i < persianNumbers.length; i++) {
        date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
      }

      date = date.replace(/\//g, "-");
    }
    setEventEndDate(date);
  };
  const [eventCategory, setEventCategory] = useState("A");
  const [eventType, setEventType] = useState("A");
  const [eventPrice, setEventPrice] = useState("A");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleEventCategory = (e) => {
    setEventCategory(selectedTags);
  };

  const handleEventType = (e) => {
    setEventType(e.target.value);
  };

  const handleEventPrice = (e) => {
    setEventPrice(e.target.value);
  };
  useEffect(() => {
    let convertedTags = selectedTags.map((tag) => tag.value);
    let miladiStartDate;
    if (eventStartDate != null) {
      miladiStartDate = moment(eventStartDate, "jYYYY-jM-jD").format(
        "YYYY-MM-DD"
      );
    }
    let miladiEndDate;
    if (eventEndDate != null) {
      miladiEndDate = moment(eventEndDate, "jYYYY-jM-jD").format("YYYY-MM-DD");
    }
    let data = {
      eventPrice: eventPrice,
      eventType: eventType,
      eventStartDate: miladiStartDate,
      eventEndDate: miladiEndDate,
      selectedTags: convertedTags,
    };

    const getData = setTimeout(() => {
      sendFilteredPosts(data);
      // console.log(data);
    }, 800);
    return () => clearTimeout(getData);
  }, [eventPrice, eventType, eventStartDate, eventEndDate, selectedTags]);
  // const debouncedSendData = useCallback(
  //   debounce((data) => {
  //     axios
  //       .post("https://api.yourbackend.com/events", data)
  //       .then((response) => {
  //         console.log("Data sent successfully:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Failed to send data:", error);
  //       });
  //   }, 500),
  //   []
  // ); // 500ms delay; // 500ms delay
  // axios.defaults.headers.common["X-Jsio-Token"] =
  //   "69b3f5f4d98b76f3d1337f262baeefbf";
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(`https://api.jsonserver.io/events`);
  //       setFilteredPosts(response.data);
  //       setLoading(false);
  //       sendFilteredPosts(filteredPosts);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchEvents();
  // }, []);
  // useEffect(() => {
  //   return () => {
  //     debouncedSendData.cancel();
  //   };
  // }, []);
  return (
    <center>
      <div className="event-filter">
        <div className="column">
          <div className="col-7">
            <div className="event-filter__category">
              <label>دسته بندی رویداد</label>
              <MultiSelectTag
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onChange={handleEventCategory}
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
              <div className="event-filter__type ">
                <label>نوع رویداد</label>
                <select onChange={handleEventType}>
                  <option value="">همه رویدادها</option>
                  <option value="I">حضوری</option>
                  <option value="O">آنلاین</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__price">
                <label>قیمت</label>
                <select onChange={handleEventPrice}>
                  <option value="">همه رویدادها</option>
                  <option value="False">رایگان</option>
                  <option value="True">غیر رایگان</option>
                </select>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__date-start">
                <label>تاریخ شروع رویداد</label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }} //optional
                  render={({
                    field: { onChange, name, value },
                    formState: { errors }, //optional, but necessary if you want to show an error message
                  }) => (
                    <>
                      <DatePicker
                        weekDays={weekDays}
                        className="bg-light"
                        animations={[
                          transition({
                            from: 35,
                            transition:
                              "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                          }),
                        ]}
                        minDate="1300/01/01"
                        maxDate="1403/07/31"
                        value={eventStartDate || ""}
                        onChange={startDateHandler}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      {errors &&
                        errors[name] &&
                        errors[name].type === "required" && (
                          //if you want to show an error message
                          <span>تاریخ وارد شده مشکل دارد</span>
                        )}
                    </>
                  )}
                />
                <i className="input-icon uil uil-calendar-alt"></i>
              </div>
            </div>
            <div className="col-3">
              <div className="event-filter__date-end">
                <label>تاریخ پایان رویداد</label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: true }} //optional
                  render={({
                    field: { onChange, name, value },
                    formState: { errors }, //optional, but necessary if you want to show an error message
                  }) => (
                    <>
                      <DatePicker
                        weekDays={weekDays}
                        className="bg-light"
                        animations={[
                          transition({
                            from: 35,
                            transition:
                              "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                          }),
                        ]}
                        minDate="1300/01/01"
                        maxDate="1403/03/01"
                        value={eventEndDate || ""}
                        onChange={endDateHandler}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                      />
                      {errors &&
                        errors[name] &&
                        errors[name].type === "required" && (
                          //if you want to show an error message
                          <span>تاریخ وارد شده مشکل دارد</span>
                        )}
                    </>
                  )}
                />
                <i className="input-icon uil uil-calendar-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  );
};

export default EventsFilter;
