import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

const Resident = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemInput, setItemInput] = useState('');

  function setItem(notes) {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ residentId: props.resident.id, notes }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const handleResidentDisplay = () => {
    setModalIsOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput);
  };

  return (
    <div style={{ 'margin-bottom': '15px' }}>
      <div>
        <strong>Name:</strong> {props.resident.name}
      </div>
      <div>
        <strong>Status:</strong> {props.resident.status}
      </div>
      <img src={props.resident.image} alt={props.resident.name}></img>
      <div>
        <Button onClick={handleResidentDisplay} variant="secondary" size="sm">Show Resident Notes</Button>
      </div>
      {modalIsOpen && (
        <Modal ariaHideApp={false} isOpen={modalIsOpen}>
          <Button variant="danger" onClick={handleResidentDisplay} size="sm">x</Button>
          <div>Name: {props.resident.name}</div>
          <div>Status: {props.resident.status}</div>
          <img src={props.resident.image} alt={props.resident.name}></img>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Resident Notes:</p>
              <input
                type="text"
                onChange={(event) => setItemInput(event.target.value)}
                value={itemInput}
              ></input>
            </label>
            {/*TODO- Add success on save*/}
            <Button type="submit" variant="primary" size="sm">Save Notes</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Resident;
