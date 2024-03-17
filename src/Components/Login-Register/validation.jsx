import { useState} from "react";
import Signup from "./Signup";

const Validation = () => {
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

  //Login validation
  //--------------------------------------------------------------------------------------------------
  const loginEmailHandler = (event) => {
    if(showViolations===true){
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredLoginEmail(event.target.value);
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
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredLoginPassword(event.target.value);
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
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredRegisterEmail(event.target.value);
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
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredRegisterPassword(event.target.value);
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
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredRegisterPassword2(event.target.value);
    if(event.target.value!==Signup.enteredRegisterPassword){
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
      setAutoHeight(autoHeight-violationNumber*8);
    }
    setViolationNumber(0);
    setShowViolation(false)
    Signup.setEnteredName(event.target.value);
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
    Signup.setEnteredBirthDate(event.target.value);
  };

}

export default Validation;