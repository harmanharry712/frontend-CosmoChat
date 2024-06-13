import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatMessage from './ChatMessage';
import { getOpenAIResponse } from '../api';
import { IoSend } from 'react-icons/io5';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Update with your server URL if necessary

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: calc(100% - 50px);
  margin-right: 10px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4caf50;
  font-size: 1.5rem;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const reply = await getOpenAIResponse(input);
      const botMessage = { text: reply, user: false };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      socket.emit('chat message', botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContainer>
      <Header>
        <Avatar src="path/to/avatar.png" alt="ReX Avatar" />
        <HeaderTitle>ReX</HeaderTitle>
      </Header>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </MessagesContainer>
      <InputContainer>
        <TextInput
          type="text"
          placeholder="Type a message to ReX..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendButton onClick={sendMessage}>
          <IoSend />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;
