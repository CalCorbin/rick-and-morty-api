import React, { useState } from 'react';
import Resident from '../Resident/Resident';
import Button from 'react-bootstrap/Button';

const LocationMetrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResidentsDisplay = () => {
    setIsOpen((prev) => !prev);
  };

  function loadResidents(residents) {
    return residents.map((resident, index) => (
      <Resident key={`resident-${index}`} resident={resident} />
    ));
  }

  return (
    <div style={{ 'marginBottom': '30px' }}>
      <div>
        {props.location.name} | {props.location.type}
      </div>
      <Button onClick={handleResidentsDisplay} variant="primary" className="btn-primary" size="sm">
        {isOpen ? 'Hide Residents' : 'View Residents'}
      </Button>
      {isOpen && loadResidents(props.location.residents)}
    </div>
  );
};

export default LocationMetrics;
