import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const WhatsNew = ({ profile, editProfileEnable, setProfile }) => {
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
    <div className="whats-new-container">
      <div className="heading">
        <h2>What's New</h2>
      </div>
      <div className="whats-new-parent">
        <div className="whats-new-child">
          <p> <MdOutlineKeyboardArrowRight /> Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="whats-new-child">
          <p> <MdOutlineKeyboardArrowRight /> Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="whats-new-child">
          <p> <MdOutlineKeyboardArrowRight /> Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="whats-new-child">
          <p> <MdOutlineKeyboardArrowRight /> Lorem ipsum dolor sit amet.</p>
        </div>
        
      </div>

    </div >
  );
};

export default WhatsNew;
