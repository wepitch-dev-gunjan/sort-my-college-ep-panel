import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";

const KeyFeatures = ({ profile, editProfileEnable, setProfile }) => {
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
    <div className="key-features-container">
      <div className="heading">
        <h2>Key Features</h2>
      </div>
      <div className="key-features-parent">
        <div className="key-feature-child">
          <p><span>1.</span></p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="key-feature-child">
          <p><span>2.</span></p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="key-feature-child">
          <p><span>3.</span></p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="key-feature-child">
          <p><span>4.</span></p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

    </div >
  );
};

export default KeyFeatures;
