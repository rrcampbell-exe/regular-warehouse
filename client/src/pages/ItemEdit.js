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
            <div class="mb-3">
              <label for="item-name" class="form-label">Item Name</label>
              <input
                type="text"
                class="form-control"
                name="item-name"
                id="item-name"
                defaultValue={data.item.name}
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
              ></input>
            </div>
            <div class="mb-3">
              <label for="quantity" class="form-label">Quantity</label>
              <input
                type="text"
                class="form-control"
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
