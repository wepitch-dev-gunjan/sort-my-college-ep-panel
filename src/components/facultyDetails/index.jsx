import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import config from "@/config";
import { UserContext } from "../../context/UserContext";

const { backend_url } = config;

const FacultyDetails = ({ profile, editProfileEnable, setProfile, faculty }) => {
  const { setDeleteData } = useContext(ProfileContext);
  const [editedFaculty, setEditedFaculty] = useState(faculty || {}); // Ensure faculty is not undefined
  const [editFacultyEnable, setEditFacultyEnable] = useState(false);
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFaculty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backend_url}/ep/editfaculties/${faculty._id}`,
        editedFaculty, // Pass the editedFaculty data
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log("Faculty Edited Successfully");
      setEditFacultyEnable(false);
    } catch (error) {
      console.log("error While Editing", error);
    }
  };

  const handleDeleteFaculty = (id) => {
    const path = window.location.pathname;
    const newPath = `${path}/${id}`;
    window.history.pushState({ path: newPath }, "", newPath);
    setDeleteData((prev) => !prev);
  };

  const handleCancel = () => {
    setEditFacultyEnable(false);
  };

  return (
    <div className="FacultyDetails-container">
      <div className="profile-faculty-main">
        {editFacultyEnable ? (
          <>
            <div className="p-faculty-left">
              <input className="img" type="file" name="" id="" />
            </div>
            <div className="info_faculty">
              <input
                className="faculty-title"
                type="text"
                name="name"
                value={editedFaculty?.name || ""}
                onChange={handleInputChange}
              />
              <div className="info-graduate">
                <label htmlFor="type">Experience:</label>
                <input
                  className="faculty-input"
                  type="number"
                  name="experience_in_years"
                  value={editedFaculty?.experience_in_years || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="info-graduate">
                <label htmlFor="type">Graduated from:</label>
                <input
                  className="faculty-input"
                  type="text"
                  name="graduated_from"
                  value={editedFaculty?.graduated_from || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="info-qualification">
                <label htmlFor="type">Qualifications:</label>
                <input
                  className="faculty-input"
                  type="text"
                  name="qualifications"
                  value={editedFaculty?.qualifications || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="faculty-buttons">
                <button className="buttons" onClick={handleSave}>
                  Save
                </button>
                <button className="buttons" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-faculty-left">
              <img src={editedFaculty.display_pic} />
            </div>
            <div className="info_faculty">
              <div className = "faculty_title_name">
                <h5 className="smltxt">{editedFaculty?.name}</h5>
              </div>

              <p className="smltxt">
                Experience: {editedFaculty?.experience_in_years}+ years
              </p>

              <p className="smltxt">
                {" "}
                Graduated from: {editedFaculty?.graduated_from}
              </p>
              <p className="smltxt">
                Qualifications: {editedFaculty?.qualifications}
              </p>
            </div>

            <div className="faculty-buttons">
              <button
                className="buttons"
                onClick={() => setEditFacultyEnable(true)}
              >
                Edit
              </button>
              <button
                className="buttons"
                onClick={() => handleDeleteFaculty(editedFaculty._id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacultyDetails;
