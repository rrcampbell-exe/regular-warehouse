import React from 'react';
import { Link } from 'react-router-dom'
import Footer from '../Footer';
import { DELETE_ITEM } from '../../utils/mutations';
import { useMutation } from "@apollo/client"

const ItemList = ({ items }) => {
  const [deleteItem] = useMutation(DELETE_ITEM)
  
  if (!items.length) {
    return <h2>How irregular! This warehouse has no items in it. 🤔</h2>
  }

  const handleItemDelete = async (event) => {
    event.preventDefault();

    try {
      await deleteItem({
        variables: { part_number: event.target.id },
      });
    } catch (e) {
      console.log(e)
    }

    window.location.reload(true);
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
          <button id={item.part_number} onClick={handleItemDelete}>Delete Item</button>
        </div>
      ))}
    </div>
  )
}

export default ItemList;