import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import Locations from './components/Locations/Locations';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <Locations client={client} />
    </div>
  );
}

export default App;
