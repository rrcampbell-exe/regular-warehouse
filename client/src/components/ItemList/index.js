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
        <div key={item._id} className='card'>
          <div className='card-body'>
            <h2 class="card-title">Item Name: {item.name}</h2>
            <h6 className="card-subtitle mb-2 text-muted">Part Number: {item.part_number}</h6>
            <p class="card-text">Quantity: {item.quantity}</p>
            <Link to={"/item-edit/" + item.part_number} class="card-link">
              <button id={item.name} class="btn btn-outline-primary"><span class="material-icons">edit</span>Update Item</button>
            </Link>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  )
}

export default ItemList;