import React, { useState } from "react";
interface Item {
  body: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([
    { body: "one" },
    { body: "two" },
  ]);
  const [newItemName, setNewItemName] = useState<string>("");
  const deleteItem = (item: Item) => {
    setItems(items.filter((i) => i !== item));
  };
  return (
    <div>
      <ul>
        {items.map((item) => {
          return (
            <li>
              {item.body}
              <button onClick={() => deleteItem(item)}>x</button>
            </li>
          );
        })}
      </ul>
      <input
        value={newItemName}
        onChange={(event) => {
          setNewItemName(event.currentTarget.value);
        }}
      />
      <button
        title="add item"
        onClick={() => {
          setItems([...items, { body: newItemName }]);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
