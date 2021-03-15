// imports all needed libraries
import './Board.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import BoardMake from './BoardMake';
import Winner from './Winner';
import LeaderBoard from './LeaderBoard';
import ChatBox from './ChatBox';

const socket = io(); // Connects to socket connection
function Board({ tempUser }) {
  // setup the state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [user, setUser] = useState({ X: '', O: '', spec: [] });
  // const to checl the state.
  const [state2, setState2] = useState(1);
  const [check, setcheck] = useState(true);
  const [chat, setchat] = useState(false);
  const [lead, setLead] = useState([]);

  // onclick button function
  function onClickButton(index) {
    // variable to store the targer innerHtml

    let win;
    let lose;
    const userClick = [...board];
    // If statement checks if the box is empty or not if empty then only procide.
    if (Winner(board)) {
      alert('Already one winner, reset the game to play.');
      return;
    }
    if (!userClick[index]) {
      if (tempUser === user.X) {
        // if state is 1 then its gives X as value
        if (state2 === 1) {
          userClick[index] = 'X';
          // changes the state to 0 for the O in next box
          setState2(0);
          setBoard(userClick);
          socket.emit('click', { userClick, setState2: state2 });
        } else {
          alert('wait for your turn');
        }
        // socket.emit("resetStats",{setWin:win,setLose:lose});
      } else if (tempUser === user.O) {
        // O value is printed out
        if (state2 === 0) {
          userClick[index] = 'O';
          // changes the state to 1 for the x in next box
          setState2(1);
          setBoard(userClick);
          socket.emit('click', { userClick, setState2: state2 });
        } else {
          alert('wait for your turn');
        }
      } else {
        alert('Game in progress!');
      }
    }
    // else{alert("Invalid box")}
    const winner = Winner(userClick);

    if (winner && winner !== 'draw') {
      if (winner === 'X') {
        win = user.X;
        lose = user.O;
      } else {
        win = user.O;
        lose = user.X;
      }
      socket.emit('resetStats', { setWin: win, setLose: lose });
    }
  }

  useEffect(() => {
    socket.on('click', (data) => {
      setBoard([...data.userClick]);
      if (data.setState2 === 0) {
        setState2(1);
      } else {
        setState2(0);
      }
    });
    socket.on('login', (login) => {
      Object.keys(login).map((item) => setUser((prev) => ({ ...prev, [item]: login[item] })));
    });

    socket.on('reset', (data) => {
      setBoard([...data.userClick]);
      if (data.setState2 === 0) {
        setState2(1);
      } else {
        setState2(0);
      }
    });

    socket.on('resetStats', (data) => {
      setLead(data);
    });
  }, []);

  const winner = Winner(board);
  let status;

  if (winner && winner !== 'draw') {
    status = `winner is ${winner}`;
  } else if (winner && winner === 'draw') {
    status = ' No winner game draw';
  } else {
    status = `Next Player: ${state2 === 1 ? 'X' : 'O'}`;
  }

  const reset = () => {
    const userClick = [...board];
    userClick.fill(null);
    setBoard(userClick);
    if (state2 === 0) {
      setState2(1);
    } else {
      setState2(0);
    }
    socket.emit('reset', { userClick, setState2: state2 });
  };
  const operation = () => {
    setcheck(!check);
  };
  const chatOperation = () => {
    setchat(!chat);
  };

  return (
    // renders to the BoardMake.js
    <div>
      <p className="txtNext">
        {status}
        <br />
      </p>
      <div>
        <center>
          {tempUser === user.X && (
            <button className="buttonR" onClick={reset} type="button">
              Reset
            </button>
          )}
        </center>
        <center>
          {tempUser === user.O && (
            <button className="buttonR" onClick={reset} type="button">
              Reset
            </button>
          )}
        </center>
      </div>
      <div className="txt">
        <h2 className="txtplayer">Player username </h2>
        <p className="txtplayer">
          Player X is :
          {user.X}
        </p>
        <p className="txtplayer">
          Player O is :
          {user.O}
        </p>
        <p className="txtspec">Spectators</p>
        {user.spec.map((player) => (
          <p className="txtspec">{player}</p>
        ))}
      </div>

      <div>
        <button className="hideButton" type="submit" onClick={operation}>
          Click to Hide
        </button>
        {check ? (
          <div>
            <LeaderBoard lead={lead} tempUser={tempUser} />
          </div>
        ) : null}
      </div>
      <div className="board">
        {board.map((item, index) => (
          <BoardMake onClickButton={() => onClickButton(index)} item={item} />
        ))}
      </div>
      <div>
        <div>
          <button className="chat" type="submit" onClick={chatOperation}>
            Click to chat
          </button>
          {chat ? (
            <div>
              <ChatBox />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
Board.propTypes = {
  tempUser: PropTypes.string.isRequired,
};

export default Board;
