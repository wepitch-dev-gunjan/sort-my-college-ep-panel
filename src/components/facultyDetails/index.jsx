import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import config from "@/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { backend_url } = config;

const FacultyDetails = ({ profile, editProfileEnable, setProfile }) => {
  const [profileSubCount, setProfileSubCount] = useState(2);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleAddProfileSub = () => {
    setProfileSubCount((prevCount) => prevCount + 1);
  };

  const handleDeleteProfileSub = (index) => {
    setProfileSubCount((prevCount) => prevCount - 1);
    // Additional logic if you need to update profile state upon deletion
  };

  const getFacultyDetails = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/faculties`);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log("error h bhai", error);
    }
  };
  useEffect(() => {
    getFacultyDetails();
  }, []);
  const addfaculty = () => {
    navigate("/addfaculty");
  };

  return (
    <div className="FacultyDetails-container">
      <div className="heading">
        <h2>Faculty Details</h2>
        <button className="addfaculty" onClick={addfaculty}>
          Add
        </button>
      </div>

      <div className="profile-faculty-main">
        {data.map((data, i) => {
          return (
            <div className="profile-faculty-sub">
              <div className="p-faculty-left">
                <img src=""></img>
              </div>
              <div className="p-faculty-right">
                <p>
                  <span>{data.name}</span>
                </p>
                <p>{data.experience_in_years}</p>
                <p>{data.graduated_from}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyDetails;
