import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationMetrics from './LocationMetrics';

const location = {
  name: 'Oklahoma',
  type: 'state',
};

beforeEach(() => render(<LocationMetrics location={location} />));

test('renders', () => {
  const locationName = screen.getByText(/Oklahoma/i);
  expect(locationName).toBeInTheDocument();
});
