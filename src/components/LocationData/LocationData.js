import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Resident from '../Resident/Resident';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

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

  function loadResidents(residents) {
    return residents.map((resident, index) => (
      <Resident key={`resident-${index}`} resident={resident} />
    ));
  }

  const [getResidents, { loading, error, data }] = useLazyQuery(
    GET_RESIDENTS(props.location.id)
  );

  function openResidents() {
    setIsOpen((prev) => !prev);
    getResidents();
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Card style={{ margin: '10px', width: '20%', padding: '10px' }}>
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
        {isOpen ? 'Hide Residents' : 'View Residents'}
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
