import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import Footer from '../Footer';
import { DELETE_ITEM } from '../../utils/mutations';
import { useMutation } from "@apollo/client"

const ItemList = ({ items }) => {
  const [deleteItem] = useMutation(DELETE_ITEM)

  let history = useHistory()
  
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

    // history.push("/warehouse")

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
                <div className="d-flex flex-row justify-content-evenly">
                    <Link to={"/item-edit/" + item.part_number} class="card-link">
                      <button id={item.name} class="btn btn-outline-secondary align-middle"><span className="material-icons md-12 align-middle icon-size text-to-shrink">edit</span><span className="text-to-shrink"> Update Item</span></button>
                    </Link>
                    <button className="btn btn-outline-secondary" id={item.part_number} onClick={handleItemDelete}><span className="material-icons md-12 align-middle icon-size text-to-shrink">delete</span><span className="text-to-shrink"> Delete Item</span></button>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default ItemList;