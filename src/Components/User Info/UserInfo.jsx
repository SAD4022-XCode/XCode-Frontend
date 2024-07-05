import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import Navbar from "../Navbar/navbar";
import CityList from "../CreateEvent/cityList";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { Controller, useForm } from "react-hook-form";
import { useFormik } from "formik";
import { userInfoValidation } from "./UserInfoValidation";
import ChangePassword from "./ChangePassword";
import AxiosInstance from "./Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Authentication/authProvider";
import {useNavigate} from 'react-router-dom';
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const UserInfo = () => {
  const navigator = useNavigate();
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
  const auth = useAuth();
  const [dateValue, setValue] = useState();
  const { control } = useForm();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  // let userData = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || "");

  const handleSelectedGender = (e) => {
    setSelectedGender(e.target.value);
    console.log(JSON.parse(localStorage.getItem("userData")));
  };
  const initialValues = {
    username: userData.user.username,
  };
  const dateHandler = (date, { input, isTyping }) => {
    if (!isTyping) {
      if (date != null) {
        for (let i = 0; i < persianNumbers.length; i++) {
          date = date.toString().replace(persianNumbers[i], arabicNumbers[i]);
        }

        date = date.replace(/\//g, "-");
      }
      return setValue(date);
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
    setValue(date);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userInfoValidation,
    onSubmit: async (values) => {
      let formData = new FormData();
      let formData1 = new FormData();
      formData1.append("user[username]", values.username);
      formData.append("gender", selectedGender);
      formData.append("city", selectedCity);
      formData.append("province", selectedProvince);
      formData.append("birth_date", dateValue);
      formData.append("profile_picture", file);
      console.log(localStorage.getItem("userData"));
      try {
        await AxiosInstance.patch(
          `https://eventify.liara.run/account/me/`,
          formData1,
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `JWT ${auth.token}`,
            },
          }
        );

        await AxiosInstance.patch(
          `https://eventify.liara.run/account/me/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `JWT ${auth.token}`,
            },
          }
        ).then(response => {
          toast.success("اطلاعات شما با موفقیت تغییر یافت");
          setTimeout(() => {
          navigator('/home');
          }, 6500)});

        // If both requests succeed, show toast and reload page
      } catch (error) {
        // Handle errors if any of the requests fail
        //toast.error("An error occurred while updating your information.");
        toast.error("خطا در بروزرسانی اطلاعات");
        // console.error("Error updating information:", error);
      }
    },
  });

  useEffect(() => {
    // userData = JSON.parse(localStorage.getItem("userData"));
    setUserData(JSON.parse(localStorage.getItem("userData")) || "");
    if (userData) {
      setSelectedGender(userData.gender);
      setValue(userData.birth_date);
      setSelectedProvince(userData.province);
      setSelectedCity(userData.city);
    }
    if (userData.profile_picture != null) {
      setImagePreviewUrl(userData.profile_picture);
    }
  }, [auth.token]);

  const ImgUpload = ({ onChange, src }) => (
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img htmlFor="photo-upload" src={src} alt="Uploaded" />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>
  );
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <center>
      <Navbar />
      <ProfileSidebar/>
      <div className="user-info">
        {/* <ToastContainer closeOnClick
          className="toastify-container"
          position="top-right"
          toastStyle={{
            backgroundColor: "#2b2c38",
            fontFamily: "iransansweb",
            color: "#ffeba7",
          }}
          pauseOnHover={false}
          autoClose={3000}
        /> */}
        <form className="userinfo" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="section">
                <div className="card-3d-wrap-ce">
                  <div className="card-back ">
                    <div className="center-wrap">
                      <div className="section">
                        <div className="userinfo__title">
                          <h2 className="mb-4 pb-3">مشخصات فردی</h2>
                          <h4>
                            در این قسمت می‌توانید مشخصات فردی خود را مشاهده و
                            تغییر دهید
                          </h4>
                        </div>
                        <div className="userinfo__content">
                          <div className="row">
                            <div className="column   col-md-12 col-lg-7 mb-lg-5">
                              <div className="userinfo__content__username">
                                <div className="col-10 text-right ">
                                  <label>تغییر نام کاربری</label>
                                  <div className={`form-group mt-1`}>
                                    <input
                                      id="username"
                                      className={
                                        errors.username ? "input-error" : ""
                                      }
                                      type="text"
                                      placeholder="نام کاربری جدید"
                                      value={
                                        values.username.length > 0
                                          ? values.username
                                          : ""
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                    {errors.username && (
                                      <p className="error">{errors.username}</p>
                                    )}
                                    <i className="input-icon uil uil-user"></i>
                                  </div>
                                </div>
                              </div>

                              <div className="userinfo__content__gender">
                                <div className="col-10 text-right">
                                  <label>جنسیت</label>
                                  <div className={`form-group mt-1`}>
                                    <select
                                      value={selectedGender}
                                      onChange={handleSelectedGender}
                                    >
                                      <option selected>انتخاب کنید</option>
                                      <option value="M">مرد</option>
                                      <option value="F">زن</option>
                                      <option value="X">
                                        مایل نیستم بگویم
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="userinfo__content__birthdate">
                                <div className="col-10 text-right">
                                  <label>تاریخ تولد</label>
                                  <div className={`form-group mt-1`}>
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
                                            className="bg-dark"
                                            animations={[
                                              transition({
                                                from: 35,
                                                transition:
                                                  "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                              }),
                                            ]}
                                            minDate="1300/01/01"
                                            maxDate="1403/04/15"
                                            value={dateValue || ""}
                                            onChange={dateHandler}
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                          />
                                          {errors &&
                                            errors[name] &&
                                            errors[name].type ===
                                              "required" && (
                                              //if you want to show an error message
                                              <span>
                                                تاریخ وارد شده مشکل دارد
                                              </span>
                                            )}
                                        </>
                                      )}
                                    />
                                    <i className="input-icon uil uil-calendar-alt"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="column   col-md-8 pull-left col-lg-5">
                              <div className="userinfo__content__profile">
                                <div>
                                  {
                                    <ImgUpload
                                      onChange={photoUpload}
                                      src={imagePreviewUrl}
                                    />
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="userinfo__content__city">
                            <div className="col-lg-10 col-md-10 text-right">
                              <div className="text-right mt-2">
                                <CityList
                                  selectedProvince={selectedProvince}
                                  setSelectedProvince={setSelectedProvince}
                                  selectedCity={selectedCity}
                                  setSelectedCity={setSelectedCity}
                                />
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <br></br>

                          <button type="submit">ذخیره تغییرات</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <ChangePassword />
      </div>
    </center>
  );
};

export default UserInfo;
