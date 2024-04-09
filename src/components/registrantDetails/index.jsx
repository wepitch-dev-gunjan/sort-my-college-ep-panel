import React from 'react';
import './style.scss';
import { handleInput, handleInputInsideInputChange } from '../../utilities';

const RegistrantDetails = ({ profile, editProfileEnable, setProfile }) => {
  const handlePhoneNumberChange = (e) => {
    // Limit input to 10 digits
    const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleInput('phone_no', phoneNumber, setProfile);
  };

  return (
    <div className="registrant-details-container">
      <div className="heading">
        <h2>Registrant Details</h2>
      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Full Name</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                  <input
                    type="text"
                    value={profile.registrant_full_name}
                    onChange={(e) =>
                     handleInput("registrant_full_name", e.target.value, setProfile)
                   }/>
              ) : (
                <p>{profile.registrant_full_name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Contact Number</p>
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
                  value={profile.registrant_contact_number}
                  onChange={(e) => handleInput('registrant_contact_number', e.target.value, setProfile)}
                />
              </div>
              ) : (
                <>
                  <p>{profile.registrant_contact_number}</p>
                </>
              )}
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Email Id</p>
            </div>
            <div className="info-value">
              {/* {editProfileEnable ? (
                <>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInput("email", e.target.value, setProfile)}
                />
                </>
              ) : (
                <>
                  <p>{profile.email}</p>
                </>
              )} */}
              <p>{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Designation</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                  <input
                    type="text"
                    value={profile.registrant_designation}
                    onChange={e => handleInput('registrant_designation', e.target.value, setProfile)}
                  />
              ) : (
                <p>{profile.registrant_designation}</p>
              )}
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default RegistrantDetails;
