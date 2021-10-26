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
          name: itemName,
          part_number: partNumber,
          quantity: parseInt(quantity),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <Header />
      {!data ? (
        <div>Fetching Item Data...</div>
      ) : (
        <div>
          <form onSubmit={handleFormSubmit}>
            <div class="mb-3">
              <label for="item-name" class="form-label">Item Name</label>
              <input
                type="text"
                class="form-control"
                name="item-name"
                id="item-name"
                defaultValue={data.item.name}
                onChange={e => setItemName(e.target.value)}
                value={itemName}
              ></input>
            </div>
            <div class="mb-3">
              <label for="part_number" class="form-label">Part Number</label>
              <input
                type="text"
                class="form-control"
                name="part_number"
                id="part_number"
                defaultValue={part_number}
                onChange={e => setPartNumber(e.target.value)}
                value={partNumber}
              ></input>
            </div>
            <div class="mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input
                type="number"
                class="form-control"
                name="quantity"
                id="quantity"
                defaultValue={data.item.quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                value={parseInt(quantity)}
              ></input>
            </div>
            <button
              type="submit"
              id="edit-item-button"
            >
              Save Changes
            </button>
          </form>
          <button
            type="submit"
            class="btn btn-outline-primary"
            id="edit-item-button"
            onClick={handleFormSubmit}
          >
            Save Changes
          </button>
        </div>
      )}
    </main>
  );
};

export default ItemEdit;
