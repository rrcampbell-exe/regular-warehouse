import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegularVideo from '..';

afterEach(cleanup);

describe('RegularVideo component', () => {
    it('renders', () => { // this test passes
        render(<RegularVideo/>)
    })
    it('matches snapshot', () => {
        const { asFragment } = render(<RegularVideo/>); // this passes
        expect(asFragment()).toMatchSnapshot();
    })
})