import React, { useState, useEffect } from "react";
import "./Signup.css";
import GoogleLogin from "./google";
import { gapi } from "gapi-script";
import 'animate.css';
// import Validation from "./validation";

const clientID ="191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

let lastToggleFormTime = 0;
const Signup = () => {
  
  //form input variables
  const [enteredLoginEmail, setEnteredLoginEmail] = useState("");
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
  const [enteredRegisterPassword2, setEnteredRegisterPassword2] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  //card height variables
  const [autoHeight,setAutoHeight] = useState(450);
  const [violationNumber,setViolationNumber] = useState(0);
  //show password variables
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterPassword2, setShowRegisterPassword2] = useState(false);
  //validation variables
  const [showViolations, setShowViolation] = useState(false);
  const [loginEmailValidation, setLoginEmailValidation] = useState(false);
  const [registerEmailValidation, setRegisterEmailValidation] = useState(false);
  const [loginPasswordValidation, setLoginPasswordValidation] = useState(false);
  const [loginPasswordValidationMsg, setLoginPasswordValidationMsg] = useState(false);

  const [registerPasswordValidation, setRegisterPasswordValidation] = useState(false);
  const [registerPasswordValidationMsg, setRegisterPasswordValidationMsg] = useState(false);
  const [registerPasswordValidation2, setRegisterPasswordValidation2] = useState(false);
  const [registerPasswordValidationMsg2, setRegisterPasswordValidationMsg2] = useState(false);
  const [nameValidation,setNameValidation] = useState(false)
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  const toggleRegisterPasswordVisibility2 = () => {
    setShowRegisterPassword2(!showRegisterPassword2);
  };
  const toggleForm = () => {
    setShowViolation(false)
    

    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowRegisterPassword2(false);


    const currentTime = Date.now();
    if (currentTime - lastToggleFormTime < 700) return; 
    lastToggleFormTime = currentTime;

    setViolationNumber(0);
    showLogin === true ? setAutoHeight(500) : setAutoHeight(430);

    setShowLogin(!showLogin);

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
  };
  

  const submitHandler = (event, action) => {
    setAutoHeight(autoHeight+violationNumber*7);
    setShowViolation(true)
    event.preventDefault();
    let userData = "";
    if (action === "login") {
      userData = {
        email: enteredLoginEmail,
        password: enteredLoginPassword,
      };
      
      if(loginEmailValidation && loginPasswordValidation){
        setEnteredLoginEmail("");
        setEnteredLoginPassword("");
        //send data to back-end
        //show snack bar
      }
 
    } else {
      userData = {
        name: enteredName,
        email: enteredRegisterEmail,
        password: enteredRegisterPassword,
        birthDate: new Date(enteredBirthDate),
      };
      if(registerEmailValidation && registerPasswordValidation && registerPasswordValidation2 && nameValidation){
        setEnteredRegisterEmail("");
        setEnteredRegisterPassword("");
        setEnteredRegisterPassword2("");
        setEnteredName("");
        setEnteredBirthDate("");
        //send data to back-end
        //show snack bar
      }
      
    }
    console.log(userData);
  };

  //Login validation
  //--------------------------------------------------------------------------------------------------
  const loginEmailHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
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
    if(loginEmailValidation===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }


  };
  const loginPasswordHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
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
    if(loginPasswordValidation===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }
  };


  //Register validation
  //--------------------------------------------------------------------------------------------------
  const registerEmailHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
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

    if(registerEmailValidation===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }

  };

  const registerPasswordHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
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
    if(registerPasswordValidation===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }
  };
  const registerPasswordHandler2 = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
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

    if(registerPasswordValidation2===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }
    
  };


  const nameHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*7);
    }
    setViolationNumber(0);
    setShowViolation(false)
    setEnteredName(event.target.value);
    if(event.target.value.length<5 || event.target.value.length>30){
      setNameValidation(false);
    }else{
      setNameValidation(true);
    }

    if(nameValidation===false){
      setViolationNumber(violationNumber+1);
    }
    else{
      setViolationNumber(violationNumber);
    }
  };

  const birthDateHandler = (event) => {
    setEnteredBirthDate(event.target.value);
  };

  return (
    <form className="signin" onSubmit={submitHandler}>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <div className="card-3d-wrap mx-auto " style={{height: autoHeight.toString()+"px"}}>
                  {showLogin && (
                    <div className="card-front ">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">ورود کاربران</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="ایمیل"
                              value={enteredLoginEmail}
                              onChange={loginEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!loginEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">فرمت ایمیل نادرست است</p>)}
                          <div className="form-group mt-2">
                            <i class={showLoginPassword ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleLoginPasswordVisibility} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
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
                            <a className="link" href="">بازیابی رمز عبور</a>
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
                          <GoogleLogin />
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





                  {!showLogin && (
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">عضویت در ایونتیفای</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="نام و نام خانوادگی"
                              value={enteredName}
                              onChange={nameHandler}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          {!nameValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">نام و نام خانوادگی باید بین 5 تا 30 کاراکتر باشد</p>)}
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="ایمیل"
                              value={enteredRegisterEmail}
                              onChange={registerEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          {!registerEmailValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">فرمت ایمیل نادرست است</p>)}
                          <div className="form-group mt-2">
                            <i class={showRegisterPassword ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleRegisterPasswordVisibility} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              type={showRegisterPassword ? "text":"password"}
                              className="form-style"
                              placeholder="رمز عبور"
                              value={enteredRegisterPassword}
                              onChange={registerPasswordHandler}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          {!registerPasswordValidation && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerPasswordValidationMsg}</p>)}
                          <div className="form-group mt-2">
                          <i class={showRegisterPassword2 ? "bi bi-eye":"bi bi-eye-slash"} onClick={toggleRegisterPasswordVisibility2} style={{ fontSize: "20px", position: "absolute", top: "40%", transform: "translateY(-50%)", paddingLeft: "10px"  }}></i>
                            <input
                              type={showRegisterPassword2 ? "text":"password"}
                              className="form-style"
                              placeholder="تایید رمز عبور"
                              value={enteredRegisterPassword2}
                              onChange={registerPasswordHandler2}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          {!registerPasswordValidation2 && showViolations &&(<p className="mb-0 mt-2 validationMsg">{registerPasswordValidationMsg2}</p>)}
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="تاریخ تولد"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "text")}
                              value={enteredBirthDate}
                              onChange={birthDateHandler}
                            />
                            <i className="input-icon uil uil-calendar-alt"></i>
                          </div>
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