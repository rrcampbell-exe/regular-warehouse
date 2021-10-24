import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom'
import { QUERY_ITEM } from "../utils/queries";

const ItemEdit = () => {

  // pull part_number from URL parameters
  const { part_number } = useParams();

  // fetch data for this part_number from db
  const { data } = useQuery(QUERY_ITEM, {
    variables: { partNumber: part_number }
  })

  return (
    <main>
      <form>
        <div>
          <label for="item-name">Item Name</label>
          <input
            type="text"
            name="item-name"
            id="item-name"
            value={data.item.name}
          ></input>
        </div>
        <div>
          <label for="part_number">Part Number</label>
          <input
            type="text"
            name="part_number"
            id="part_number"
            value={part_number}
          ></input>
        </div>
        <div>
          <label for="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={data.item.quantity}
          ></input>
        </div>
      </form>
      <button type="submit" id="edit-item-button">Save Changes</button>
    </main>
  );
};

export default ItemEdit;
