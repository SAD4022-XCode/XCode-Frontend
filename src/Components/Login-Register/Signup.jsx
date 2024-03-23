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
  const [enteredLoginUserName, setEnteredLoginUserName] = useState("");
  const [enteredRegisterUserName, setEnteredRegisterUserName] = useState("");
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");
  const [enteredRecoveryEmail,setEnteredRecoveryEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
  const [enteredRegisterPassword2, setEnteredRegisterPassword2] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  //card height variable
  const [autoHeight,setAutoHeight] = useState(450);
  //show password variables
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterPassword2, setShowRegisterPassword2] = useState(false);
  //validation variables
  const [showViolations, setShowViolation] = useState(false);
  const [loginUserNameValidation, setLoginUserNameValidation] = useState(false);
  const [loginUserNameValidationMsg, setLoginUserNameValidationMsg] = useState("نام کاربری شامل 1 تا 30 کاراکتر است و باید با حروف انگلیسی شروع شود");
  const [registerUserNameValidation, setRegisterUserNameValidation] = useState(false);
  const [registerUserNameValidationMsg, setRegisterUserNameValidationMsg] = useState("نام کاربری شامل 1 تا 30 کاراکتر است و باید با حروف انگلیسی شروع شود");
  
  const [registerEmailValidation, setRegisterEmailValidation] = useState(false);
  const [registerEmailValidationMsg, setRegisterEmailValidationMsg] = useState("فرمت ایمیل نادرست است");
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
          }, 4000);
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
    showLogin === true ? setAutoHeight(510) : setAutoHeight(450);

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
  
  const toggleRememberPassword = (event) => {
    event.preventDefault()
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
        toast.success("!رمز عبور با موفقیت ارسال شد");
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
      if(loginUserNameValidation===false){
        x++;
      }
      if(loginPasswordValidation===false){
        x++;
      }
    }
    else{
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
    }
    
    if(showViolations===false && x>0){
      setAutoHeight(autoHeight+x*20);
    }
    setShowViolation(true)
    event.preventDefault();
    let userData = "";
    if (action === "login") {
      userData = {
        username: enteredLoginUserName,
        password: enteredLoginPassword,
      };
      if(loginUserNameValidation && loginPasswordValidation){
        axios.post('http://localhost:8080/api', userData)
        .then(response => {
          console.log('Data sent successfully:', response.data);
          setShowViolation(false);
          if (response.data['message']==="Data received successfully"){
            setEnteredLoginUserName("");
            setEnteredLoginPassword("");
            toast.success("!با موفقیت عضو شدید");
            setTimeout(() => {
              navigator('/home');
            }, 4000);
          }else if(response.data['message']===`username does not exist`){
            setShowViolation(true);
            setLoginUserNameValidation(false);
            setLoginUserNameValidationMsg("نام کاربری وارد شده در سیستم وجود ندارد");
            
          }else if(response.data['message']===`password incorrect`){
            setShowViolation(true);
            setLoginPasswordValidation(false);
            setLoginPasswordValidationMsg("رمزعبور نادرست است");
          }
        })
        .catch(error => {
          console.error('Error sending data:', error);
          
          toast.success("به صورت آزمایشی وارد شدید");
          setTimeout(() => {
            navigator('/home');
          }, 4000);
        });
      }
 
    } else {

      userData = {
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
      
    }
    console.log(userData);
  };


  //Login validation
  //--------------------------------------------------------------------------------------------------
  const regUserName = /^[a-zA-Z][a-zA-Z0-9]{3,29}$/;;
  const loginUserNameHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-20*x);
    }
    setShowViolation(false)
    setEnteredLoginUserName(event.target.value);
    if (event.target.value.length<1 || event.target.value.length>30){
      setLoginUserNameValidation(false);
      setLoginUserNameValidationMsg("نام کاربری شامل 1 تا 30 کاراکتر است و باید با حروف انگلیسی شروع شود")
    }
    else{
      if (regUserName.test(event.target.value)){
        setLoginUserNameValidation(true);
      }else{
        setRegisterUserNameValidation(false);
        setRegisterUserNameValidationMsg("نام کاربری باید با حروف انگلیسی شروع شود و شامل حروف و اعداد انگلیسی است")
      }
  }
  }

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


  return (

    

    <form className="signin">
       <ToastContainer className="toastify-container"position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7"}} pauseOnHover={false} autoClose={3000} />
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
                          <div className={`form-group mt-2 ${(!loginUserNameValidation && showViolations) ? "invalid" : ""}`}>
                            <input
                              dir="rtl"
                              type="text"
                              className="form-style"
                              placeholder="نام کاربری"
                              value={enteredLoginUserName}
                              onChange={loginUserNameHandler}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          {!loginUserNameValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{loginUserNameValidationMsg}</p>)}
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
                          <br></br>
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