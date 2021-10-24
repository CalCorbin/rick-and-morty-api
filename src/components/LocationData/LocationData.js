import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Resident from '../Resident/Resident';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Loading from '../Loading';
import Error from '../Error';

const residentsModal = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
    backgroundColor:'gray'
};

const locationCard = {
  margin: '10px',
  width: '20%',
  padding: '10px',
  height: '175px',
};

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

const LocationData = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLocationModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  function loadResidents(residents) {
    return (
      <Modal show={modalIsOpen} centered size="lg" onHide={handleLocationModal}>
        <Modal.Header closeButton>
          <Modal.Title>{props.location.name}</Modal.Title>
        </Modal.Header>
        <div style={residentsModal}>
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
    handleLocationModal();
    getResidents();
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Card style={locationCard}>
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
      {modalIsOpen && data && loadResidents(data.location.residents)}
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
