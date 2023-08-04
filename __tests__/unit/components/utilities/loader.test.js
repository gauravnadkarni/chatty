import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoaderComponent from '../../../../src/components/utilities/loader';


describe('Loader Component', () => {
    beforeEach(() => {

    });

    afterEach(() => {

    });


    it('expect loader to show up', () => {
        const {getByRole} = render(<LoaderComponent varient='determinate' color='secondary' value={50} />);
        const Loader = getByRole('progressbar');

        expect(Loader).toBeInTheDocument();
    })
})