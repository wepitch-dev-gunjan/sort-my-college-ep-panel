import React from 'react';
import './style.scss';
import { handleInput, handleInputInsideInputChange } from '../../utilities';

const ContactInfo = ({ profile, editProfileEnable, setProfile }) => {
  const handlePhoneNumberChange = (e) => {
    // Limit input to 10 digits
    const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInput('phone_no', phoneNumber, setProfile);
  };

  return (
    <div className="ContactInfo-container">
      <div className="heading">
        <h2>Contact info</h2>
      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Point of Contact</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <div className="phone-input">
                  {/* Country code dropdown */}
                  <select
                    value={profile.phone_code}
                    onChange={(e) => handleInput('phone_code', e.target.value, setProfile)}
                  >
                    <option value="+1">+1(USA)</option>
                    <option value="+91">+91(India)</option>
                  </select>
                  <input
                    type="tel"
                    value={profile.phone_no}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                  />
                </div>
              ) : (
                <p>Admin's Name</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Email Information</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                  {<input type="text" placeholder='Country' value={profile.location.country} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'country', setProfile)} />}
                  {<input type="text" placeholder='State' value={profile.location.state} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'state', setProfile)} />}
                  {<input type="text" placeholder='City' value={profile.location.city} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'city', setProfile)} />}
                  {<input type="text" placeholder='Pin-code' value={profile.location.pin_code} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'pin_code', setProfile)} />}
                </>
              ) : (
                <>
                  <p>admin@siit.com</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Phone Information</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                  {<input type="text" placeholder='Country' value={profile.location.country} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'country', setProfile)} />}
                  {<input type="text" placeholder='State' value={profile.location.state} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'state', setProfile)} />}
                  {<input type="text" placeholder='City' value={profile.location.city} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'city', setProfile)} />}
                  {<input type="text" placeholder='Pin-code' value={profile.location.pin_code} onChange={(e) => handleInputInsideInputChange(e.target.value, 'location', 'pin_code', setProfile)} />}
                </>
              ) : (
                <>
                  <p>1700 234 567</p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;
