import React from 'react';
import { Link } from 'react-router-dom'
import Footer from '../Footer';

const ItemList = ({ items }) => {
  if (!items.length) {
    return <h2>How irregular! This warehouse has no items in it. 🤔</h2>
  }

  return (
    <div>
      {items && items.map((item) => (
        <div key={item._id}>
          <h2>Item Name: {item.name}</h2>
          <span>Part Number: {item.part_number}</span>
          <span>Quantity: {item.quantity}</span>
          <Link to={"/item-edit/" + item.part_number}>
            <button id={item.name}>Update Item</button>
          </Link>
        </div>
      ))}
      <Footer />
    </div>
  )
}

export default ItemList;