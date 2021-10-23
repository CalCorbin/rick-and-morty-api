import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
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

const LocationMetrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function loadResidents(residents) {
    return residents.map((resident, index) => (
      <Resident key={`resident-${index}`} resident={resident} />
    ));
  }

  const [getResidents, { loading, error, data }] = useLazyQuery(
    GET_RESIDENTS(props.location.id)
  )

  function openResidents() {
    setIsOpen((prev) => !prev);
    getResidents()
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div style={{ marginBottom: '30px' }}>
      <div>
        {props.location.name} | {props.location.type}
      </div>
      <Button
        onClick={() => openResidents()}
        variant="primary"
        className="btn-primary"
        size="sm"
      >
        {isOpen ? 'Hide Residents' : 'View Residents'}
      </Button>
      {isOpen && data && loadResidents(data.location.residents)}
    </div>
  );
};

LocationMetrics.propTypes = {
  client: PropTypes.object,
  location: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default LocationMetrics;
