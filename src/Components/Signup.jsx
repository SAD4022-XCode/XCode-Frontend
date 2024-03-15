import React, { useState } from "react";
import "./Signup.css";
const Signup = () => {
  const [enteredLoginEmail, setEnteredLoginEmail] = useState("");
  const [enteredRegisterEmail, setEnteredRegisterEmail] = useState("");
  const [enteredLoginPassword, setEnteredLoginPassword] = useState("");
  const [enteredRegisterPassword, setEnteredRegisterPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredBirthDate, setEnteredBirthDate] = useState("");
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
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
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
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={(e) => submitHandler(e, "login")}
                          >
                            Login
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </div>
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
                        </div>
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
};

export default Signup;
