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
              image
            }
          }
        }
      }
    `,
  });
}

const LocationMetrics = (props) => {
  return (
    <div style={{ "margin-bottom": "30px" }}>
      <h2>
        {props.location.name} | {props.location.type}
      </h2>
      <h4>Residents</h4>
      <div>
        {props.location.residents.map((resident) => {
          return (
            <div style={{ "margin-bottom": "15px" }}>
              <div><strong>Name:</strong> {resident.name}</div>
              <div><strong>Home:</strong> {props.location.name}</div>
              <div><strong>Status:</strong> {resident.status}</div>
              <img src={resident.image}></img>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

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
          apiData.data.locations.results.map((location) => (
            <LocationMetrics location={location} />
          ))}
      </ul>
    </div>
  );
};

export default Locations;
