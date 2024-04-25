import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './wallet.css'
const Wallet = ({openModel, setOpenModel}) => {

    return (
     <div className="walletModal">
         <div className="container">
           <div className="row justify-content-center">
             <div className="col-12 text-center align-self-center">
               <div className="section  pt-sm-2 mb-5 text-center">
                 <div className="card-3d-wrap mx-auto " style={{height:"310px"}}>
                     <div className="card-front ">
                       <div className="center-wrap">
                         <div className="section text-center">
                           <h4 className="mb-4 pb-3">کیف پول</h4>
                           <button
                             type="submit"
                             className="btn mt-2"
                             onClick={() => setOpenModel(!openModel)}
                           >
                             ارسال ایمیل بازیابی
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
    )
};
export default Wallet;
