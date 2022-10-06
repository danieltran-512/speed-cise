import { render, screen } from '@testing-library/react';
import {Search} from '../components/Search';
import {BrowserRouter as Router} from 'react-router-dom';

test('renders the landing page', () => {
    render(
        <Router>
          <Search />,
        </Router>,
      );

    expect(screen.getByText(/Speed/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Practice Empirical Evidence Database/i)).toBeInTheDocument();
});

