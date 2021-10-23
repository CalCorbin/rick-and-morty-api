import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Locations from './Locations';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [{
  request: {
    query: 'GET_DOG_QUERY',
    variables: {
      name: 'Buck',
    },
  },
  result: {
    data: {
      dog: { id: '1', name: 'Buck', breed: 'bulldog' },
    },
  },
},]

beforeEach(() => render(<MockedProvider><Locations client={mocks} /></MockedProvider>))

test('renders', () => {
  const locationName = screen.getByText(/Oklahoma/i);
  expect(locationName).toBeInTheDocument();
});

