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
    <div className='m-1 px-5  row row-cols-1 row-cols-md-2 g-4 rounded'>
      {items && items.map((item) => (
        
        <div className='col'>
          
            <div key={item._id} className='card shadow bg-light' >
              <div className='card-body'>
                <h2 className="card-title">Item Name: {item.name}</h2>
                <h6 className="card-subtitle mb-2 text-muted">Part Number: {item.part_number}</h6>
                <p className="card-text">Quantity: {item.quantity}</p>
                <div className="btn-group">
                    <Link to={"/item-edit/" + item.part_number} class="card-link">
                      <button id={item.name} class="btn btn-outline-primary align-middle"><span className="material-icons md-12 align-bottom">edit</span>Update Item</button>
                    </Link>
                    <button className="btn btn-outline-danger" id={item.part_number} onClick={handleItemDelete}><span className="material-icons md-12 align-bottom">delete</span>Delete Item</button>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default ItemList;