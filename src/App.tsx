import React, { useEffect, useState } from "react";
interface Item {
  body: string;
  id: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");
  const fetchItems = async () => {
    const response = await fetch("/.netlify/functions/get_items").then(
      (response) => response.json()
    );
    setItems(response);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const deleteItem = (item: Item) => {
    setItems(items.filter((i) => i !== item));
  };
  return (
    <div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
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
          setItems([...items, { id: "new", body: newItemName }]);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
