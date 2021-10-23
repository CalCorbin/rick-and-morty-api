import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Locations, { GET_LOCATIONS } from './Locations';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: { results: [{ id: '1', name: 'Earth', type: 'Planet' }] },
      },
    },
  },
];

beforeEach(() =>
  render(
    <MockedProvider mocks={mocks}>
      <Locations />
    </MockedProvider>
  )
);

test('renders', async () => {
  const title = /Explore the Worlds of Rick and Morty/i;

  await waitFor(() => screen.getByText(title));
  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByTestId('location-1')).toBeInTheDocument();
});
