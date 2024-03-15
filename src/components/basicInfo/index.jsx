import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";

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

  return (
    <div className="BasicInfo-container">
      <div className="heading">
        <h2>Basic info</h2>
      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Address</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.email}
                  onChange={(e) => handleInput("email", e.target.value, setProfile)}
                />
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
              <p>Website URL</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <div className="gender-radio">
                  <label className="gender-text">
                    <input
                      type="radio"
                      value="Male"
                      checked={profile.gender === "Male"}
                      onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                    />
                    Male
                  </label>
                  <label>
                    <div className="gender-text">
                      <input
                        type="radio"
                        value="Female"
                        checked={profile.gender === "Female"}
                        onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                      />
                      Female
                    </div>
                  </label>
                  <label>
                    <div className="gender-text">
                      <span><input
                        type="radio"
                        value="Other"
                        checked={profile.gender === "Other"}
                        onChange={(e) => handleInput("gender", e.target.value, setProfile)}
                      />
                      </span>
                      Other
                    </div>
                  </label>
                </div>
              ) : (
                <p>https://www.sittechno.org/</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Institute Type</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (

                <DatePicker label="Date of birth"
                  defaultValue={dayjs(profile.date_of_birth)}
                  onChange={(date) => handleDateChange(date)}
                />
              ) : (
                <p>Research University</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Year Estd.</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (

                <DatePicker label="Date of birth"
                  defaultValue={dayjs(profile.date_of_birth)}
                  onChange={(date) => handleDateChange(date)}
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
              <p>Specializations</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (

                <DatePicker label="Date of birth"
                  defaultValue={dayjs(profile.date_of_birth)}
                  onChange={(date) => handleDateChange(date)}
                />
              ) : (
                <p>
                  <ul className="specializations">
                    <li>Computer Science and Engineering</li>
                    <li>Artificial Intelligence and Machine Learning</li>
                    <li>Cybersecurity</li>
                    <li>Data Science and Big Data Analytics</li>
                    <li>Software Engineering</li>
                  </ul>

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
