import { gql } from "@apollo/client";
import React, { useEffect, useState } from 'react'

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

const Locations = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    getData(props.client)
      .then(items => {
        if (mounted) {
          setData(items)
        }
      })
    return () => mounted = false
  }, [])

  console.log("-> data", data);
  return <div>hello</div>;
}

export default Locations;
