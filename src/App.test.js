import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Explore the Worlds of Rick and Morty/i);
  expect(titleElement).toBeInTheDocument();
});
