import React, { useState } from "react";
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
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const UserInfo = () => {
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

  const [dateValue, setValue] = useState();
  const { control } = useForm();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const handleSelectedGender = (e) => {
    setSelectedGender(e.target.value);
  };
  const initialValues = {
    username: "",
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
    onSubmit: (values) => {
      //let form_data = new FormData();
      //form_data.append("{user", `:{'username': ${values.username}}}`)
      //form_data.append("gender", selectedGender);
      //form_data.append("city", selectedCity);
      //form_data.append("province", selectedProvince);
      //form_data.append("birth_date", dateValue);
      //form_data.append("profile_picture", file);
      AxiosInstance.patch(
        `https://eventify.liara.run/account/me/`,
        {
          //form_data
          user: {
            username: values.username,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      AxiosInstance.patch(
        `https://eventify.liara.run/account/me/`,
        {
          user: {
            username: values.username,
          },
          gender: selectedGender,
          city: selectedCity,
          province: selectedProvince,
          birth_date: dateValue,

          profile_picture: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log(form_data);
      //console.log(values);
      //console.log(dateValue);
      //console.log(selectedGender);
      //console.log(selectedProvince);
      //console.log(selectedCity);
      //console.log({file});
      //console.log(imagePreviewUrl);
      //console.log(form_data["gender"])
      toast.success("اطلاعات شما با موفقیت تغییر یافت");
    },
  });

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
      <div className="user-info">
        <ToastContainer
          className="toastify-container"
          position="top-right"
          toastStyle={{
            backgroundColor: "#2b2c38",
            fontFamily: "iransansweb",
            color: "#ffeba7",
          }}
          pauseOnHover={false}
          autoClose={3000}
        />
        <form className="userinfo" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="section">
                <div className="card-3d-wrap-ce" style={{ height: "850px" }}>
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
                          <div className="row gutter-normal mode-float">
                            <div className="column   column-md-20">
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
                                      value={values.username}
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
                                            maxDate="1403/01/30"
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
                            <div className="column   column-md-4 pull-left">
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
                            <div className="col-10 text-right">
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

                          <button disabled={isSubmitting} type="submit">
                            ذخیره تغییرات
                          </button>
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
