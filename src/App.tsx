import React, { useEffect, useState } from "react";
interface Item {
  body: string;
  id: string;
}

function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");
  const fetchItems = async () => {
    const response = await fetch("/.netlify/functions/get_items").then(
      (response) => response.json()
    );
    setItems(response);
  };

  const createItem = async (attributes: Omit<Item, "id">) => {
    const response = await fetch("/.netlify/functions/create_item", {
      method: "post",
      body: JSON.stringify(attributes),
    }).then((r) => r.json());
    setItems(response);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = (item: Item) => {
    setItems(items && items.filter((i) => i !== item));
  };

  if (!items) {
    return <div>Loading...</div>;
  }

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
          createItem({ body: newItemName });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default App;
