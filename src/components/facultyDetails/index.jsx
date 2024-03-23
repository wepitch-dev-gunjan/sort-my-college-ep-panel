import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import t_1 from "../../assets/t-1.jpg";
import t_3 from "../../assets/t-3.jpg";

const FacultyDetails = ({ profile, editProfileEnable, setProfile }) => {
  const [profileSubCount, setProfileSubCount] = useState(2);
  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const handleAddProfileSub = () => {
    setProfileSubCount((prevCount) => prevCount + 1);
  };

  const handleDeleteProfileSub = (index) => {
    setProfileSubCount((prevCount) => prevCount - 1);
    // Additional logic if you need to update profile state upon deletion
  };

  return (
    <div className="FacultyDetails-container">
      <div className="heading">
        <h2>Faculty Details</h2>
      </div>

      <div className="profile-faculty-main">
        {!editProfileEnable ? 
        <>
          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_1}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Prof. Arjun Patel</span></p>
              <p>25+ Years</p>
              <p>Indian Institute of Science (IISc) Bangalore</p>
            </div>
          </div>
          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_3}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Dr. Priya Sharma</span></p>
              <p>35+ Years</p>
              <p>Indian Institute of Technology (IIT) Bombay</p>
            </div>
          </div>
          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_3}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Dr. Priya Sharma</span></p>
              <p>35+ Years</p>
              <p>Indian Institute of Technology (IIT) Bombay</p>
            </div>
          </div>
          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_1}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Prof. Arjun Patel</span></p>
              <p>25+ Years</p>
              <p>Indian Institute of Science (IISc) Bangalore</p>
            </div>
          </div>

          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_1}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Prof. Arjun Patel</span></p>
              <p>25+ Years</p>
              <p>Indian Institute of Science (IISc) Bangalore</p>
            </div>
          </div>

          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_3}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Dr. Priya Sharma</span></p>
              <p>35+ Years</p>
              <p>Indian Institute of Technology (IIT) Bombay</p>
            </div>
          </div>

          <div className="profile-faculty-sub">
            <div className="p-faculty-left">
              <img src={t_3}></img>
            </div>
            <div className="p-faculty-right">
              <p><span>Dr. Priya Sharma</span></p>
              <p>35+ Years</p>
              <p>Indian Institute of Technology (IIT) Bombay</p>
            </div>
          </div>
          
        </>
          :
          <>         

            {/* add logic  */}
            {[...Array(profileSubCount)].map((_, index) => (
              <div className="profile-faculty-sub" key={index}>
                <div className="p-faculty-left">
                  <img src={index % 2 === 0 ? t_1 : t_3} alt={`Image ${index}`} />
                </div>
                <div className="p-faculty-right">
                  <p>
                    <span>{index % 2 === 0 ? "Prof. Arjun Patel" : "Dr. Priya Sharma"}</span>
                  </p>
                  <p>{index % 2 === 0 ? "25+ Years" : "35+ Years"}</p>
                  <p>{index % 2 === 0 ? "Indian Institute of Science (IISc) Bangalore" : "Indian Institute of Technology (IIT) Bombay"}</p>
                  <button onClick={() => handleDeleteProfileSub(index)}>Delete</button>
                </div>
              </div>
            ))}
            {/* add logic ends  */}

            <button onClick={handleAddProfileSub}>Add</button>
          </>
          
        }
        
      </div>
      

    </div >
  );
};

export default FacultyDetails;
