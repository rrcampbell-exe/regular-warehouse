import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import ItemList from "../components/ItemList";
import Header from "../components/Header";

const Warehouse = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEMS);

  const items = data?.items || [];

  return (
    <main>
      <Header />
      <div>
        {loading ? (
          <div>Pawing about the warehouse for items...</div>
        ) : (
          <ItemList items={items} />
        )}
      </div>
    </main>
  );

}

export default Warehouse;