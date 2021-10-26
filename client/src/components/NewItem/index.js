import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import  { ADD_ITEM } from '../../utils/mutations';
import { QUERY_ALL_ITEMS } from '../../utils/queries';

const faker = require('faker/locale/en_US');

// NOTES:
// Probably use faker to create a part number on item creation --DONE
// Need input for initial quantity in form -- DONE
// Change state to include every input in the form instead of a general "item data" -- DONE

function NewItem() {
    // Should name and quanity be named more specifically?
    const [formData, setFormData] = useState({ name: '', quantity: '' });
    const [addItem, { error }] = useMutation(ADD_ITEM, {
        update(cache, { data: { addItem } }) {
            try {
                const { items } = cache.readQuery({ query: QUERY_ALL_ITEMS });

                cache.writeQuery({
                    query: QUERY_ALL_ITEMS,
                    data: { items: [addItem, ...items] }
                });
            } catch (e) {
                console.error(e);
            }

        }
    });

    const handleChange = event => {
        // Add an if statement to limit the length if necessary. If so, add characterCount state
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        // create part number with faker
        const pnProto = faker.datatype.number({
            'min': 100000,
            'max': 199999
          });
      
        let pnProtoArr = pnProto.toString().split("")
        pnProtoArr.splice(3, 0, "-")
        let part_number = pnProtoArr.join("")

        try {
            // add item to database
            await addItem({
                variables: {
                    name: formData.name,
                    part_number: part_number,
                    quantity: formData.quantity,
                }
            });

            // Double check that this works (i'm suspicious)
            setFormData({ name: '', quantity: '' });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p>
                {error && <span>Something irregular has occurred... 🤔</span>}
            </p>
            <form onSubmit = {handleFormSubmit}>
                <label htmlFor = "itemName">Item Name:</label>
                <input 
                    placeholder = "Item name" 
                    name = "itemName" 
                    type = "text"
                    // value   -- is this necessary?
                    onChange = {handleChange}   
                />
                <label htmlFor = "itemQuant">Item Quantity:</label>
                <input
                    placeholder = "Item quantity"
                    name = "itemQuant"
                    type = "text"
                    // value  -- is this necessary?
                />

                <button type = "submit">Submit Item</button>
            </form>

        </div>
    );
}

export default NewItem;