import React, { useState, useEffect } from "react";
import Navbar  from "../Navbar/navbar";
const Home = () => {
    useEffect(() => {
        //changing title of html pages dynamically
        document.title = "ایونتیفای";
      }, []);
    return (
        <center>
            <Navbar />
            <h1 style={{paddingTop: "250px"}}>Home Page</h1>
        </center>
    )

}
export default Home;