import React, { useEffect, useState } from "react";

const Residents = (props) => {
  return (
  props.residents.map((resident) => {
    return (
      <div style={{ "margin-bottom": "15px" }}>
        <div><strong>Name:</strong> {resident.name}</div>
        <div><strong>Status:</strong> {resident.status}</div>
        <img src={resident.image}></img>
      </div>
    );
    })
  )
}

const LocationMetrics = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={{ "margin-bottom": "30px" }}>
      <button onClick={handleFilterOpening}>
        {props.location.name} | {props.location.type}
      </button>
      {isOpen && (
      <Residents residents={props.location.residents} />
      )}
    </div>
  );
};

export default LocationMetrics;
