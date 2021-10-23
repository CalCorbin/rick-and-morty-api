import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import LocationMetrics from '../LocationMetrics/LocationMetrics';

function getData(client) {
  return client.query({
    query: gql`
      query {
        locations {
          results {
            name
            type
            residents {
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
    getData(props.client).then((items) => {
      if (mounted) {
        setApiData(items);
      }
    });
    return () => (mounted = false);
  });

  return (
    <div>
      <div>Cal's Rick and Morty API</div>
      <h1>Locations</h1>
      <ul>
        {apiData.data &&
          apiData.data.locations.results.map((location, index) => (
            <LocationMetrics key={`location-${index}`} location={location} />
          ))}
      </ul>
    </div>
  );
};

export default Locations;
