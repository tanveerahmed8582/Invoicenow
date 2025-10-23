import { useState } from "react";
import "./AddItems.css";
import { useEffect } from "react";

const AddItems = ({ onAddItem, editItem }) => {
  const [itemName, setItemName] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editItem) {
      setItemName(editItem.itemName);
      setRate(editItem.rate);
      setQuantity(editItem.quantity);
    }
  }, [editItem]);

  const total = rate && quantity ? rate * quantity : "";

  const handleAddClick = () => {
    if (!itemName || !rate || !quantity) {
      alert("Please fill All feilds!!");
      return;
    }

    const newItem = {
      itemName,
      rate: Number(rate),
      quantity: Number(quantity),
      total: Number(total),
    };

    onAddItem(newItem);

    setItemName("");
    setRate("");
    setQuantity("");
  };

  return (
    <div className="additems">
      <input
        type="text"
        placeholder="Enter Item Name"
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Enter Rate"
        value={rate}
        onChange={(e) => {
          setRate(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <input type="number" placeholder="Total Rate" value={total} readOnly />
      <button className="add-btn" onClick={handleAddClick}>
        {editItem ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddItems;
