import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

import ListItem from './ListItem';

const socket = io();
function ChatBox() {
  const [messages, setMessage] = useState([]);
  const inputRef = useRef(null);
  function onClickButton() {
    if (inputRef != null) {
      const message = inputRef.current.value;
      setMessage((prevMessage) => [...prevMessage, message]);
      socket.emit('chat', { messages: message });
    }
  }
  useEffect(() => {
    socket.on('chat', (data) => {
      setMessage((prevMessage) => [...prevMessage, data.messages]);
    });
  }, []);
  return (
    <div>
      <h2 className="chattxt">Chat Box</h2>
      <input className="chat" type="text" ref={inputRef} />
      <button className="send" type="submit" onClick={onClickButton}>
        send
      </button>
      <ul>
        {messages.map((item, index) => (
          <ListItem key={index} name={item} />
        ))}
      </ul>
    </div>
  );
}

export default ChatBox;
