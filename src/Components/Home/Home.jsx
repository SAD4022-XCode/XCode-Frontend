import React, { useState, useEffect } from "react";
const Home = () => {
    useEffect(() => {
        //changing title of html pages dynamically
        document.title = "خانه";
      }, []);
    return (
        <center>
            <h1>Home Page</h1>
        </center>
    )

}
export default Home;