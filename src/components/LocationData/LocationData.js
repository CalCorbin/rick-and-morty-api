import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Resident from '../Resident/Resident';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

const GET_RESIDENTS = (locationId) => {
  return gql`
      query {
        location(id: ${locationId}) {
          residents {
              id
              name
              status
              image
          }
        }
      }
    `;
};

const Loading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

const Error = () => {
  return <Alert variant="danger">Error Loading Rick and Morty Locations</Alert>;
};

const LocationData = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLocationModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  function loadResidents(residents) {
    return (
      <Modal show={modalIsOpen} centered size="lg" onHide={handleLocationModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.location.name}</Modal.Title>
        </Modal.Header>
        <div style={cardStyles}>
          {residents.map((resident, index) => (
            <Resident key={`resident-${index}`} resident={resident} />
          ))}
        </div>
      </Modal>
    );
  }

  const [getResidents, { loading, error, data }] = useLazyQuery(
    GET_RESIDENTS(props.location.id)
  );

  function openResidents() {
    setIsOpen((prev) => !prev);
    handleLocationModal();
    getResidents();
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Card
      style={{ margin: '10px', width: '20%', padding: '10px', height: '150px' }}
    >
      <div data-testid={`location-${props.location.id}`}>
        <Card.Title>{props.location.name}</Card.Title>
      </div>
      <Card.Text>
        <strong>Type:</strong> {props.location.type}
      </Card.Text>
      <Button
        onClick={() => openResidents()}
        variant="primary"
        className="btn-primary"
        size="sm"
      >
        View Residents
      </Button>
      {isOpen && data && loadResidents(data.location.residents)}
    </Card>
  );
};

LocationData.propTypes = {
  client: PropTypes.object,
  location: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default LocationData;
