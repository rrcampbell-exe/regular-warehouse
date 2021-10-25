import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../utils/queries";
import ItemList from "../components/ItemList";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth"


const Warehouse = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEMS);

  const items = data?.items || [];

  // verify whether user logged in, redirect if not
  if (!Auth.loggedIn()) {
    return <Redirect to="/" />
  }

  return (
    <main>
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