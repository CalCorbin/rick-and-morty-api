import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";

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
            }
          }
        }
      }
    `,
  });
}

// const LocationResidents = () => {
//
// }

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
  }, []);

  return (
    <div>
      <div>Cal's Rick and Morty API</div>
      <h1>Locations</h1>
      <ul>
        {apiData.data &&
          apiData.data.locations.results.map((location) => <li>{location.name}</li>)}
      </ul>
    </div>
  );
};

export default Locations;
