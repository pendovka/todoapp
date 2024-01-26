import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

const S = {
  App: styled.div`
    font-size: 38px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
  `,

  Input: styled.input`
    font-size: inherit;
    font-family: inherit;
    border: 0;
    border-bottom: 1px solid #000;
  `,
};

function App() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [newItemName, setNewItemName] = useState<string>("");
  const [isCreatingItem, setIsCreatingItem] = useState<boolean>(false);
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
    <S.App>
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
      <S.Input
        value={newItemName}
        placeholder="Напишите"
        onChange={(event) => {
          setNewItemName(event.currentTarget.value);
        }}
      />
      <button
        title="add item"
        disabled={isCreatingItem}
        onClick={async () => {
          if (!newItemName) {
            alert("Напишите что-нибудь");
            return;
          }

          setIsCreatingItem(true);
          await createItem({ body: newItemName });
          setIsCreatingItem(false);
          setNewItemName("");
        }}
      >
        {isCreatingItem ? "Создание..." : "Создать"}
      </button>
    </S.App>
  );
}

export default App;
