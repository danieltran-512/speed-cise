import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {ResultDetails} from '../components/ResultDetails';

describe('ResultDetails', () => {
    it('check if submit rating button exists', () => {
        render(
        <MemoryRouter
            initialEntries={[
                {
                    pathname: '/result/1',
                    state: {
                        data: {
                            title: 'test',
                            authors: 'test',
                            publicationYear: 'test',
                            evidenceResult: 'test'
                        }
                }
                }
            ]}
        >
            <ResultDetails />
        </MemoryRouter>
        );
        
        const button = screen.getByText("Submit a rating");

        expect(button).toBeInTheDocument();
    });
    }
);