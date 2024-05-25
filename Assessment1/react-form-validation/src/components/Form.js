// src/Form.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};

    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'E-mail is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phoneNo) errors.phoneNo = 'Phone Number is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.panNo) errors.panNo = 'PAN Number is required';
    if (!formData.aadharNo) errors.aadharNo = 'Aadhar Number is required';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            {key === 'password' ? (
              <div>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            ) : key === 'country' ? (
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            ) : key === 'city' ? (
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New York">New York</option>
              </select>
            ) : (
              <input type="text" name={key} value={formData[key]} onChange={handleChange} />
            )}
          </label>
          {errors[key] && <span style={{ color: 'red' }}>{errors[key]}</span>}
        </div>
      ))}
      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default Form;
