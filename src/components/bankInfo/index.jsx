import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";

const BankInfo = ({ profile, editProfileEnable, setProfile }) => {
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
    <div className="BankInfo-container">
      <div className="heading">
        <h2>Bank Details</h2>
      </div>

      <div className="info">
      <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Recepient Name</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.recepient_name}
                  onChange={(e) => handleInput("recepient_name", e.target.value, setProfile)}
                />
              ) : (
                <p>{profile.recepient_name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Bank Name</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.bank_name}
                  onChange={(e) => handleInput("bank_name", e.target.value, setProfile)}
                />
              ) : (
                <p>{profile.bank_name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Branch</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.branch}
                  onChange={(e) => handleInput("branch", e.target.value, setProfile)}
                />
              ) : (
                <p>{profile.branch}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Account Type</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <div className="account-type-radio">
                  <label className="account-type-text">
                    <input
                      type="radio"
                      value="Savings"
                      checked={profile.account_type === "Savings"}
                      onChange={(e) => handleInput("account_type", e.target.value, setProfile)}
                    />
                    Savings
                  </label>
                  <label>
                    <div className="account-type-text">
                      <input
                        type="radio"
                        value="Current"
                        checked={profile.account_type === "Current"}
                        onChange={(e) => handleInput("account_type", e.target.value, setProfile)}
                      />
                      Current
                    </div>
                  </label>
                </div>
              ) : (
                <p>{profile.account_type}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Account Number</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.account_nummber}
                  onChange={(e) => handleInput("account_number", e.target.value, setProfile)}
                />
              ) : (
                <p>{profile.account_nummber}</p>
              )}
            </div>
          </div>
        </div>

       

        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>IFSC Code</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.ifsc_code}
                  onChange={(e) => handleInput("ifsc_code", e.target.value, setProfile)}
                />
              ) : (
                <p>{profile.ifsc_code}</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div >
  );
};

export default BankInfo;
