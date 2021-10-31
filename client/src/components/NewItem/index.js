import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_ITEM } from "../../utils/mutations";
import { QUERY_ALL_ITEMS } from "../../utils/queries";

const faker = require("faker/locale/en_US");

let newPart_number; // Setting this variable in a larger scope, so mutliple functions can access it

function NewItem() {
  const [formData, setFormData] = useState({
    name: "",
    part_number: "",
    quantity: "",
  });
  const [addItem, { error }] = useMutation(ADD_ITEM, {
    update(cache, { data: { addItem } }) {
      try {
        const { items } = cache.readQuery({ query: QUERY_ALL_ITEMS });
        console.log(items[0].part_number);
        cache.writeQuery({
          query: QUERY_ALL_ITEMS,
          data: { items: [addItem, ...items] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // const { data } = useQuery(QUERY_ALL_ITEMS); // To use in the generatetPartNumber function
  // console.log(data.items)
  function generatePartNumber() {
    if (!formData.part_number) {
      // create part number with faker
      const pnProto = faker.datatype.number({
        min: 100000,
        max: 199999,
      });

      let pnProtoArr = pnProto.toString().split("");
      pnProtoArr.splice(3, 0, "-");
      newPart_number = pnProtoArr.join("");

      // console.log(data.items)
      // for (let i = 0; i < data.items.length; i++) {  // Compare newPart_number with all others
      //     if (data.items[i].part_number === newPart_number) {  // If there's a match, rerun function to generate new number
      //         return generatePartNumber();
      //     }
      // }
    } else {
      // for (let i = 0; i < data.items.length; i++) {  // Compare newPart_number with all others
      //     if (data.items[i].part_number === newPart_number) {  // If there's a match, tell the user
      //         console.log("This part number is already in use")
      //         return; // Just return?
      //     }
      // }
      newPart_number = formData.part_number;
    }
  }

  const handleChange = (event) => {
    // Add an if statement to limit the length if necessary. If so, add characterCount state
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData.part_number)

    generatePartNumber();

    try {
      // add item to database
      await addItem({
        variables: {
          name: formData.name,
          part_number: newPart_number,
          quantity: parseInt(formData.quantity),
        },
      });

      // Double check that this works (i'm suspicious)
      setFormData({ name: "", part_number: "", quantity: "" });
      // console.log(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='container-fluid shadow w-75 mt-2 p-3 rounded bg-light'>
      <h4>Add New Item</h4>
      <form onSubmit={handleFormSubmit} >
        <div className='mb-3'>
            <label htmlFor="name" className="form-label">Item Name:</label>
            <input
              placeholder="Item Name"
              name="name"
              type="text"
              value={formData.name} // -- is this necessary?
              onChange={handleChange}
              className="form-control"
            />
        </div>
       <div className='mb-3'>
          <label htmlFor="quantity" className="form-label">Item Quantity:</label>
            <input
              placeholder="0"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange} // -- is this necessary?
              className="form-control"
            />
       </div>
       <div className='mb-3'>
            <label htmlFor="part_number" className="form-label">Part Number:</label>
              <input
                placeholder="000-000"
                name="part_number"
                type="text"
                value={formData.part_number}
                onChange={handleChange}
                className="form-control"
              />
        <p className="form-text">A new part number will be created if this space is left blank.</p>
       </div>
        <button className="btn btn-outline-secondary shadow-sm"><span className="material-icons md-12 align-bottom">add</span>Add item</button>
      </form>
      <p>
        {error && (
          <span>
            Something irregular has occurred... 🤔 Are you sure you've entered a
            unique part number?
          </span>
        )}
      </p>
    </div>
  );
}

export default NewItem;
