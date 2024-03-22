import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";

const CoursesOffered = ({ profile, editProfileEnable, setProfile }) => {
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
    <div className="CoursesOffered-container">
      <div className="heading">
        <h2>Courses Offered</h2>
      </div>
        <div className="profile-courses">
                <div className='pcb-under-heading'><p>Undergraduate Courses</p></div>
                <div className='pc-blocks-main'>
                    <div className="pc-blocks-sub">
                      {!editProfileEnable 
                      ? 
                        <>
                          <p className='profile-courses-heading'>Bachelor of Science in Computer Science</p>
                          <p><span>Fee Structure:</span> INR 1,50,000 per annum</p>
                          <p><span>Duration:</span> 3 years</p>
                          <p><span>Admission Mode:</span> Entrance Examination</p>
                        </>  
                      : 
                        <>
                          <p className='profile-courses-heading'>
                          <input
                            type="text"
                            value='Bachelor of Science in Computer Science'
                            onChange={(e) => handleInput("email", e.target.value, setProfile)}
                            />
                          </p>
                          <p><span>Fee Structure:</span> INR 1,50,000 per annum</p>
                          <p><span>Duration:</span> 3 years</p>
                          <p><span>Admission Mode:</span> Entrance Examination</p>
                        </>
                    }

                    </div>
                    <div className="pc-blocks-sub">
                        <p className='profile-courses-heading'>Bachelor of Business Administration (BBA) in Marketing</p>
                        <p><span>Fee Structure:</span> INR 1,80,000 per annum</p>
                        <p><span>Duration:</span> 3 years</p>
                        <p><span>Admission Mode:</span> Merit-based</p>
                    </div>
                    <div className="pc-blocks-sub">
                        <p className='profile-courses-heading'>Bachelor of Technology (B.Tech) in Electrical Engineering</p>
                        <p><span>Fee Structure:</span> INR 2,00,000 per annum</p>
                        <p><span>Duration:</span> 4 years</p>
                        <p><span>Admission Mode:</span> JEE Main Score</p>
                    </div>
                </div>

                <div className='pcb-post-heading'><p>Postgraduate Courses</p></div>
                <div className='pc-blocks-main'>
                    <div className="pc-blocks-sub">
                        <p className='profile-courses-heading'>Bachelor of Science in Computer Science</p>
                        <p><span>Fee Structure:</span> INR 1,50,000 per annum</p>
                        <p><span>Duration:</span> 3 years</p>
                        <p><span>Admission Mode:</span> Entrance Examination</p>
                    </div>
                    <div className="pc-blocks-sub">
                        <p className='profile-courses-heading'>Bachelor of Business Administration (BBA) in Marketing</p>
                        <p><span>Fee Structure:</span> INR 1,80,000 per annum</p>
                        <p><span>Duration:</span> 3 years</p>
                        <p><span>Admission Mode:</span> Merit-based</p>
                    </div>
                    <div className="pc-blocks-sub">
                        <p className='profile-courses-heading'>Bachelor of Technology (B.Tech) in Electrical Engineering</p>
                        <p><span>Fee Structure:</span> INR 2,00,000 per annum</p>
                        <p><span>Duration:</span> 4 years</p>
                        <p><span>Admission Mode:</span> JEE Main Score</p>
                    </div>
                </div>
                
        </div>

    </div >
  );
};

export default CoursesOffered;
