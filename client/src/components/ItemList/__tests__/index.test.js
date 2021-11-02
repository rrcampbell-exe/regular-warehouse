import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ItemList from '..';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'


afterEach(cleanup);
const items = [];
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

describe('ItemList component', () => {
    it('renders', () => { // passes
        render(<ApolloProvider client = {client}><ItemList items={items}/></ApolloProvider>)
    })
    it('matches snapshot', () => {
        const { asFragment } = render(<ApolloProvider client = {client}><ItemList items={items}/></ApolloProvider>); // 
        expect(asFragment()).toMatchSnapshot();
    })
})