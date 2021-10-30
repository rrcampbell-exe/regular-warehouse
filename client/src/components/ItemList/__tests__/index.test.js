import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ItemList from '..';
import { ApolloProvider } from '@apollo/client';

afterEach(cleanup);

describe('ItemList component', () => {
    it('renders', () => { // this does not pass
        render(<ApolloProvider><ItemList/></ApolloProvider>)
    })
})