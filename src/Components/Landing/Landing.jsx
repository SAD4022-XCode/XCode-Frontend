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
  const [isLoading, setIsLoading] = useState(false)
  const [websiteStatistics,setWebsiteStatistics] = useState();
  useEffect(() => {
    async function fetchWebsiteData() {
      try {
        const response = await axios.get(`https://eventify.liara.run/analytics/`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        let data = {
          userCount:response.data.registered_users,
          satisficationPercentage:0.87,
          freeInperson:response.data.free_inperson_events,
          paidInperson:response.data.paid_inperson_events,
          freeOnline:response.data.free_online_events,
          paidOnline:response.data.paid_online_events
        }

  // let data = axios.get("website statistics api");
        setWebsiteStatistics(data)
        setIsLoading(true)
      } catch (error) {
          
        console.error("An error occurred:", error);
          
      }
    }
    fetchWebsiteData()
    setLandingPageData(JsonData);
    
  }, []);

  return (
    <>
      <Navbar />
      <div className="landing">
        <div className="landing-container">
          <Header data={landingPageData.Header} />
          <Features data={landingPageData.Features} />
          <About data={landingPageData.About} />
          {isLoading && <Statistics data={websiteStatistics} />}
          {/* <Gallery data={landingPageData.Gallery} /> */}
          <Testimonials data={landingPageData.Testimonials} />
          {/* <Team data={landingPageData.Team} /> */}
          <Contact data={landingPageData.Contact} />
        </div>
      </div>
    </>
  );
};

export default Landing;
