import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import ItemList from "../components/ItemList";

const Warehouse = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEMS);

  const items = data?.items || [];

  return (
    <main>
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