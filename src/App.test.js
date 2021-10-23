import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the app', async () => {
  render(<App />);
  const title = /Explore the Worlds of Rick and Morty/i;

  await waitFor(() => screen.getByText(title));
  expect(screen.getByText(title)).toBeInTheDocument();
});
