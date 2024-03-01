import React from 'react'

export default function NearestHospital() {
  const handleClick = () => {
    window.open('https://www.google.com/maps/search/nearest+hospital+and+medical/@13.1045412,77.5036378,10z', '_blank');
  };

  return (
    <button className="nearest-hospital-button" onClick={handleClick}>
      Nearest Hospital
    </button>
  );
};

