import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import LocationData from '../LocationData/LocationData';

export const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        name
        type
        id
      }
    }
  }
`;

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

const cardStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const Locations = (props) => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <div>Explore the Worlds of Rick and Morty</div>
      <h1>Locations</h1>
      <div style={cardStyles}>
        {data &&
          data.locations.results.map((location, index) => (
            <LocationData
              client={props.client}
              key={`location-${index}`}
              location={location}
            />
          ))}
      </div>
    </div>
  );
};

Locations.propTypes = {
  client: PropTypes.object,
};

export default Locations;
