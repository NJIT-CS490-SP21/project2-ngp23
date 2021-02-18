import logo from './logo.svg';
import './App.css';
import { ListItem } from './ListItem.js';
import { useState, useRef } from 'react';
import { Board } from './Board.js';


function App() {
  const [myList, changeList] = useState([]);
  const inputRef = useRef(null);


  function onClickButton() {
    const userText = inputRef.current.value;
    changeList(prevList => [...prevList, userText]);

  }

  return (
    <div >
    
      <Board/>
    </div>
  );
}

export default App;


// <h1>My favourites</h1>
// <input ref={inputRef} type= "text"/>
// <button onClick={onClickButton}>Add to list</button>
//   <ul>
//     {myList.map(item => <ListItem name ={item}/>)}
//   </ul>
