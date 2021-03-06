import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Redirect, useParams } from "react-router-dom";
import { QUERY_ITEM } from "../utils/queries";
import { UPDATE_ITEM } from "../utils/mutations";
import Auth from "../utils/auth"
import Header from "../components/Header";

const ItemEdit = () => {
  // pull part_number from URL parameters
  const { part_number } = useParams();

  // fetch data for this part_number from db
  const { data } = useQuery(QUERY_ITEM, {
    variables: { partNumber: part_number },
  });

  // mutation for update of item
  const [updateItem] = useMutation(UPDATE_ITEM);

  // state establishment for variables (using let in case need arises to reassign due to lack of change)
  let [itemName, setItemName] = useState(data?.item.name)
  let [partNumber, setPartNumber] = useState(part_number)
  let [quantity, setQuantity] = useState(data?.item.quantity)

  // verify whether user logged in, redirect if not
  if (!Auth.loggedIn()) {
    return <Redirect to="/" />
  }

  // run on form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!itemName) {
      itemName = data.item.name
    }

    if (!quantity) {
      quantity = data.item.quantity
    }

    try {
      await updateItem({
        variables: {
          _id: data.item._id,
          name: itemName,
          part_number: partNumber,
          quantity: parseInt(quantity),
        },
      });
    } catch (e) {
      console.log(e);
    }

    window.location.assign("/warehouse");
  };

  return (
    <main >
      <Header />
      {!data ? (
        <div>Fetching Item Data...</div>
      ) : (
        <div className='container-fluid w-75 my-5 p-3 bg-light border rounded shadow'>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label for="item-name" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                name="item-name"
                id="item-name"
                defaultValue={data.item.name}
                onChange={e => setItemName(e.target.value)}
                value={itemName}
              ></input>
            </div>
            <div className="mb-3">
              <label for="part_number" className="form-label">Part Number</label>
              <input
                type="text"
                className="form-control"
                name="part_number"
                id="part_number"
                defaultValue={part_number}
                onChange={e => setPartNumber(e.target.value)}
                value={partNumber}
              ></input>
            </div>
            <div className="mb-3">
              <label for="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                id="quantity"
                defaultValue={data.item.quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                value={parseInt(quantity)}
              ></input>
            </div>
          <button
            type="submit"
            className="btn btn-outline-secondary shadow-sm"
            id="edit-item-button"
            onClick={handleFormSubmit}
          >
            Save Changes
          </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default ItemEdit;
