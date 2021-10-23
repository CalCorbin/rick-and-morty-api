import React, { useState } from 'react';
import { gql } from '@apollo/client';
import Resident from '../Resident/Resident';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function queryForResidents(client, locationId) {
  return client.query({
    query: gql`
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
    `,
  });
}

const LocationMetrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [residents, setResidentData] = useState([]);

  function loadResidents(residents) {
    return residents.map((resident, index) => (
      <Resident key={`resident-${index}`} resident={resident} />
    ));
  }

  const handleResidentsDisplay = async () => {
    const getResidents = await queryForResidents(
      props.client,
      props.location.id
    );
    const { residents } = getResidents.data.location;
    await setResidentData(residents);
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <div>
        {props.location.name} | {props.location.type}
      </div>
      <Button
        onClick={handleResidentsDisplay}
        variant="primary"
        className="btn-primary"
        size="sm"
      >
        {isOpen ? 'Hide Residents' : 'View Residents'}
      </Button>
      {isOpen && loadResidents(residents)}
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
