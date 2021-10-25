import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_ITEM } from "../utils/queries";
import { UPDATE_ITEM } from "../utils/mutations";
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
            <div>
              <label for="item-name">Item Name</label>
              <input
                type="text"
                name="item-name"
                id="item-name"
                defaultValue={data.item.name}
                onChange={e => setItemName(e.target.value)}
                value={itemName}
              ></input>
            </div>
            <div>
              <label for="part_number">Part Number</label>
              <input
                type="text"
                name="part_number"
                id="part_number"
                defaultValue={part_number}
                onChange={e => setPartNumber(e.target.value)}
                value={partNumber}
              ></input>
            </div>
            <div>
              <label for="quantity">Quantity</label>
              <input
                type="number"
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
        </div>
      )}
    </main>
  );
};

export default ItemEdit;
