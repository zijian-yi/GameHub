import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Games from '../pages/Games';

test('renders Games', () => {
    render(<Games />);
    expect(screen.getByText(/SORT BY/i)).toBeInTheDocument();
    expect(screen.getByText(/FILTER BY PLATFORM/i)).toBeInTheDocument();
    expect(screen.getByText(/FILTER BY GENRE/i)).toBeInTheDocument();
});

test('clicking', () => {
    render(<Games />);
    const select = screen.getByText('Sort by');
    fireEvent.click(select);
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Release Date')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Filter by Platform'));
    expect(screen.getByText('PS5')).toBeInTheDocument();
    expect(screen.getByText('XBox')).toBeInTheDocument();
    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByText('Windows')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Filter by Genre'));
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('FPS')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
});