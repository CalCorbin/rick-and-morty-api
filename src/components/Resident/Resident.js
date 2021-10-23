import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

const Resident = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])

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
    setItem(itemInput).then(() => {
      setAlert(true)
    });
  };

  return (
    <Card style={{width: '18rem', padding: '10px'}}>
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
        <Modal ariaHideApp={false} show={modalIsOpen} onHide={handleResidentDisplay}>
          <Modal.Header closeButton>
            <Modal.Title>{props.resident.name}</Modal.Title>
          </Modal.Header>
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
            <Button type="submit" variant="primary" size="sm">Save Notes</Button>
            {alert && <Alert variant="success">Notes Saved</Alert>}
          </form>
        </Modal>
      )}
    </Card>
  );
};

export default Resident;
