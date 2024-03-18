import React, { useState, useEffect } from "react";
import "./Signup.css";

import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
const clientID ="191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

let lastToggleFormTime = 0;
let x=0;
const Signup = () => {
  const navigator=useNavigate();

  //form input variables
  const [enteredLoginEmail, setEnteredLoginEmail] = useState("");
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");
  const [enteredRecoveryEmail,setEnteredRecoveryEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
  const [enteredRegisterPassword2, setEnteredRegisterPassword2] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  //card height variables
  const [autoHeight,setAutoHeight] = useState(450);
  //show password variables
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterPassword2, setShowRegisterPassword2] = useState(false);
  //validation variables
  const [showViolations, setShowViolation] = useState(false);
  const [loginEmailValidation, setLoginEmailValidation] = useState(false);
  const [registerEmailValidation, setRegisterEmailValidation] = useState(false);
  const [recoveryEmailValidation,setRecoveryEmailValidation] = useState(false);
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false);
  const [loginPasswordValidationMsg, setLoginPasswordValidationMsg] = useState("رمزعبور حداقل باید شامل 8 کاراکتر باشد");

  const [registerPasswordValidation, setRegisterPasswordValidation] = useState(false);
  const [registerPasswordValidationMsg, setRegisterPasswordValidationMsg] = useState("رمزعبور حداقل باید شامل 8 کاراکتر باشد")
  
  const [registerPasswordValidation2, setRegisterPasswordValidation2] = useState(false);
  const [registerPasswordValidationMsg2, setRegisterPasswordValidationMsg2] = useState("رمز عبور حداقل باید شامل 8 کاراکتر باشد");
  const [nameValidation,setNameValidation] = useState(false)
    
  const [rememberPassword, setRememberPassword] = useState(true);
  const [switchPages, setSwitchPages] = useState(false);


  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        try{
          const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
            {headers:{
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },}
          );
          console.log(res);
          console.log("-----------------------------------------");
          toast.success("!با موفقیت وارد شدید");
          console.log("hello world!");  
          setTimeout(() => {
            navigator('/home');
          }, 6000);
        }catch(err){
          console.log(err);
        }

    },
  });



  //change visibility of password
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  const toggleRegisterPasswordVisibility2 = () => {
    setShowRegisterPassword2(!showRegisterPassword2);
  };

  //switch between login & register
  const toggleForm = () => {
    setShowViolation(false)
    
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowRegisterPassword2(false);

    const currentTime = Date.now();
    if (currentTime - lastToggleFormTime < 700) return; 
    lastToggleFormTime = currentTime;

    // setViolationNumber(0);
    showLogin === true ? setAutoHeight(480) : setAutoHeight(450);

    setShowLogin(!showLogin);
    const formWrapper = document.querySelector(".card-3d-wrap");
    if (formWrapper.classList.contains("animate__animated", "animate__fadeInDown", "animate__faster")) {
      console.log("loooooooooooooooooooooooooooog")
      formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
      formWrapper.classList.add("animate__animated", "animate__fadeInDown", "animate__faster");
      setTimeout(() => {
        formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
      }, 600);
    } else {
      console.log("registeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer")
      formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
      formWrapper.classList.add("animate__animated", "animate__fadeInUp", "animate__faster");
      setTimeout(() => {
        formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
      }, 600);
    }
  };
  
  const toggleRememberPassword = () => {
    if(switchPages===false){
      setSwitchPages(true);
      const currentTime = Date.now();
      if (currentTime - lastToggleFormTime < 700) return; 
      lastToggleFormTime = currentTime;
      setRememberPassword(!rememberPassword);
      //setRecoveryEmailValidation(true);
      setAutoHeight(330);
      const formWrapper = document.querySelector(".card-3d-wrap");
      if (formWrapper.classList.contains("animate__animated", "animate__fadeInDown", "animate__faster")) {
        formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
        formWrapper.classList.add("animate__animated", "animate__fadeInDown", "animate__faster");
        setTimeout(() => {
          formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
        }, 600);
      } else {
        formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
        formWrapper.classList.add("animate__animated", "animate__fadeInUp", "animate__faster");
        setTimeout(() => {
          formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
        }, 600);
      }
    }
    else{
      
      if(recoveryEmailValidation===true){
        //send recovery email from here
        setShowViolation(false);
        setRememberPassword(!rememberPassword);
        setAutoHeight(450);
        setSwitchPages(false);
        // setEnteredRecoveryEmail("");
        setRecoveryEmailValidation(false);
        const currentTime = Date.now();
        if (currentTime - lastToggleFormTime < 700) return; 
        lastToggleFormTime = currentTime;

        const formWrapper = document.querySelector(".card-3d-wrap");
        if (formWrapper.classList.contains("animate__animated", "animate__fadeInDown", "animate__faster")) {
          formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
          formWrapper.classList.add("animate__animated", "animate__fadeInDown", "animate__faster");
          setTimeout(() => {
            formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
          }, 600);
        } else {
          formWrapper.classList.remove("animate__animated", "animate__fadeInDown", "animate__faster");
          formWrapper.classList.add("animate__animated", "animate__fadeInUp", "animate__faster");
          setTimeout(() => {
            formWrapper.classList.remove("animate__animated", "animate__fadeInUp", "animate__faster");
          }, 600);
        }
      }else{
        setShowViolation(true);
      }
    } 
  };
