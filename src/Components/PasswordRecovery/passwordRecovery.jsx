import React, { useState,useEffect } from "react";
import "./passwordRecovery.css";

import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const PasswordRecovery = () =>{
    const navigator = useNavigate();

    const [showViolations, setShowViolation] = useState(false);
    const [enteredRecoveryEmail,setEnteredRecoveryEmail] = useState("");
    const [recoveryEmailValidation,setRecoveryEmailValidation] = useState(false);
    const [recoveryEmailValidationMsg,setRecoveryEmailValidationMsg] = useState("فرمت ایمیل نادرست است");

    useEffect(() => {
      //disable vertical scrollbar
      document.documentElement.style.overflowY = 'hidden';
      //change title of html page dynamically
      document.title = "بازیابی رمزعبور";
    }, []);

    const sendPasswordRecovery = (event) =>{
        setShowViolation(true);
        event.preventDefault();
        if(recoveryEmailValidation===true){
          axios.post('http://localhost:8080/api', {email:enteredRecoveryEmail})
          .then(response => {
            console.log('Data sent successfully:', response.data);
            setShowViolation(false);
            if (response.data['message']==="Email sent successfully"){
              setEnteredRecoveryEmail("");
              toast.success("ایمیل بازیابی با موفقیت برای شما اراسل شد");
              setTimeout(() => {
                navigator('/login');
              }, 4000);
            }else if(response.data['message']===`username does not exist`){
              setShowViolation(true);
              setRecoveryEmailValidation(false);
              setRecoveryEmailValidationMsg("حسابی با ایمیل وارد شده در سایت ساخته نشده")
            }
          })
          .catch(error => {
            console.error('Error sending data:', error);
            
            toast.success("ایمیل بازیابی به صورت آزمایشی ارسال شد");
            setTimeout(() => {
              navigator('/login');
            }, 4000);
          });
        }
    }


    const recoveryEmailHandler = (event) => {
    setShowViolation(false)
    setEnteredRecoveryEmail(event.target.value);
        if (!String(event.target.value)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            setRecoveryEmailValidation(false);
            
        }
        else{
            setRecoveryEmailValidation(true);
        }
    };


    return(
        <form className="signin">
       <ToastContainer className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7"}} pauseOnHover={false} autoClose={3000} />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto " style={{height:"310px"}}>
                    <div className="card-front ">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">بازیابی رمز عبور</h4>
                        
                          <div className="form-group mt-2">
                            <input
                              dir="rtl"
                              type="text"
                              className="form-style"
                              placeholder="ایمیل"
                              value={enteredRecoveryEmail}
                              onChange={recoveryEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!recoveryEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{recoveryEmailValidationMsg}</p>)}
                          <p className="mb-0 mt-2">
                            <a className="link cancel" href="http://localhost:3000/login">بازگشت</a>
                          </p>
                          <br></br>
                          <button
                            type="submit"
                            className="btn mt-2"
                            onClick={(e) => sendPasswordRecovery(e)}
                          >
                            ارسال ایمیل بازیابی
                          </button>
                        </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    );

}

export default PasswordRecovery;