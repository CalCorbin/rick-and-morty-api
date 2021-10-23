import React, { useState } from "react";
import ResidentModal from "../ResidentModal/ResidentModal";

const Residents = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleResidentsDisplay = () => {
    setModalIsOpen((prev) => !prev);
  };

  return props.residents.map((resident, index) => {
    return (
      <div
        data-testid={`resident-${index}`}
        key={`resident-${index}`}
        style={{ "margin-bottom": "15px" }}
      >
        <div>
          <strong>Name:</strong> {resident.name}
        </div>
        <div>
          <strong>Status:</strong> {resident.status}
        </div>
        <img src={resident.image} alt={resident.name}></img>
        <div>
          <button onClick={handleResidentsDisplay}>Show Resident Notes</button>
        </div>
        {modalIsOpen && <ResidentModal />}
      </div>
    );
  });
};

const LocationMetrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResidentsDisplay = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ "margin-bottom": "30px" }}>
      <div>
        {props.location.name} | {props.location.type}
      </div>
      <button onClick={handleResidentsDisplay}>View Residents</button>
      {isOpen && <Residents residents={props.location.residents} />}
    </div>
  );
};

export default LocationMetrics;
