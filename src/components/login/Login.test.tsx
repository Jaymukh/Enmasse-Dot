import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('should render without errors', () => {
    render(<Login handleLoggedIn={() => {}} />);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeInTheDocument();
  });

  it('should enable Continue button when valid email and password are provided', () => {
    render(<Login handleLoggedIn={() => {}} />);
    const emailInput = screen.getByPlaceholderText(/Enter your email id here/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password here/i);
    const continueButton = screen.getByText(/Continue/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(continueButton).toBeEnabled();
  });

  // Add more test cases as needed
});
