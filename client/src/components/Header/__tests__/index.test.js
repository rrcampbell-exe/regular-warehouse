import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '..';
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe('Header component', () => {
    it('renders', () => { // this passes
        render(<Router><Header/></Router>)
    })
    it('matches snapshot', () => {
        const { asFragment } = render(<Router><Header/></Router>); // passes
        expect(asFragment()).toMatchSnapshot();
    })
})