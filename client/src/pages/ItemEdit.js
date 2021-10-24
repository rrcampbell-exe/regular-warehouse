import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_ITEM } from "../utils/queries";
import { UPDATE_ITEM } from "../utils/mutations";

const ItemEdit = () => {
  // pull part_number from URL parameters
  const { part_number } = useParams();

  // fetch data for this part_number from db
  const { data } = useQuery(QUERY_ITEM, {
    variables: { partNumber: part_number },
  });

  // mutation for update of item
  const [updateItem] = useMutation(UPDATE_ITEM);

  // run on form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateItem({
        variables: {
          name: data.item.name,
          part_number: part_number,
          quantity: data.item.quantity,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      {!data ? (
        <div>Fetching Item Data...</div>
      ) : (
        <div>
          <form>
            <div>
              <label for="item-name">Item Name</label>
              <input
                type="text"
                name="item-name"
                id="item-name"
                defaultValue={data.item.name}
              ></input>
            </div>
            <div>
              <label for="part_number">Part Number</label>
              <input
                type="text"
                name="part_number"
                id="part_number"
                defaultValue={part_number}
              ></input>
            </div>
            <div>
              <label for="quantity">Quantity</label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                defaultValue={data.item.quantity}
              ></input>
            </div>
          </form>
          <button
            type="submit"
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
