import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import Nested from '../components/details/Nested';

test('test discussion', () => {
    render(<Nested />);
    const input = screen.getByLabelText('Message') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test discussion' } });
    expect(input.value).toBe('test discussion');
});