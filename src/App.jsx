import "./App.css";
import AddItems from "./components/AddItems/AddItems";
import ItemList from "./components/ItemList/ItemList";
import Title from "./components/Title/Title";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddButton = (newItem) => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => {
      return i !== index;
    });
    setItems(filtered);
  };

  return (
    <>
      <div className="main-container">
        <div className="invoice-container">
          <Title />
          <AddItems
            onAddItem={handleAddButton}
            editItem={editIndex !== null ? items[editIndex] : null}
          />
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
