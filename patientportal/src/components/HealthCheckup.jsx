// import React from 'react'
import React, { useState } from 'react';

export default function HealthCheckup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    presentHealthCondition: '',
    pastHealthCondition: '',
    smoke: false,
    diet: '',
    medication: false,
    regularCheckup: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to backend
    console.log(formData);
  };

  return (
    <div className='flex justify-self-center space-x-2'>
      <h2 className='flex justify-center '>Health Information Form </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label><br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label><br />
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label><br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label><br />
        <label>
          Height:
          <input type="text" name="height" value={formData.height} onChange={handleChange} />
        </label><br />
        <label>
          Weight:
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
        </label><br />
        <label>
          Present Health Condition:
          <textarea name="presentHealthCondition" value={formData.presentHealthCondition} onChange={handleChange} />
        </label><br />
        <label>
          Past Health Condition:
          <textarea name="pastHealthCondition" value={formData.pastHealthCondition} onChange={handleChange} />
        </label><br />
        <label>
          Do you smoke?
          <input type="checkbox" name="smoke" checked={formData.smoke} onChange={handleChange} />
        </label><br />
        <label>
          Veg or Non-Veg?
          <input type="text" name="diet" value={formData.diet} onChange={handleChange} />
        </label><br />
        <label>
          Do you take medication?
          <input type="checkbox" name="medication" checked={formData.medication} onChange={handleChange} />
        </label><br />
        <label>
          Any regular checkup?
          <input type="checkbox" name="regularCheckup" checked={formData.regularCheckup} onChange={handleChange} />
        </label><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
