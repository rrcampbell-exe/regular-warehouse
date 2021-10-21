import React from 'react';

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
          <button>Update Quantity</button>
        </div>
      ))}
    </div>
  )
}

export default ItemList;