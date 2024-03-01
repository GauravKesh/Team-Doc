// import React from 'react'
import React from 'react';


export default function NearestHospital() {
  const handleClick = () => {
    window.location.href = 'https://www.google.com/maps/search/nearest+hospital+and+medical/@13.1045412,77.5036378,10z';
  };
return (
  <>
    <button className="nearest-hospital-button" onClick={handleClick}>
      Nearest Hospital
    </button>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15555.3943940733!2d77.5036378!3d13.1045412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1snearest%20hospital%20and%20medical!5e0!3m2!1sen!2sin!4v1633943940003!5m2!1sen!2sin"
      width="1000"
      height="600px"
      height="95%"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Google Maps"
    />
  </>
);

}


