import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';


const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

const BasicInfo = ({ profile, editProfileEnable, setProfile }) => {
  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  
    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a
              href="https://mui.com/x/introduction/licensing/#pro-plan"
              aria-label="Included on Pro package"
            >
              <ProSpan />
            </a>
          </Tooltip>
          {content}
        </Stack>
      );
    }
  
    return content;
  }

  return (
    <div className="BasicInfo-container">
      <div className="heading">
        <h2>Basic info</h2>
      </div>

      <div className="info">

          <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Name of Institute</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                      <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInput("email", e.target.value, setProfile)}
                      />
                  ) : (
                    <p>
                      Siliguri Institute of Technology
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>About the Institute</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (
                      <>
                        <textarea
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        ></textarea>
                        <p className="short-desc-institute" >Write a short description about the Institute</p>
                      </>
                  ) : (
                    <p>
                      At SIIT, our mission is to cultivate a dynamic learning environment that empowers students to excel in the fields of technology, computer science, and information systems. We are committed to providing comprehensive education that not only equips students with technical skills but also nurtures their creativity, critical thinking, and problem-solving abilities.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field address-labels">
                  {!editProfileEnable ? <p>Address</p> : 
                    <>
                      <p>Address</p>
                      <p>Area</p>
                      <p>City</p>
                      <p>Country</p>
                      <p>Pincode</p>
                    </>
                  }
                  
                </div>
                <div className="info-value address-inputs">
                  {editProfileEnable ? (
                    <>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                        
                    </>
                  ) : (
                    <p>S.I.T Campus, Salbari,Hill Cart Road,
                    Post Office - Sukna, Siliguri,
                    District - Darjeeling,
                    Pin Code - 734009,
                    West Bengal (WB),
                    India (IN).</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Year Established</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                    <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => handleInput("email", e.target.value, setProfile)}
                    />
                  ) : (
                    <p>1978</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Accreditations/Affiliations</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                      <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInput("email", e.target.value, setProfile)}
                      />
                  ) : (
                    <p>
                      <ul className="specializations">
                        <li>Indian Association of Higher Education (IAHE) </li>
                        <li>National Consortium for Research Collaboration (NCRC)</li>
                        <li>Center for Advancement in Indian Education (CAIE)</li>
                      </ul>

                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Email</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                      <input
                      type="email"
                      value={profile.address}
                      onChange={(e) => handleInput("email", e.target.value, setProfile)}
                      />
                  ) : (
                    <p>
                      info@siit.com
                    </p>
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
                      value={profile.phone_no}
                      onChange={((e) => handleInput("email", e.target.value, setProfile))}
                    />
                  </div>
                  ) : (
                    <>
                      <p>+91 823 344 9683</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>GSTIN</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                      <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInput("email", e.target.value, setProfile)}
                      />
                  ) : (
                    <p>
                      MFNPK9212A452
                    </p>
                  )}
                </div>
              </div>
            </div>    
            
            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Institute Timings</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                      <>
                        <div className="institute-timings-days">
                          <p>Monday - </p>
                          {/* <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
                            <TimePicker />
                          </DemoItem> */}
                        </div>
                          
                        <p>Tuesday - </p>
                        <p>Wednesday - </p>
                        <p>Thursday - </p>
                        <p>Friday - </p>
                        <p>Saturday - </p>
                        <p>Sunday - </p>
                      </>
                  ) : (
                    <div className="institute-profile-timing-main">
                        <p>Monday - <span>09:00 to 18:00</span></p>
                        <p>Tuesday - <span>09:00 to 18:00</span></p>
                        <p>Wednesday - <span>09:00 to 18:00</span></p>
                        <p>Thursday - <span>09:00 to 18:00</span></p>
                        <p>Friday - <span>09:00 to 18:00</span></p>
                        <p>Saturday - <span>09:00 to 18:00</span></p>

                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Mode of Study</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (

                    <select name="mode-of-study">
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  ) : (
                    <p>
                      Offline/Offine/Both
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="info-field">
                  <p>Medium of Study</p>
                </div>
                <div className="info-value">
                  {editProfileEnable ? (
                      <>
                        <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => handleInput("email", e.target.value, setProfile)}
                        />
                        <span className="input-info-small">Example: English</span>
                      </>
                  ) : (
                    <p>
                      Example: English
                    </p>
                  )}
                </div>
              </div>
            </div>

      </div>
    </div >
  );
};

export default BasicInfo;
