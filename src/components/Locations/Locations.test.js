import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import client from '../../App';
import Locations, { locationsQuery } from './Locations';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: locationsQuery,
      variables: {
        name: 'lol',
      },
    },
    result: {
      data: {
        dog: { id: '1', name: 'Buck', breed: 'bulldog' },
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

test('renders', () => {
  const locationName = screen.getByText(/Oklahoma/i);
  expect(locationName).toBeInTheDocument();
});
