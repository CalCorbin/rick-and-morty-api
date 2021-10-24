import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Resident from './Resident';

const resident = {
  name: 'Beth',
  status: 'Alive',
  image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
  id: '1',
};

beforeEach(() => render(<Resident resident={resident} />));

test('renders resident name', () => {
  const residentName = screen.getByText(/Beth/i);
  expect(residentName).toBeInTheDocument();
});

test('renders resident status', () => {
  const residentStatus = screen.getByText(/Alive/i);
  expect(residentStatus).toBeInTheDocument();
});

test('renders resident img', () => {
  const residentImage = screen.getByTestId('img-1');
  expect(residentImage).toBeInTheDocument();
});

test('opens modal', async () => {
  fireEvent.click(screen.getByTestId('show-resident-notes-button'));
  await waitFor(() => screen.getByTestId('modal-1'));

  const modalImage = screen.getByTestId('modal-img-1');
  expect(modalImage).toBeInTheDocument();
});

test('closes modal', async () => {
  fireEvent.click(screen.getByTestId('show-resident-notes-button'));
  await waitFor(() => screen.getByTestId('modal-1'));

  fireEvent.click(screen.getByLabelText('Close'));

  expect(screen.queryByText(/Save Notes/i)).not.toBeInTheDocument();
});

test('saves notes', async () => {
  fireEvent.click(screen.getByTestId('show-resident-notes-button'));
  await waitFor(() => screen.getByTestId('modal-1'));

  const notesInput = screen.getByTestId('resident-notes');
  fireEvent.change(notesInput, { target: { value: 'taking some notes!' } });
  expect(notesInput.value).toBe('taking some notes!');

  fireEvent.click(screen.getByTestId('save-notes-button'));

  await waitFor(() => screen.getByTestId('notes-saved-alert'));
  expect(screen.getByTestId('notes-saved-alert')).toBeInTheDocument();
});
