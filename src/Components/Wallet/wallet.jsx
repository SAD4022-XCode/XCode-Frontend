import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import './wallet.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Backdrop from '@mui/material/Backdrop';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 50,
  // opacity: 0.4,
  // pt: 2,
  // px: 4,
  // pb: 3,
  // direction:"rtl"
};

export default function Wallet() {
  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState(2500000);
  const [chargeValue, setChargeValue] = useState(null);

  

  const handleOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChipClick = (value) => {
    setChargeValue(value)
  }
  const handleIncrement = () => {
    if(chargeValue<990001){
      setChargeValue(chargeValue + 10000);
    }
  };

  const handleDecrement = () => {
    if (chargeValue > 9999) {
      setChargeValue(chargeValue - 10000);
    }
  };
  const handleChargeValue = (event) => {
    if(event.target.value<1000001 && event.target.value>0){
      setChargeValue(event.target.value);
    }
  }
  const chargeWallet = (event) => {
    // toast.success("موجودی حساب شما با موفقیت افزایش پیدا کرد")

    axios.post('http://127.0.0.1:8000/chargeWallet/', chargeValue,
      {headers:{
          "Content-Type": "application/json",
          accept: "application/json"
      }})
    .then(response => {
        console.log('Data sent successfully:', response.data);
        toast.success("موجودی حساب شما با موفقیت افزایش پیدا کرد")
        navigator('/home')
    })
    .catch(error => {
        console.error('Error sending data:', error);
        toast.error("خطا در برقراری ارتباط با سرور")

    });
  }

  return (
    <div>
      <ToastContainer className="toastify-container" position="top-right" toastStyle={{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"100px"}} pauseOnHover={false} autoClose={3000} />

      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{ backdropFilter: 'blur(0.5px)' }}
      >
        <Box sx={{ ...style, width: 400,height:350 }}>
          
          <div className='walletmodal'>

            <div className="section">
              <div className="container">
                <div className="row  justify-content-center">
                  <div className="col-12 text-center align-self-center px-0">
                    <div className="section  text-center">
                      <div className="card-3d-wrap mx-auto " style={{height:"360px"}}>
                          <div className="card-front">
                            <div className="center-wrap">
                              <div className="section text-center">
                              <h4 className="pb-0 mb-0 text-right"><CloseOutlinedIcon onClick={handleClose} style={{cursor:'pointer'}}/></h4>
                              <h4 className="pb-2 mb-0">شارژ کیف پول</h4>
                              <p className="mb-1">مبلغ موردنظر را وارد یا انتخاب کنید</p>

                              <Stack direction="row" spacing={1} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',justifyContent:"center" }}>
                              <Chip
                                  label="50,000"
                                  onClick={() => handleChipClick(50000)}
                                  color="primary"
                                  deleteIcon={chargeValue==50000?<DoneIcon />:null}
                                  avatar={<Avatar>$</Avatar>}
                                  style={{marginTop:"5px"}}
                                />
                                <Chip
                                  label="100,000"
                                  onClick={() => handleChipClick(100000)}
                                  color="primary"
                                  deleteIcon={chargeValue==100000?<DoneIcon />:null}
                                  avatar={<Avatar>$</Avatar>}
                                  style={{marginTop:"5px"}}
                                />
                                <Chip
                                  label="200,000"
                                  onClick={() => handleChipClick(200000)}
                                  color="primary"
                                  deleteIcon={chargeValue !== 200000 ? null : <DoneIcon />}
                                  avatar={<Avatar>$</Avatar>}
                                  style={{marginTop:"5px"}}

                                />
                                <Chip
                                  label="500,000"
                                  onClick={() => handleChipClick(500000)}
                                  color="primary"
                                  deleteIcon={chargeValue==500000?<DoneIcon />:null}
                                  avatar={<Avatar>$</Avatar>}
                                  style={{marginTop:"5px"}}
                                />
                                <Chip
                                  label="1,000,000"
                                  onClick={() => handleChipClick(1000000)}
                                  color="primary"
                                  deleteIcon={chargeValue==1000000?<DoneIcon />:null}
                                  avatar={<Avatar>$</Avatar>}
                                  style={{marginTop:"5px"}}
                                />
                              </Stack>

                              <div className="text-right">
                                <p className="mb-1 mt-2">مبلغ شارژ</p>
                                <div className="form-group mb-1" style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={handleDecrement}  style={{ color: '#ff0000', outline: 'none' }}>
                                  <RemoveIcon />
                                </IconButton>
                                  <input
                                    value={chargeValue}
                                    onChange={handleChargeValue}
                                    dir="rtl"
                                    type="number"
                                    className="form-style-ce"
                                    placeholder="100000"
                                  />
                                   <IconButton onClick={handleIncrement} style={{ color: '#00ff00', outline: 'none' }}>
                                    <AddIcon />
                                  </IconButton>
                                </div> 
                                <p className='message text-center' style={{fontSize:"10px",marginTop:"0px",marginBottom:"5px"}}>مبلغ وارد شده باید بین از 10,000 تا 1,000,000 باشد</p>
                              </div>
                                <button
                                  type="submit"
                                  className="btn mt-2"
                                  onClick={chargeWallet}
                                >
                                  افزایش شارژ  
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
        </Box>
      </Modal>
    </div>
  );
}


