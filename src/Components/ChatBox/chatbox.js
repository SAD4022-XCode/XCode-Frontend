import React, { useState, useRef,useEffect  } from 'react';
import { MessageBox, MessageList, Input, Avatar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import styled from 'styled-components';
import { ArrowBack, Send } from '@material-ui/icons';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        position: 'right',
        type: 'text',
        text: inputValue,
        date: new Date(),
        sender: 'You',
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
      // Adding a simulated response from another user
      setTimeout(() => {
        const responseMessage = {
          position: 'left',
          type: 'text',
          text: 'This is a response.',
          date: new Date(),
          sender: 'Bot',
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);

      }, 1000);

    }
  };

  const handleBackClick = () => {
    console.log('Back button clicked');
  };
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatContainer>
      <HeaderContainer>
        <BackButton onClick={handleBackClick}>
          <ArrowBack />
        </BackButton>
        <Avatar
          src='https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg'
          alt='Profile Picture'
          size='large'
          type='circle'
        />
        <UserInfo>
          <UserName>Chatbot</UserName>
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
            text: msg.text,
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
  );
};

export default ChatBox;



