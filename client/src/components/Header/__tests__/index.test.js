import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '..';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Header component', () => {
    it('renders', () => { // this does not pass (I think BrowserRouter fixed it?)
        render(<BrowserRouter><Header/></BrowserRouter>)
    })
    it('matches snapshot', () => {
        const { asFragment } = render(<Header/>); // does not pass
        expect(asFragment()).toMatchSnapshot();
    })
})