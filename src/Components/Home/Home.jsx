import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Events from "../Events List/Events";
const Home = () => {
  const navigator = useNavigate();

  useEffect(() => {
    //changing title of html pages dynamically
    document.title = "ایونتیفای";
  }, []);
  return (
    <center>
      <Navbar />
      <div className="home-page">
        <h1 style={{ paddingTop: "250px" }}>Home Page</h1>
        <Events />
      </div>
    </center>
  );
};
export default Home;
