import React, { useState } from "react";
import logo from "./logo.svg";

function App() {
  const [items, setItems] = useState([
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
    </div>
  );
}

export default App;
