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
  const [editItemId, setEditItemId] = useState<string | null>(null);

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

  const editItem = (itemId: string) => {
    setEditItemId(itemId);
  };

  const updateItem = async (editedItem: Item) => {
    setEditItemId(null);
  };

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <S.App>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editItemId === item._id ? (
              <>
                <S.Input
                  value={newItemName}
                  placeholder="Enter updated value"
                  onChange={(event) =>
                    setNewItemName(event.currentTarget.value)
                  }
                />
                <button
                  title="Update item"
                  onClick={() => {
                    updateItem({ ...item, body: newItemName });
                    setNewItemName(""); // Clear the input after updating
                  }}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                {item.body}
                <button onClick={() => deleteItem(item)}>Delete</button>
                <button onClick={() => editItem(item._id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <S.Input
        value={newItemName}
        placeholder="Enter new item"
        onChange={(event) => setNewItemName(event.currentTarget.value)}
      />
      <button
        title="Add item"
        disabled={isCreatingItem}
        onClick={async () => {
          if (!newItemName) {
            alert("Enter something");
            return;
          }

          setIsCreatingItem(true);
          await createItem({ body: newItemName });
          setIsCreatingItem(false);
          setNewItemName("");
        }}
      >
        {isCreatingItem ? "Adding..." : "Add"}
      </button>
    </S.App>
  );
}

export default App;
