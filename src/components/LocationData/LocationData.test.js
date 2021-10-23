import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationData from './LocationData';

const location = {
  name: 'Oklahoma',
  type: 'state',
};

beforeEach(() => render(<LocationData location={location} />));

test('renders', () => {
  const locationName = screen.getByText(/Oklahoma/i);
  expect(locationName).toBeInTheDocument();
});
