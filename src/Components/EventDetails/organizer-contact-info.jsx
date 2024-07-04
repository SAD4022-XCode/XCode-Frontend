import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./organizer-contact-info.css"
import Picker from "emoji-picker-react"
// import Picker from '@emoji-mart/react'
// import EmojiPicker from "./emojiPicker"
import EmojiModal from "./emojiPicker"
import {toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../Authentication/authProvider";


const OrganizerInfoModal = ({show,handleClose,email,phone,id}) => {
    const auth = useAuth();
    const navigator=useNavigate();
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const [input, setInput] = useState("");
    const [placeHolder, setPlaceHolder] = useState("پیام خود را وارد کنید...")

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
      };

    // const showEmojiPicker = () => {
    //     return(
    //             <Picker onSelect={addEmoji} />
    //     )
    // }

      const pasteClipboard = (e) =>{
        // const pastedText = await navigator.clipboard.read();
        // setInput(pastedText)    

      }

    
    const sendMessageHandler = async () =>{
      let sendingMessage = {
        content: input,
        recipient:id.toString(),
      }
      console.log("sending message:",sendingMessage)
      try {
        let response =await axios.post('https://eventify.liara.run/messages/', sendingMessage, {
          headers: {
            Authorization:`JWT ${auth.token}`,
          }
        });
        console.log('Message sent successfully');
        
        toast.success('پیام شما برای برگزارکننده ارسال شد', {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          autoClose:3000,
          toastStyle:{backgroundColor: "#2b2c38", fontFamily: "iransansweb", color: "#ffeba7",marginTop:"60px"}
          });
          setIsInputDisabled(true);
          const inputted_text = input
          setInput("");
          setPlaceHolder("میتوانید گفت و گو را از صفحه پروفایل ادامه دهید")
          // setTimeout(() => {
          //     navigator('/chat');
          // }, 2500);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

    return (            
      <Modal show={show} onHide={handleClose} style={{paddingTop:"15%",direction:"rtl"}} >
        <Modal.Header >
          <Modal.Title>اطلاعات تماس با برگزارکننده</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row text-right">
                <div className="col">
                    تلفن: {phone}
                </div>
                <div className="col">
                    ایمیل: {email}
                </div>
            </div>
            {/* <EmojiModal onSelect={addEmoji}/> */}

        <div id="chat">
            <div class="chat__conversation-panel">
                <div class="chat__conversation-panel__container">
                    {/* {<button class="chat__conversation-panel__button panel-item btn-icon add-file-button">
                        <svg class="feather feather-plus sc-dnqmqq jxshSx" 
                             xmlns="http://www.w3.org/2000/svg"
                             width="24" 
                             height="24" 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             stroke-width="2" 
                             stroke-linecap="round" 
                             stroke-linejoin="round" 
                             aria-hidden="true">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>}    */}

                    {<button class="chat__conversation-panel__button panel-item btn-icon emoji-button" 
                            onClick={pasteClipboard}>
                        
                        <i class="bi bi-clipboard"></i>
                        {/* <svg 
                            //  class="feather feather-smile sc-dnqmqq jxshSx" 
                             class="bi bi-clipboard"
                             xmlns="http://www.w3.org/2000/svg" 
                             width="24" 
                             height="24" 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             stroke-width="2" 
                             stroke-linecap="round" 
                             stroke-linejoin="round" 
                             aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg> */}
                    </button>}
                    <input class="chat__conversation-panel__input panel-item" 
                           id="chat__conversation-panel__input"
                           placeholder={placeHolder}
                           data-sider-insert-id="f150c758-358b-484c-86b5-22f159d21feb" 
                           data-sider-select-id="a26064b0-70a0-4be6-8ee3-f4b882df3705"
                           value={input}
                           onChange={(e) => setInput(e.target.value)}
                           type="text"
                           disabled={isInputDisabled}/>
                    <button class="chat__conversation-panel__button panel-item btn-icon send-message-button" 
                    onClick={sendMessageHandler}
                    disabled={isInputDisabled}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             width="24" 
                             height="24" 
                             viewBox="0 0 24 24" 
                             fill="none" 
                             stroke="currentColor" 
                             stroke-width="2" 
                             stroke-linecap="round" 
                             stroke-linejoin="round" 
                             aria-hidden="true" 
                             data-reactid="1036">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                {/* {showEmojis && showEmojiPicker()} */}
                

                </div>
            </div>
        </div>

        </Modal.Body>

        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>

    
  );
}

export default OrganizerInfoModal;