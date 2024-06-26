// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import "./organizer-contact-info.css"
// // import Picker from '@emoji-mart/react'
// import Picker from "emoji-picker-react"

// const EmojiPicker = () =>{

//     return(
//         <Picker/>
//     )

// }

// export default EmojiPicker


import Picker from "emoji-picker-react";
import {React,  Component } from "react";

class EmojiModal extends Component{
    render() {
        return <div>
            <Picker/>
        </div>;
    }
}
export default EmojiModal;