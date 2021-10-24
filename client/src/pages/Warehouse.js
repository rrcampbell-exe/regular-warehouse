import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import ItemList from "../components/ItemList";
import { Link } from 'react-router-dom'

const Warehouse = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEMS);

  const items = data?.items || [];
  console.log(items)

  return (
    <main>
      <header>
        Regular Warehouse
        <Link to="/">
          <button>Logout</button>
        </Link>
      </header>
      <div>
        {loading ? (
          <div>Pawing about the warehouse in search of items...</div>
        ) : (
          <ItemList items={items} />
        )}
      </div>
    </main>
  );

}

export default Warehouse;