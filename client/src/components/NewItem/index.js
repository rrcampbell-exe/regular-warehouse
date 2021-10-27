import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import  { ADD_ITEM } from '../../utils/mutations';
import { QUERY_ALL_ITEMS } from '../../utils/queries';

const faker = require('faker/locale/en_US');

let newPart_number // Setting this variable in a larger scope, so mutliple functions can access it

function NewItem() {
    const [formData, setFormData] = useState({ name: '', part_number: '', quantity: '' });
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
        // console.log(formData.part_number)
        if (!formData.part_number) {
            // create part number with faker
            const pnProto = faker.datatype.number({
                'min': 100000,
                'max': 199999
            });
        
            let pnProtoArr = pnProto.toString().split("")
            pnProtoArr.splice(3, 0, "-")
            newPart_number = pnProtoArr.join("")
            // console.log(newPart_number)
            // console.log(formData)
        } else {
            newPart_number = formData.part_number
        }
        
        try {
            // add item to database
            await addItem({
                variables: {
                    name: formData.name,
                    part_number: newPart_number,
                    quantity: parseInt(formData.quantity),
                }
            });

            // Double check that this works (i'm suspicious)
            setFormData({ name: '', part_number: '', quantity: '' });
            // console.log(formData);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p>
                {error && <span>Something irregular has occurred... 🤔</span>}
            </p>
            <h2>Add New Item</h2>
            <form onSubmit = {handleFormSubmit}>
                <label htmlFor = "name">Item Name:</label>
                <input 
                    placeholder = "Item name" 
                    name = "name" 
                    type = "text"
                    value = {formData.name}  // -- is this necessary?
                    onChange = {handleChange}   
                />
                <label htmlFor = "quantity">Item Quantity:</label>
                <input
                    placeholder = "Item quantity"
                    name = "quantity"
                    type = "text"
                    value = {formData.quantity}
                    onChange = {handleChange}  // -- is this necessary?
                />
                <label htmlFor = "part_number">Part Number:</label>
                <input
                    placeholder = "Part number"
                    name = "part_number"
                    type = "text"
                    value = {formData.part_number}
                    onChange = {handleChange}
                />
                <p>A new part number will be created if this space is left blank.</p>

                <button type = "submit">Submit Item</button>
            </form>

        </div>
    );
}

export default NewItem;