import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/shared/Header';

test('renders header', () => {
    render(<Header />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Games/i)).toBeInTheDocument();
});

test('search functionality', () => {
    render(<Header />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input.value).toBe('test search');
});