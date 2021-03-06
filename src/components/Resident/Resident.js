import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const Resident = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

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
      setAlert(true);
    });
  };

  return (
    <Card
      data-testid="resident-card"
      style={{ width: '18rem', padding: '10px', margin: '10px' }}
    >
      <div>
        <strong>Name:</strong> {props.resident.name}
      </div>
      <div>
        <strong>Status:</strong> {props.resident.status}
      </div>
      <img
        data-testid={`img-${props.resident.id}`}
        src={props.resident.image}
        alt={props.resident.name}
      ></img>
      <Button
        data-testid="show-resident-notes-button"
        onClick={handleResidentDisplay}
        className="btn-primary"
        size="sm"
        style={{ margin: '5px' }}
      >
        Show Resident Notes
      </Button>
      {modalIsOpen && (
        <Modal
          show={modalIsOpen}
          onHide={handleResidentDisplay}
          data-testid={`modal-${props.resident.id}`}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {props.resident.name} | Status: {props.resident.status}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#7c3e1d',color:'white'}}>
            <img
              data-testid={`modal-img-${props.resident.id}`}
              src={props.resident.image}
              alt={props.resident.name}
              style={{ margin: '10px' }}
            ></img>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Resident Notes:</p>
                <textarea
                  data-testid="resident-notes"
                  name="resident-notes"
                  onChange={(event) => setItemInput(event.target.value)}
                  value={itemInput}
                  style={{width:"200%", height:'200px'}}
                ></textarea >
              </label>
              <div style={{ marginTop: '10px' }}>
                <Button
                  data-testid="save-notes-button"
                  type="submit"
                  size="sm"
                  className="btn-primary"
                >
                  Save Notes
                </Button>
              </div>
              {alert && (
                <Alert
                  data-testid="notes-saved-alert"
                  variant="success"
                  style={{ marginTop: '10px' }}
                >
                  Notes Saved
                </Alert>
              )}
            </form>
          </Modal.Body>
        </Modal>
      )}
    </Card>
  );
};

Resident.propTypes = {
  resident: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default Resident;
