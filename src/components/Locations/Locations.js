import React from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import LocationMetrics from '../LocationMetrics/LocationMetrics';

function queryLocations(client) {
  return client.query({
    query: gql`
      query {
        locations {
          results {
            name
            type
            id
            residents {
              id
              name
              status
              image
            }
          }
        }
      }
    `,
  });
}

const Locations = (props) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    let mounted = true;
    queryLocations(props.client).then((items) => {
      if (mounted) {
        setApiData(items);
      }
    });
    return () => (mounted = false);
  });

  return (
    <div>
      <div>Explore the Worlds of Rick and Morty</div>
      <h1>Locations</h1>
      <div>
        {apiData.data &&
          apiData.data.locations.results.map((location, index) => (
            <LocationMetrics
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
