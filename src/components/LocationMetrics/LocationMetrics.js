import React, { useState } from 'react';
import Resident from '../Resident/Resident';

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
    <div style={{ 'margin-bottom': '30px' }}>
      <div>
        {props.location.name} | {props.location.type}
      </div>
      <button onClick={handleResidentsDisplay}>
        {isOpen ? 'Hide Residents' : 'View Residents'}
      </button>
      {isOpen && loadResidents(props.location.residents)}
    </div>
  );
};

export default LocationMetrics;
