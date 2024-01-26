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

  updateItem: async (itemId: string, attributes: Omit<Item, "_id">) => {
    return await fetch(`/.netlify/functions/update_item?id=${itemId}`, {
      method: "put",
      body: JSON.stringify(attributes),
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

    &::placeholder {
      font-style: italic;
      color: #aaa;
    }

    &:focus {
      outline: none;
    }
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
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [editedItemBody, setEditedItemBody] = useState<string>("");
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const createItem = async (attributes: Omit<Item, "_id">) => {
    const newItems = await itemAPI.createItem(attributes);
    setItems(newItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (item: Item) => {
    setDeletingItemId(item._id);
    setItems(await itemAPI.deleteItem(item._id));
    setDeletingItemId(null);
  };

  const editItem = (itemId: string) => {
    setEditItemId(itemId);
  };

  const updateItem = async (itemId: string, attributes: Omit<Item, "_id">) => {
    setItems(await itemAPI.updateItem(itemId, attributes));
    setEditItemId(null);
  };

  if (!items) {
    return <div>В процессе...</div>;
  }

  return (
    <S.App>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item._id} style={{ marginBottom: 24 }}>
            {editItemId === item._id ? (
              <>
                <div>
                  <S.Input
                    value={editedItemBody}
                    placeholder="новое значение"
                    onChange={(event) =>
                      setEditedItemBody(event.currentTarget.value)
                    }
                  />
                </div>
                <button
                  disabled={updatingItemId === item._id}
                  onClick={async () => {
                    setUpdatingItemId(item._id);
                    await updateItem(item._id, { body: editedItemBody });
                    setUpdatingItemId(null);
                    setEditedItemBody("");
                  }}
                >
                  {updatingItemId === item._id ? "Впроцессе..." : "Обновить"}
                </button>{" "}
                <button onClick={() => setEditItemId(null)}>Отмена</button>
              </>
            ) : (
              <>
                <div>{item.body}</div>
                <button
                  disabled={deletingItemId === item._id}
                  onClick={() => deleteItem(item)}
                >
                  {deletingItemId === item._id ? "..." : "X"}
                </button>{" "}
                <button onClick={() => editItem(item._id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <S.Input
        value={newItemName}
        placeholder="Напишите..."
        onChange={(event) => setNewItemName(event.currentTarget.value)}
      />
      <button
        disabled={isCreatingItem}
        onClick={async () => {
          if (!newItemName) {
            alert("Ячейка не может быть пустой");
            return;
          }

          setIsCreatingItem(true);
          await createItem({ body: newItemName });
          setNewItemName("");
          setIsCreatingItem(false);
        }}
      >
        {isCreatingItem ? "Создание..." : "Создать"}
      </button>
    </S.App>
  );
}

export default App;
