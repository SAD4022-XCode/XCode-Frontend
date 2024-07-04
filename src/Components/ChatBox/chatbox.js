import React, { useState, useRef,useEffect  } from 'react';
import { MessageBox, MessageList, Input, Avatar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import styled from 'styled-components';
import { ArrowBack, Send } from '@material-ui/icons';
import axios from 'axios';
import ProfileSidebar from "../Profile/ProfileSidebar/profileSidebar";
import Navbar from "../Navbar/navbar";
import './chatbox.css'
import { useAuth } from "../Authentication/authProvider";



const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 65px);
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const UserInfo = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const UserStatus = styled.div`
  font-size: 12px;
  color: grey;
`;

const StyledMessageBox = styled(MessageBox)`
  max-width: 80% !important; /* حداکثر 80 درصد عرض */
  word-break: break-word;
`;

const SentMessageBox = styled(MessageBox)`
  background-color: #DCF8C6 !important;
  color: #000 !important;
  max-width: 80% !important;
  align-self: flex-end !important;
`;

const ReceivedMessageBox = styled(MessageBox)`
  background-color: #FFF !important;
  color: #000 !important;
  max-width: 80% !important;
  align-self: flex-start !important;
`;




const ChatBox = ({setShowChatBox, userName, conversationId, profile, userId}) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || "");
  const username=userData.user.username;
  const myId=userData.user.id;
  const auth = useAuth();
  const [mockMessages, setMockMessages] = useState( [
    {
      sender:username,
      receiver:userName,
      date:"Sun Jun 02 2023 16:55:32 GMT+0330 (Iran Standard Time)",
      text:"msg 1"
    },
    {
      sender:userName,
      receiver:username,
      date:"Sun Jun 02 2024 18:55:32 GMT+0330 (Iran Standard Time)",
      text:"msg 2"
    },
    {
      sender:userName,
      receiver:username,
      date:"Sun Jun 02 2024 19:55:32 GMT+0330 (Iran Standard Time)",
      text:"msg 3"
    },
    {
      sender:username,
      receiver:userName,
      date:"Sun Jun 02 2024 20:55:32 GMT+0330 (Iran Standard Time)",
      text:"msg 4"
    },
  ]
  
  );
  const [messages, setMessages] = useState([])
  
  const receiver = "ali"
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const [marginRight, setMarginRight ] =useState()
  const fetchMessages = async () => {
    console.log("5000 ms")
    try{
      let response = await axios.get(
        `https://eventify.liara.run/conversations/${conversationId}/message_history`,
        {
          headers: {
            Authorization:`JWT ${auth.token}`,
          }
        }
      )
      // console.log(auth.token)
      setMessages([])
      // console.log("mock messages:",mockMessages)
      response.data.forEach((message, index) => {    
        message.type="text"      
        // console.log("my message:\n",message)
        if (message.sender===myId){
          message.sender=username
          message.position="right"
        }else{ 
          // console.log("username of chat:",userName)
          message.sender=userName
          message.position="left"
        }
        setMessages((prevMessages) => [...prevMessages, message]);
      })
     
    }catch(e){
      console.log("error in chatbox",e)
    }
  }


  const handleSend = async() =>{
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        date: new Date(),
        sender: username,
        receiver:"akbar",
        position:"right",
        type:"text"
      };
      const sendingMessage = {
        content: inputValue,
        recipient:userId.toString(),
      }
      setMessages([...messages, newMessage]);

      setInputValue('');
      try {
        let response =await axios.post('https://eventify.liara.run/messages/', sendingMessage, {
          headers: {
            Authorization:`JWT ${auth.token}`,
          }
        });
        console.log('Message sent successfully');
        fetchMessages();
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

  };

  const handleBackClick = () => {
    setShowChatBox(false)
    console.log('Back button clicked');
  };

  useEffect(() =>{
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);

  },[])

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth>1600){
        setMarginRight("260px")
      }else if(window.innerWidth>993){
        setMarginRight("12%")
      }else if(window.innerWidth>768){
        setMarginRight("15%")
      }else{
        setMarginRight("7%")
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
    {/* <Navbar />
    <ProfileSidebar/> */}
    <ChatContainer style={{marginRight:marginRight,marginLeft:"0%"}}>
      <HeaderContainer>
        <BackButton onClick={handleBackClick}>
          <ArrowBack />
        </BackButton>
        <Avatar
          src={profile}
          alt='Profile Picture'
          size='large'
          type='circle'
        />
        <UserInfo>
          <UserName style={{color: "#ffeba7"}}>{userName}</UserName>
          <UserStatus>Online</UserStatus>
        </UserInfo>
      </HeaderContainer>
      <MessagesContainer>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages.map((msg) => ({
            position: msg.position,
            type: msg.type,
            text: msg.content,
            date: msg.date,
            title: msg.sender,
            className: msg.position === 'right' ? SentMessageBox : ReceivedMessageBox,
          }))}
        />
        <div ref={messagesEndRef} />

      </MessagesContainer>
      <InputContainer>
        <Input
          placeholder='Type here...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          rightButtons={
            <Send
              onClick={handleSend}
              style={{ cursor: 'pointer', color: 'black' }} // اضافه کردن استایل برای نشان دادن آیکن قابل کلیک
            />
          }
        />
      </InputContainer>
    </ChatContainer>
    </>
  );
};

export default ChatBox;












