import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewItem from '..';
import { ApolloProvider } from '@apollo/client';

afterEach(cleanup);

describe('NewItem component', () => {
    it('renders', () => { // this does not pass
        render(<NewItem/>)
    })
})