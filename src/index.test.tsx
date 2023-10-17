import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './App'; // Replace with the actual path to your App component.

test('renders the app without crashing', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );

  // You can add more specific assertions here
  //expect(screen.getByText('Welcome to Your App')).toBeInTheDocument();
});
