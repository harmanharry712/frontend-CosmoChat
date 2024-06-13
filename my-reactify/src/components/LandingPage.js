import React from 'react';
import styled from 'styled-components';
import avatarImage from '../assets/Avatar.jpeg'; // Make sure to update this path

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  text-align: center;
  padding: 20px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const StartChatButton = styled.button`
  background: linear-gradient(135deg, #6e5ae6 0%, #b14cff 100%);
  border: none;
  border-radius: 25px;
  color: white;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #5a4ac4 0%, #a140e1 100%);
  }
`;

const LandingPage = ({ onStartChat }) => {
  return (
    <LandingContainer>
      <Avatar src={avatarImage} alt="ReX Avatar" />
      <Title>Welcome, Andrew! 👋</Title>
      <Subtitle>Receive Career Help from ReX! Start a conversation with ReX right now!</Subtitle>
      <StartChatButton onClick={onStartChat}>Start Chat with ReX</StartChatButton>
    </LandingContainer>
  );
};

export default LandingPage;
