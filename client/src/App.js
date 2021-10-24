// import packages
import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setContext } from '@apollo/client/link/context'

// import components
import Home from "./pages/Home";
import Warehouse from "./pages/Warehouse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegularVideo from "./components/RegularVideo";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* HEADER TO GO HERE */}
          <div>
            <Switch>
              <Route exact path="/" component = {Home} />
              <Route exact path="/signup" component = {Signup} />
              <Route exact path="/login" component = {Login} />
              <Route exact path="/warehouse" component = {Warehouse} />
            </Switch>
          </div>
          <RegularVideo/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
