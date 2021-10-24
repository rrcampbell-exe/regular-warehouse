import React from "react";
import { Link } from 'react-router-dom';

const ItemEdit = (item) => {
  return (
    <main>
      <header>
        Regular Warehouse
        <Link to="/">
          <button>Logout</button>
        </Link>
      </header>
      <form>
        <div>
          <label for="item-name">Item Name</label>
          <input
            type="text"
            name="item-name"
            id="item-name"
            value={item.name}
          ></input>
        </div>
        <div>
          <label for="part_number">Part Number</label>
          <input
            type="text"
            name="part_number"
            id="part_number"
            value={item.part_number}
          ></input>
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={item.quantity}
          ></input>
        </div>
      </form>
      <button type="submit" id="edit-item-button">Save Changes</button>
    </main>
  );
};

export default ItemEdit;
