import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <Spinner style={{ margin: '20px' }} animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
