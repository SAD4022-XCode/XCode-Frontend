import React, { useState, useEffect } from "react";
import "./registerEvent.css";

import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/navbar";

const RegisterEvent = () =>{

    return(
        <>
        <Navbar/>
        <div className="registerEvent">
        
            <div className="main">

            <div className="container">
                <form method="POST" className="appointment-form " id="appointment-form">
                    <h2>
                        ثبت نام در رویداد
                        <br/>
                        مقدمه ای بر هوش مصنوعی
                        </h2>
                    <div className="form-group-1">
                        <input type="text" name="title" itemID="title" placeholder="نام" required />
                        <input type="text" name="name" itemID="name" placeholder="نام خانوادگی" required />
                        <input type="email" name="email" itemID="email" placeholder="ایمیل" required />
                        <input type="number" name="phone_number" itemID="phone_number" placeholder="شماره تماس" required />
                        {/* <input type="number" name="phone_number" itemID="phone_number" placeholder="شماره تماس" required /> */}
                        {/* <div className="select-list">
                            <select name="course_type" itemID="course_type">
                                <option slected value="">Course Type</option>
                                <option value="society">Society</option>
                                <option value="language">Language</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="form-group-2">
                        <div className="select-list">
                            <select name="confirm_type" itemID="confirm_type">
                                <option seleected value="">مرد</option>
                                <option value="by_email">زن</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" name="agree-term" itemID="agree-term" className="agree-term" />
                        <label for="agree-term" className="label-agree-term">
                            <span>
                            </span>
                            <a href="#" className="term-service">ضوابط و قوانین&nbsp;</a>را مطالعه کردم و می‌پذیرم
                        </label>
                    </div>
                    <h3>هزینه بلیط: 200 هزار تومان</h3>
                    <div className="form-submit">
                        <input type="submit" name="submit" itemID="submit" className="submit" value="ثبت نام و پرداخت" />
                    </div>
                </form>
            </div>

        </div>


        </div>
    </>
    )
}

export default RegisterEvent;


{/* <script src="vendor/jquery/jquery.min.js"></script>
<script src="js/main.js"></script> */}