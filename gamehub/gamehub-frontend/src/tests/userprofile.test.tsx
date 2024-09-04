import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Profile from '../components/users/Profile';


test('renders header', () => {
    render(<Profile />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Show all/i)).toBeInTheDocument();
});