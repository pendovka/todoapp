import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState(['item1', 'item2', 'item3'])
  const [newItemName, setNewItemName] = useState('')
  return (
    <div className="App"> 
    <ul>
      {items.map((item)=>{
        return <li>
          {item}
        </li>
      })}
    </ul>
    <input value={newItemName} onChange={(event)=>{
      setNewItemName(event.currentTarget.value);
    }}
    placeholder="enter new item"
    />
    <button onClick={()=>{
      setItems([...items, newItemName])
      setNewItemName('')
    }}
    disabled={!newItemName}
    >
    add
    </button>

    </div>
  );
}

export default App;
