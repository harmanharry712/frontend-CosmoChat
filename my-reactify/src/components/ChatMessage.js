import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 20px;
  max-width: 80%;
  word-wrap: break-word;
  background-color: ${(props) => (props.$user ? '#006EFF' : '#ECECEC')};
  color: ${(props) => (props.$user ? 'white' : 'black')};
  align-self: ${(props) => (props.$user ? 'flex-end' : 'flex-start')};
`;

const ChatMessage = ({ message }) => {
  return (
    <Message $user={message.user}>
      {message.text}
    </Message>
  );
};

export default ChatMessage;
