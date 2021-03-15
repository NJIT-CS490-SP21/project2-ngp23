import './App.css';
import React, { useState } from 'react';
import io from 'socket.io-client';
import Board from './Board';
import Login from './Login';

const socket = io(); // Connects to socket connection

function App() {
  const [login, islogin] = useState(false);
  const [tempUser, tempSetUser] = useState('');

  const tempLogin = (username) => {
    tempSetUser(username);
    islogin(() => !login);

    socket.emit('login', { setUser: username });
    socket.emit('leaderboard');
  };
  if (!login && tempUser === '') {
    return (
      <div>
        <h1 className="txtCenter">Enter the username:</h1>
        <Login login={tempLogin} />
      </div>
    );
  }
  return (
    <div>
      <p className="txtNext">
        Your user Name is :
        {tempUser}
      </p>

      <Board tempUser={tempUser} />
    </div>
  );
}

export default App;
