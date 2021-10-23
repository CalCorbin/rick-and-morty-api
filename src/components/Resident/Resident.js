import React, { useState } from 'react';
import Modal from 'react-modal';

const Resident = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleResidentDisplay = () => {
    setModalIsOpen((prev) => !prev);
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
        <button onClick={handleResidentDisplay}>Show Resident Notes</button>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen}>
          <button onClick={handleResidentDisplay}>x</button>
          <div>Name: {props.resident.name}</div>
          <div>Status: {props.resident.status}</div>
          <img src={props.resident.image} alt={props.resident.name}></img>
          <div>
          <label>Resident Notes:</label>
          <input type="text" name="notes"></input>
          <button>Save Notes</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Resident;
