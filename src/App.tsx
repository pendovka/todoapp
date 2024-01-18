import React, { useState } from "react";
import logo from "./logo.svg";
interface Item {
  id: string;
  body: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", body: "one" },
    { id: "2", body: "two" },
  ]);
  return (
    <div>
      <ul>
        {items.map((item) => {
          return <li>{item.body}</li>;
        })}
      </ul>
      <button title="add item">Add</button>
    </div>
  );
}

export default App;
