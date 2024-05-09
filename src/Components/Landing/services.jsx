import React from "react";
import EventChart from "../Chart/chart";
import DoghnutChart from "../Chart/pie_chart";
import GaugeChart from 'react-gauge-chart';

export const Statistics = (statistics) => {
  const handleSta = () =>{
    console.log(statistics);
  }
  return (
    <div id="services" className="text-center">
      <div className="container">
        {/* <div className="section-title"> */}
        <div>
          <h2 style={{color:"#ffeba7"}}>آمارهای سایت</h2>
          <p>
            شما در این بخش سایت می توانید آخرین آمار مربوط به کاربران و رویداد ها را مشاهده کنید
          </p>
        </div>
        <div className="row">
          <div className="col-md-4 mt-sm-4 d-flex flex-column align-items-center">
            <h3 >بیش تر از{statistics.data.userCount}  کاربر ایونتیفای را برای برگزاری رویداد و شرکت در آن انتخاب کرده اند</h3>
            <div style={{height:"50px"}}></div>
            <GaugeChart id="gauge-chart3"
                  nrOfLevels={20} 
                  percent={statistics.data.satisficationPercentage} 
                />
                   <p style={{fontSize:"12px"}}>
 رضایت کاربران
           </p> 
            <div style={{height:"50px"}}></div>
                
            
          </div>
          <div className="col-md-4 mt-sm-4 d-flex flex-column align-items-center">
            <h3>  نوع رویدادها </h3>
            <DoghnutChart value1={statistics.data.paidOnline+statistics.data.freeOnline} value2={statistics.data.paidInperson+statistics.data.freeInperson} />
          </div>

          <div className="col-md-4 mt-sm-4 d-flex flex-column align-items-center">
          <h3>تعداد رویدادهای رایگان و پولی </h3>

            <EventChart paidOnline={statistics.data.paidOnline} paidInperson={statistics.data.paidInperson} freeOnline={statistics.data.freeOnline} freeInperson={statistics.data.freeInperson} />
          </div> 
        </div>
      </div>
    </div>
  );
};




























// import React from "react";

// export const Services = (props) => {
//   return (
//     <div id="services" className="text-center">
//       <div className="container">
//         <div className="section-title">
//           <h2>Our Services</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
//             dapibus leonec.
//           </p>
//         </div>
//         <div className="row">
//           {props.data
//             ? props.data.map((d, i) => (
//                 <div key={`${d.name}-${i}`} className="col-md-4">
//                   {" "}
//                   <i className={d.icon}></i>
//                   <div className="service-desc">
//                     <h3>{d.name}</h3>
//                     <p>{d.text}</p>
//                   </div>
//                 </div>
//               ))
//             : "loading"}
//         </div>
//       </div>
//     </div>
//   );
// };