;
  const submitHandler = (event, action) => {
    x=0;
    if(action=="login"){
      if(loginEmailValidation===false){
        x++;
      }
      if(loginPasswordValidation===false){
        x++;
      }
    }
    else{
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
    }
    
    if(showViolations===false && x>0){
      setAutoHeight(autoHeight+x*20);
    }
    setShowViolation(true)
    event.preventDefault();
    let userData = "";
    if (action === "login") {
      userData = {
        email: enteredLoginEmail,
        password: enteredLoginPassword,
      };
      
      if(loginEmailValidation && loginPasswordValidation){

        setLoginEmailValidation(false);
        setShowViolation(false);
        setEnteredLoginEmail("");
        setEnteredLoginPassword("");

        //send data to back-end
        
        toast.success("!با موفقیت وارد شدید");
        
        setTimeout(() => {
          navigator('/home');
        }, 6000);
      }
 
    } else {
      userData = {
        name: enteredName,
        email: enteredRegisterEmail,
        password: enteredRegisterPassword,
        // birthDate: new Date(enteredBirthDate),
      };
      if(registerEmailValidation && registerPasswordValidation && registerPasswordValidation2 && nameValidation){
        setRegisterEmailValidation(false);
        setShowViolation(false);
        setEnteredRegisterEmail("");
        setEnteredRegisterPassword("");
        setEnteredRegisterPassword2("");
        setEnteredName("");
        setEnteredBirthDate("");

        //send data to back-end
        
        toast.success("!با موفقیت عضو شدید");
        setTimeout(() => {
          navigator('/home');
        }, 6000);
      }
      
    }
    console.log(userData);
  };


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


  //Login validation
  //--------------------------------------------------------------------------------------------------
  const loginEmailHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-20*x);
    }
    setShowViolation(false)
    setEnteredLoginEmail(event.target.value);
    if (!String(event.target.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      setLoginEmailValidation(false);
    }
    else{
      setLoginEmailValidation(true);
    }


  };
  const loginPasswordHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-20*x);
    }
    setShowViolation(false)
    setEnteredLoginPassword(event.target.value);
    if(event.target.value.length<8){
      setLoginPasswordValidation(false);
      setLoginPasswordValidationMsg("رمزعبور حداقل باید شامل 8 کاراکتر باشد")
    }else{
      let pattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$")
      if(!pattern.test(event.target.value)){
        setLoginPasswordValidationMsg("رمزعبور باید شامل حروف کوچک و بزرگ انگلیسی،اعداد و نشانه های خاص باشد")
        setLoginPasswordValidation(false);
      }else{
        setLoginPasswordValidation(true);
      }
      
    }

  };


  //Register validation
  //--------------------------------------------------------------------------------------------------
  const registerEmailHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-20*x);
    }
    // setViolationNumber(0);
    setShowViolation(false)
    setEnteredRegisterEmail(event.target.value);
    if (!String(event.target.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      setRegisterEmailValidation(false);
    }
    else{
      setRegisterEmailValidation(true);
    }

    

  };

  const registerPasswordHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-20*x);
    }
    // setViolationNumber(0);
    setShowViolation(false)
    setEnteredRegisterPassword(event.target.value);
    if(event.target.value.length<8){
      setRegisterPasswordValidation(false);
      setRegisterPasswordValidationMsg("رمزعبور حداقل باید شامل 8 کاراکتر باشد")
    }else{
      let pattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$")
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
    // setViolationNumber(0);
    setShowViolation(false)
    setEnteredRegisterPassword2(event.target.value);
    if(event.target.value!==enteredRegisterPassword){
      setRegisterPasswordValidation2(false);
      setRegisterPasswordValidationMsg2("رمزعبور و تکرار آن باید یکسان باشند")
    }else{
      if(event.target.value.length<8){
      setRegisterPasswordValidation2(false);
      setRegisterPasswordValidationMsg2("رمزعبور حداقل باید شامل 8 کاراکتر باشد")
    }else{
      let pattern=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$")
      if(!pattern.test(event.target.value)){
        setRegisterPasswordValidationMsg2("رمزعبور باید شامل حروف کوچک و بزرگ انگلیسی،اعداد و نشانه های خاص باشد")
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
    // setViolationNumber(0);
    setShowViolation(false)
    setEnteredName(event.target.value);
    if(event.target.value.length<5 || event.target.value.length>30){
      setNameValidation(false);
    }else{
      setNameValidation(true);
    }

  };


  // const birthDateHandler = (event) => {
  //   setEnteredBirthDate(event.target.value);
  //   console.log(event.target.value);
  // };

  return (

    

    <form className="signin">
       <ToastContainer className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7"}} pauseOnHover={false} />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto " style={{height: autoHeight.toString()+"px"}}>
                  {showLogin && rememberPassword && (
                    <div className="card-front ">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">ورود کاربران</h4>
                          <div className={`form-group mt-2 ${(!loginEmailValidation && showViolations) ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="email"
                              className="form-style"
                              placeholder="ایمیل"
                              value={enteredLoginEmail}
                              onChange={loginEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!loginEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">فرمت ایمیل نادرست است</p>)}
                          <div className={`form-group mt-2 ${!loginPasswordValidation && showViolations ? "invalid" : ""}`}>
                            <i class={showLoginPassword ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleLoginPasswordVisibility} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              dir="rtl"
                              type={showLoginPassword ? "text":"password"}
                              className="form-style"
                              placeholder="رمز عبور"
                              value={enteredLoginPassword}
                              onChange={loginPasswordHandler} 
                            />
                            <i className="input-icon uil uil-lock-alt" ></i>
                          </div>
                          {!loginPasswordValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{loginPasswordValidationMsg}</p>)}
                          <p className="mb-0 mt-2">
                            <a className="link" href="#" onClick={toggleRememberPassword}>بازیابی رمز عبور</a>
                          </p>
                          <button
                            type="submit"
                            className="btn mt-2"
                            onClick={(e) => submitHandler(e, "login")}
                          >
                            ورود
                          </button>
                          <div class="container">
                            <div class="row"> 
                                <hr className="custom-hr"/>
                                <h6 className="separator-text">یا</h6>
                                <hr className="custom-hr"/>
                            </div>
                          </div>
                          <button class="google-login-button" style={{display: "flex" ,justifyContent: "center" ,alignItems: "center",marginLeft:"120px"}} onClick={() => loginWithGoogle()}>
                              <div class="row">
                                  <div style={{marginTop: "2px"}}>
                                      <img 
                                          src={require("../../assets/google-logo.png")}
                                          style={{width: "25px", height: "25px",paddingTop:"1px"}}
                                          alt="Google Logo"
                                      />
                                  </div>
                                  <h6 style={{paddingLeft:"5px",paddingTop:"5px"}}>ورود با گوگل</h6>
                              </div> 
                          </button>
                          <p className="message">
                           حساب کاربری ندارید؟{" "}
                            <a href="#" onClick={toggleForm}>
                              همین حالا عضو شوید
                            </a>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  )}



                   {showLogin && !rememberPassword && (
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
                          
                          {!recoveryEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">فرمت ایمیل نادرست است</p>)}
                          <p className="mb-0 mt-2">
                            <a className="link cancel" href="" >بازگشت</a>
                          </p>
                          <button
                            type="submit"
                            className="btn mt-2"
                            onClick={toggleRememberPassword}
                          >
                            ارسال ایمیل بازیابی
                          </button>
                        </div>
                      </div>
                    </div>
                  )}  



                  {!showLogin && (
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">عضویت در ایونتیفای</h4>
                          <div className={`form-group ${!nameValidation && showViolations ? "invalid" : ""}`}>
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
                          {!nameValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">نام و نام خانوادگی باید بین 5 تا 30 کاراکتر باشد</p>)}
                          <div className={`form-group mt-2 ${!registerEmailValidation && showViolations ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="email"
                              className="form-style"
                              placeholder="ایمیل"
                              value={enteredRegisterEmail}
                              onChange={registerEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!registerEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">فرمت ایمیل نادرست است</p>)}
                          <div className={`form-group mt-2 ${!registerPasswordValidation && showViolations ? "invalid" : ""}`}>
                            <i class={showRegisterPassword ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleRegisterPasswordVisibility} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              dir="rtl"
                              type={showRegisterPassword ? "text":"password"}
                              className="form-style"
                              placeholder="رمز عبور"
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
                              value={enteredBirthDate}
                              onChange={birthDateHandler}
                            />
                            <i className="input-icon uil uil-calendar-alt"></i>
                          </div> */}
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={(e) => submitHandler(e, "register")}
                          >
                            عضویت در ایونتیفای
                          </button>
                          <p className="message">
                            قبلا عضو شده‌اید؟{" "}
                            <a href="#" onClick={toggleForm}>
                              ورود کاربران
                            </a>
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;