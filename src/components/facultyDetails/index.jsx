import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import config from "@/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
const { backend_url } = config;

const FacultyDetails = ({
  profile,
  editProfileEnable,
  setProfile,

  // setAddfaculty,
}) => {
  const [profileSubCount, setProfileSubCount] = useState(2);
  const { setAddfaculty, deleteData, setDeleteData } =
    useContext(ProfileContext);
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
  }, [deleteData]);
  const addfacultybtn = () => {
    setAddfaculty((prev) => !prev);
  };

  const handleDeleteFaculty = (id) => {
    const path = window.location.pathname;
    const newPath = `${path}/${id}`;
    window.history.pushState({ path: newPath }, "", newPath);
    setDeleteData((prev) => !prev);
  };
  return (
    <div className="FacultyDetails-container">
      <div className="heading">
        <h2>Faculty Details</h2>
        <button className="addfaculty" onClick={addfacultybtn}>
          Add
        </button>
      </div>

      <div className="profile-faculty-main">
        {data.map((data, i) => {
          return (
            <div className="profile-faculty-sub">
              <div className="p-faculty-left">
                <img src={data.display_pic}></img>
              </div>
              <div className="p-faculty-right">
                <p>
                  <span>{data.name}</span>
                </p>
                <p>{data.experience_in_years}</p>
                <p>{data.graduated_from}</p>
              </div>
              <div>
                <button>Edit</button>
                <button onClick={() => handleDeleteFaculty(data._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyDetails;
