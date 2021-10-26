import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import  { ADD_ITEM } from '../../utils/mutations';
import { QUERY_ALL_ITEMS } from '../../utils/queries';


function NewItem() {
    const [itemData, setItemData] = useState();
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

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            // add item to database
            await addItem({
                variables: { itemData }
            });

            // probably update this *********
            setItemData('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p>
                {error && <span>Something irregular has occurred...</span>}
            </p>
            <form onSubmit = {handleFormSubmit}>

            </form>

        </div>
    )
}

export default NewItem;