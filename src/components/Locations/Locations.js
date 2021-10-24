import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import LocationData from '../LocationData/LocationData';
import Loading from '../Loading';
import Error from '../Error';

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

const cardStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  backgroundColor: 'gray',
};

const Locations = (props) => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h1>Explore the Worlds of Rick and Morty</h1>
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
