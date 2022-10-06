import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { ResultDetails } from '../components/ResultDetails';

test('check if submit rating button exists', () => {
    render(
        <MemoryRouter initialEntries={[
            {
            pathname: '/search/6333b05c8aded40b2cc4f38b/6333b3c68aded40b2cc4f38f',    
            state: {
            data:{
                title: 'Test',
                authors: 'Test',
                publicationYear: 'Test',
                evidenceResults: 'Test',
            }
        }}]}>
          <ResultDetails />,
        </MemoryRouter>,
    );

    const button = screen.getByText("Submit a rating");

    expect(button).toBeInTheDocument();
});

