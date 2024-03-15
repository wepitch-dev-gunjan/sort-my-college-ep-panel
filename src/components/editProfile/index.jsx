import React, { useState } from 'react';
import './style.scss';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditProfile = ({ isOpen, onClose }) => {

  const [tempQualification, setTempQualification] = useState("");
  const [tempLanguage, setTempLanguage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [locationError, setLocationError] = useState({
    country: "",
    state: "",
    city: "",
    pin_code: ""
  });
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    experience_in_years: 5,
    how_will_i_help: [],
    qualifications: ["Sample Qualification 1", "Sample Qualification 2"],
    languages_spoken: ["English", "Hindi"],
    location: {
      pin_code: 123456,
      city: 'Sample City',
      state: 'Sample State',
      country: 'Sample Country',
    },
    gender: 'Male',
    date_of_birth: "",
    client_testimonials: [],
    group_session_price: null,
    personal_session_price: null,
  });
  if (!isOpen) {
    return null;
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validateLocation = () => {
    let isValid = true;
    let errors = {
      country: "",
      state: "",
      city: "",
      pin_code: ""
    };

    if (!formData.location.country.trim()) {
      errors.country = "Country is required.";
      isValid = false;
    }
    if (!formData.location.state.trim()) {
      errors.state = "State is required.";
      isValid = false;
    }
    if (!formData.location.city.trim()) {
      errors.city = "City is required.";
      isValid = false;
    }
    if (!formData.location.pin_code) {
      errors.pin_code = "Pin Code is required.";
      isValid = false;
    }

    setLocationError(errors);
    return isValid;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const field = name.split(".")[1]; // Extract the field name after the dot
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    } else if (name === "tempQualification") {
      setTempQualification(value);
    } else if (name === "tempLanguage") {
      setTempLanguage(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleQualificationKeyPress = (e) => {
    if (e.key === "Enter" && tempQualification.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        qualifications: [...formData.qualifications, tempQualification.trim()],
      });
      setTempQualification("");
    }
  };

  const handleLanguageKeyPress = (e) => {
    if (e.key === "Enter" && tempLanguage.trim() !== "") {
      e.preventDefault();
      setFormData({
        ...formData,
        languages_spoken: [...formData.languages_spoken, tempLanguage.trim()],
      });
      setTempLanguage("");
    }
  };

  const handleRemoveLanguage = (indexToRemove) => {
    setFormData({
      ...formData,
      languages_spoken: formData.languages_spoken.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleRemoveQualification = (indexToRemove) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (name === "email") {
      if (!isValidEmail(formData.email)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    } else if (name.includes("location.")) {
      validateLocation();
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!validateLocation()) {
      return;
    }
    setEmailError(""); // Clear any previous email error messages
    console.log('Form data submitted:', formData);
  };

  const handleCancel = () => {
    // For this example, I'm just resetting the form to its initial state
    setFormData({
      name: 'John Doe',
      email: 'johndoe@example.com',
      followers_count: 0,
      experience_in_years: 5,
      total_sessions_attended: 0,
      how_will_i_help: [],
      qualifications: ["Sample Qualification 1", "Sample Qualification 2"],
      languages_spoken: ["English", "Hindi"],
      location: {
        pin_code: 123456,
        city: 'Sample City',
        state: 'Sample State',
        country: 'Sample Country',
      },
      gender: 'Male',
      age: null,
      client_testimonials: [],
      group_session_price: null,
      personal_session_price: null,
    });
  };


  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={emailError ? "error" : ""}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div>
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience_in_years"
            value={formData.experience_in_years}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Qualifications:</label>
          <div className="qualifications-container">
            {formData.qualifications.map((qual, index) => (
              <span key={index} className="tag">
                {qual}
                <span className="remove-tag" onClick={() => handleRemoveQualification(index)}>×</span>
              </span>
            ))}
            <input
              type="text"
              name="tempQualification"
              value={tempQualification}
              onChange={handleChange}
              onKeyPress={handleQualificationKeyPress}
              placeholder="Type and press Enter..."
            />
          </div>
        </div>
        <div>
          <label>Languages Spoken:</label>
          <div className="languages-container">
            {formData.languages_spoken.map((lang, index) => (
              <span key={index} className="tag">
                {lang}
                <span className="remove-tag" onClick={() => handleRemoveLanguage(index)}>×</span>
              </span>
            ))}
            <input
              type="text"
              name="tempLanguage"
              value={tempLanguage}
              onChange={handleChange}
              onKeyPress={handleLanguageKeyPress}
              placeholder="Type and press Enter..."
            />
          </div>
        </div>

        <div className="location-section">
          <h3>Location</h3>
          <div className="location-container">
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className={locationError.country ? "error" : ""}
              />
              {locationError.country && <div className="error-message">{locationError.country}</div>}
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={locationError.state ? "error" : ""}
              />
              {locationError.state && <div className="error-message">{locationError.state}</div>}
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={locationError.city ? "error" : ""}
              />
              {locationError.city && <div className="error-message">{locationError.city}</div>}
            </div>
          </div>
          <div>
            <label>Pin Code:</label>
            <input
              type="text"
              name="location.pin_code"
              value={formData.location.pin_code}
              onChange={handleChange}
              onBlur={handleBlur}
              className={locationError.pin_code ? "error" : ""}
            />
            {locationError.pin_code && <div className="error-message">{locationError.pin_code}</div>}
          </div>
        </div>


        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
          {/* <DatePicker
            selected={formData.date_of_birth}
            onChange={date => setFormData({ ...formData, date_of_birth: date })}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()} // To ensure users can't select a future date
            showYearDropdown
            dropdownMode="select"
          /> */}
        </div>
        <div>
          <label>Group Session Price:</label>
          <input
            type="number"
            name="group_session_price"
            value={formData.group_session_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Personal Session Price:</label>
          <input
            type="number"
            name="personal_session_price"
            value={formData.personal_session_price}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>

  );
};

export default EditProfile;
