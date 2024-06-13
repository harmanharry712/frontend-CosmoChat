import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Chat from './components/Chat';


const App = () => {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <div className="App">
      {chatStarted ? <Chat /> : <LandingPage onStartChat={() => setChatStarted(true)} />}
    </div>
  );
};

export default App;
