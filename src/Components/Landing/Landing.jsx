import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services, Statistics } from "./services";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonials";
import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
import EventChart from "../Chart/chart";
import PercentagePieChart from "../Chart/pie_chart";
import "./Landing.css";
import axios from "axios";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
const Landing = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [websiteStatistics,setWebsiteStatistics] = useState({
    userCount:24000,
    satisficationPercentage:0.87,
    freeInperson:50,
    paidInperson:25,
    freeOnline:100,
    paidOnline:20
  });
  useEffect(() => {
    setLandingPageData(JsonData);
    let data = {
      userCount:24000,
      satisficationPercentage:0.87,
      freeInperson:50,
      paidInperson:25,
      freeOnline:100,
      paidOnline:20
    }
    // let data = axios.get("website statistics api");
    setWebsiteStatistics(data)
  }, []);

  return (
    <>
      <Navbar />
      <div className="landing">
        <div className="landing-container">
          <Header data={landingPageData.Header} />
          <Features data={landingPageData.Features} />
          <About data={landingPageData.About} />
          <Statistics data={websiteStatistics} />          
          <Gallery data={landingPageData.Gallery} />
          <Testimonials data={landingPageData.Testimonials} />
          {/* <Team data={landingPageData.Team} /> */}
          <Contact data={landingPageData.Contact} />
        </div>
      </div>
    </>
  );
};

export default Landing;
