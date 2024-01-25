import React, { useEffect, useState } from "react";
interface Item {
  body: string;
  _id: string;
}

const itemAPI = {
  createItem: async (attributes: Omit<Item, "_id">) => {
    return await fetch("/.netlify/functions/create_item", {
      method: "post",
      body: JSON.stringify(attributes),
    }).then((r) => r.json());
  },

  fetchItems: async () => {
    return await fetch("/.netlify/functions/get_items").then((response) =>
      response.json()
    );
  },

  deleteItem: async (itemId: string) => {
    return await fetch(`/.netlify/functions/delete_item?id=${itemId}`, {
      method: "delete",
    }).then((response) => response.json());
  },
};

function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");
  const fetchItems = async () => {
    const newItems = await itemAPI.fetchItems();
    setItems(newItems);
  };

  const createItem = async (attributes: Omit<Item, "_id">) => {
    const newItems = await itemAPI.createItem(attributes);
    setItems(newItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (item: Item) => {
    setItems(await itemAPI.deleteItem(item._id));
  };

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item._id}>
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
