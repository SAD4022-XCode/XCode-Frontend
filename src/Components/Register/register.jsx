import React, { useState,useEffect} from "react";
import "./register.css";

import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

let x=0;
const Register = () =>{
    const navigator=useNavigate();
    
    const [enteredRegisterUserName, setEnteredRegisterUserName] = useState("");
    const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");

    const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
    const [enteredRegisterPassword2, setEnteredRegisterPassword2] = useState("");
    const [enteredName, setEnteredName] = useState("");

    const [autoHeight,setAutoHeight] = useState(510);

    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRegisterPassword2, setShowRegisterPassword2] = useState(false);
    
    const [showViolations, setShowViolation] = useState(false);
    const [registerUserNameValidation, setRegisterUserNameValidation] = useState(false);
    const [registerUserNameValidationMsg, setRegisterUserNameValidationMsg] = useState("نام کاربری شامل 1 تا 30 کاراکتر است و باید با حروف انگلیسی شروع شود");
    const [registerEmailValidation, setRegisterEmailValidation] = useState(false);
    const [registerEmailValidationMsg, setRegisterEmailValidationMsg] = useState("فرمت ایمیل نادرست است");
    
    const [registerPasswordValidation, setRegisterPasswordValidation] = useState(false);
    const [registerPasswordValidationMsg, setRegisterPasswordValidationMsg] = useState("رمزعبور حداقل باید شامل 8 کاراکتر باشد")
    
    const [registerPasswordValidation2, setRegisterPasswordValidation2] = useState(false);
    const [registerPasswordValidationMsg2, setRegisterPasswordValidationMsg2] = useState("رمز عبور حداقل باید شامل 8 کاراکتر باشد");
    const [nameValidation,setNameValidation] = useState(false)
    
    
    useEffect(() => {
      //changing title of html pages dynamically
      document.title = "عضویت در ایونتیفای";
    }, []);


    const toggleRegisterPasswordVisibility = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };
    const toggleRegisterPasswordVisibility2 = () => {
        setShowRegisterPassword2(!showRegisterPassword2);
    };

    const registerHandler = (event, action) => {
        x=0;
        if(registerUserNameValidation===false){
            x++;
        }
        if(registerEmailValidation===false){
            x++;
        }
        
        if(registerPasswordValidation===false){
            x++;
        }
        if(registerPasswordValidation2===false){
            x++;
        }
        if(nameValidation===false){
            x++;
        }

        if(showViolations===false && x>0){
            setAutoHeight(autoHeight+x*20);
        }
        setShowViolation(true)
        event.preventDefault();

        let userData = {
            username:enteredRegisterUserName,
            name: enteredName,
            email: enteredRegisterEmail,
            password: enteredRegisterPassword,
        };

        if(registerUserNameValidation && registerEmailValidation && registerPasswordValidation && registerPasswordValidation2 && nameValidation){
            axios.post('http://localhost:8080/api', userData)
            .then(response => {
                setShowViolation(false);
                console.log('Data sent successfully:', response.data);
                if (response.data['message']==="Data received successfully"){
                setEnteredRegisterUserName("");
                setEnteredRegisterEmail("");
                setEnteredRegisterPassword("");
                setEnteredRegisterPassword2("");
                setEnteredName("");
                toast.success("!با موفقیت عضو شدید");
                setTimeout(() => {
                    navigator('/home');
                }, 4000);
                }else if(response.data['message']===`username is already taken`){
                setShowViolation(true);
                setRegisterUserNameValidation(false);
                setRegisterUserNameValidationMsg("نام کاربری موردنظر در سیستم ثبت شده است");
                
                }else if(response.data['message']===`email address has already been registered in our system`){
                setShowViolation(true);
                setRegisterEmailValidation(false);
                setRegisterEmailValidationMsg("ایمیل موردنظر در سیستم ثبت شده است");
                }
            })
            .catch(error => {
                console.error('Error sending data:', error);
                
                toast.success("به صورت آزمایشی عضو شدید");
                setTimeout(() => {
                navigator('/home');
                }, 4000);
            });
        }

    };



    //Register validation
    //--------------------------------------------------------------------------------------------------
    const regUserName = /^[a-zA-Z][a-zA-Z0-9]{3,29}$/;
    const registerUserNameHandler = (event) => {
        if(showViolations===true){
            setAutoHeight(autoHeight-20*x);
        }
        setShowViolation(false)
        setEnteredRegisterUserName(event.target.value);
        if (event.target.value.length<1 ||event.target.value.length>30){
            setRegisterUserNameValidation(false);
            setRegisterUserNameValidationMsg("نام کاربری شامل 1 تا 30 کاراکتر است و باید با حروف انگلیسی شروع شود")
        }
        else{
        if (regUserName.test(event.target.value)){
            setRegisterUserNameValidation(true);
        }else{
            setRegisterUserNameValidation(false);
            setRegisterUserNameValidationMsg("نام کاربری باید با حروف انگلیسی شروع شود و شامل حروف و اعداد انگلیسی است")
        }
    }
    }

    const registerEmailHandler = (event) => {
        if(showViolations===true){
        setAutoHeight(autoHeight-20*x);
        }
        setShowViolation(false)
        setEnteredRegisterEmail(event.target.value);
        if (!String(event.target.value)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )){
            setRegisterEmailValidation(false);
            
            setRegisterEmailValidationMsg("فرمت ایمیل نادرست است");
        }
        else{
            setRegisterEmailValidation(true);
        }

        

    };

    const registerPasswordHandler = (event) => {
        if(showViolations===true){
            setAutoHeight(autoHeight-20*x);
        }
        setShowViolation(false)
        setEnteredRegisterPassword(event.target.value);
        if(event.target.value.length<8){
            setRegisterPasswordValidation(false);
            setRegisterPasswordValidationMsg("رمزعبور حداقل باید شامل 8 کاراکتر باشد");
        }else{
        let pattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$");
        if(!pattern.test(event.target.value)){
            setRegisterPasswordValidationMsg("رمزعبور باید شامل حروف کوچک و بزرگ انگلیسی،اعداد و نشانه های خاص باشد")
            setRegisterPasswordValidation(false);
        }else{
            setRegisterPasswordValidation(true);
        }
        
        }
        
    };
    const registerPasswordHandler2 = (event) => {
        if(showViolations===true){
            setAutoHeight(autoHeight-20*x);
        }
        setShowViolation(false)
        setEnteredRegisterPassword2(event.target.value);
        if(event.target.value!==enteredRegisterPassword){
            setRegisterPasswordValidation2(false);
            setRegisterPasswordValidationMsg2("رمزعبور و تکرار آن باید یکسان باشند");
        }else{
            if(event.target.value.length<8){
                setRegisterPasswordValidation2(false);
                setRegisterPasswordValidationMsg2("رمزعبور حداقل باید شامل 8 کاراکتر باشد");
            }else{
                let pattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$");
                if(!pattern.test(event.target.value)){
                    setRegisterPasswordValidationMsg2("رمزعبور باید شامل حروف کوچک و بزرگ انگلیسی،اعداد و نشانه های خاص باشد");
                    setRegisterPasswordValidation2(false);
                }else{
                    setRegisterPasswordValidation2(true);
                }
            
            }
        }
        
    };


    const nameHandler = (event) => {
        if(showViolations===true){
        setAutoHeight(autoHeight-20*x);
        }
        setShowViolation(false)
        setEnteredName(event.target.value);
        const regNamePersian = /^[\u0600-\u06FF\s]+$/;
        const regNameEnglish = /^[a-zA-Z\s]+$/;
        if(event.target.value.length<5 || event.target.value.length>30){
        setNameValidation(false);
        }else{
        if (regNamePersian.test(event.target.value) || regNameEnglish.test(event.target.value)){
        setNameValidation(true);
        }
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
                <div className="card-3d-wrap mx-auto " style={{height: autoHeight.toString()+"px"}}>
                  
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">عضویت در ایونتیفای</h4>
                          <div className={`form-group mt-2 ${(!registerUserNameValidation && showViolations) ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="text"
                              className="form-style"
                              placeholder="نام کاربری"
                              value={enteredRegisterUserName}
                              onChange={registerUserNameHandler}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          {!registerUserNameValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerUserNameValidationMsg}</p>)}

                          <div className={`form-group mt-2 ${!nameValidation && showViolations ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="text"
                              className="form-style"
                              placeholder="نام و نام خانوادگی"
                              value={enteredName}
                              onChange={nameHandler}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          {!nameValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">نام و نام خانوادگی باید بین 5 تا 30 کاراکتر فارسی و یا انگلیسی باشد</p>)}
                          <div className={`form-group mt-2 ${!registerEmailValidation && showViolations ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="email"
                              className="form-style"
                              placeholder="ایمیل"
                              autoComplete="on"
                              value={enteredRegisterEmail}
                              onChange={registerEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!registerEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerEmailValidationMsg}</p>)}
                          <div className={`form-group mt-2 ${!registerPasswordValidation && showViolations ? "invalid" : ""}`}>
                            <i class={showRegisterPassword ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleRegisterPasswordVisibility} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              dir="rtl"
                              type={showRegisterPassword ? "text":"password"}
                              className="form-style"
                              placeholder="رمز عبور"
                              autoComplete="on"
                              value={enteredRegisterPassword}
                              onChange={registerPasswordHandler}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          {!registerPasswordValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerPasswordValidationMsg}</p>)}
                          <div className={`form-group mt-2 ${!registerPasswordValidation2 && showViolations ? "invalid" : ""}`}>
                          <i class={showRegisterPassword2 ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleRegisterPasswordVisibility2} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              dir="rtl"
                              type={showRegisterPassword2 ? "text":"password"}
                              className="form-style"
                              placeholder="تایید رمز عبور"
                              autoComplete="on"
                              value={enteredRegisterPassword2}
                              onChange={registerPasswordHandler2}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          {!registerPasswordValidation2 && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerPasswordValidationMsg2}</p>)}
                          {/* <div className="form-group mt-2">
                            <input
                              dir="rtl"
                              type="text"
                              className="form-style"
                              placeholder="تاریخ تولد"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              // value={enteredBirthDate}
                              // onChange={birthDateHandler}
                            />
                            <i className="input-icon uil uil-calendar-alt"></i>
                          </div> */}
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={(e) => registerHandler(e, "register")}
                          >
                            عضویت در ایونتیفای
                          </button>
                          <p className="message">
                            قبلا عضو شده‌اید؟{" "}
                            <a href="http://localhost:3000/login">
                              ورود کاربران
                            </a>
                          </p>
                          
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

export default Register;