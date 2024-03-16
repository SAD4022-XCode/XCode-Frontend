import React, { useState, useEffect } from "react";
import "./Signup.css";
import GoogleLogin from "./Login-Register/google";
import { gapi } from "gapi-script";
const clientID ="191069690020-bfq8g99fjkeskb60o0rqjri7cecm6r9l.apps.googleusercontent.com";

let lastToggleFormTime = 0;

const Signup = () => {
  const [enteredLoginEmail, setEnteredLoginEmail] = useState("");
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const toggleForm = () => {

    const currentTime = Date.now();
    if (currentTime - lastToggleFormTime < 700) return; 
    lastToggleFormTime = currentTime;

    setShowLogin(!showLogin);
    const formWrapper = document.querySelector(".card-3d-wrap");
    if (formWrapper.classList.contains("slide-out")) {
      formWrapper.classList.remove("slide-in");
      formWrapper.classList.add("slide-out");
      setTimeout(() => {
        formWrapper.classList.remove("slide-out");
      }, 650);
    } else {
      formWrapper.classList.remove("slide-out");
      formWrapper.classList.add("slide-in");
      setTimeout(() => {
        formWrapper.classList.remove("slide-in");
      }, 650);
    }
  };
  

  const submitHandler = (event, action) => {
    event.preventDefault();
    let userData = "";
    if (action === "login") {
      userData = {
        email: enteredLoginEmail,
        password: enteredLoginPassword,
      };
      setEnteredLoginEmail("");
      setEnteredLoginPassword("");
    } else {
      userData = {
        name: enteredName,
        email: enteredRegisterEmail,
        password: enteredRegisterPassword,
        birthDate: new Date(enteredBirthDate),
      };
      setEnteredRegisterEmail("");
      setEnteredRegisterPassword("");
      setEnteredName("");
      setEnteredBirthDate("");
    }
    console.log(userData);
  };
  const loginEmailHandler = (event) => {
    setEnteredLoginEmail(event.target.value);
  };
  const loginPasswordHandler = (event) => {
    setEnteredLoginPassword(event.target.value);
  };
  const registerEmailHandler = (event) => {
    setEnteredRegisterEmail(event.target.value);
  };
  const registerPasswordHandler = (event) => {
    setEnteredRegisterPassword(event.target.value);
  };
  const nameHandler = (event) => {
    setEnteredName(event.target.value);
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
                <div className="card-3d-wrap mx-auto ">
                  {showLogin && (
                    <div className="card-front ">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                              value={enteredLoginEmail}
                              onChange={loginEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                              value={enteredLoginPassword}
                              onChange={loginPasswordHandler}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <p className="mb-0 mt-2">
                            <a className="link" href="">Forgot your password?</a>
                          </p>
                          <button
                            type="submit"
                            className="btn mt-2"
                            onClick={(e) => submitHandler(e, "login")}
                          >
                            Login
                          </button>
                          <div class="container">
                            <div class="row"> 
                                <hr className="custom-hr"/>
                                <h6 className="separator-text">or</h6>
                                <hr className="custom-hr"/>
                            </div>
                          </div>
                          <GoogleLogin />
                          <p className="message">
                            Not registered?{" "}
                            <a href="#" onClick={toggleForm}>
                              Create an account
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
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Full Name"
                              value={enteredName}
                              onChange={nameHandler}
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Email"
                              value={enteredRegisterEmail}
                              onChange={registerEmailHandler}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Password"
                              value={enteredRegisterPassword}
                              onChange={registerPasswordHandler}
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Birthdate"
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
                            Register
                          </button>
                          <p className="message">
                            Already registered?{" "}
                            <a href="#" onClick={toggleForm}>
                              Sign In
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