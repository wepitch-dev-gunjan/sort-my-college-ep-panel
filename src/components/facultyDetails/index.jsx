import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput } from "../../utilities";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import config from "@/config";
import { UserContext } from "../../context/UserContext";
const { backend_url } = config;

const FacultyDetails = ({
  profile,
  editProfileEnable,
  setProfile,

  // setAddfaculty,
}) => {
  const [profileSubCount, setProfileSubCount] = useState(2);
  const { addfaculty,setAddfaculty, deleteData, setDeleteData } =
    useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [editFaculty, setEditFaculty] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const handleDateChange = (date) => {
  //   setProfile((prev) => ({
  //     ...prev,
  //     date_of_birth: formatDate(date),
  //   }));
  // };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const getFacultyDetails = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/faculties`,{
       headers: {
        Authorization :user.token,
       }
      });
      console.log(data);
      setData(data);
    } catch (error) {
      console.log("error h bhai", error);
    }
  };
  useEffect(() => {
    getFacultyDetails();
  }, [deleteData , addfaculty]);

  const addfacultybtn = () => {
    setAddfaculty((prev) => !prev);
  }; 

  const handleDeleteFaculty = (id) => {
    const path = window.location.pathname;
    const newPath = `${path}/${id}`;
    window.history.pushState({ path: newPath }, "", newPath);
    setDeleteData((prev) => !prev);
  };
  // handle Edit Save
  const handleEdit = (faculty) => {
    setEditFaculty(faculty);
    setEditMode(true);
  };
  // handle cancel
  const handleCancel = () => {
    setEditFaculty(null);
    setEditMode(false);
  };
  // handle Save And Put Api
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backend_url}/ep/editfaculties/${editFaculty._id}`,
        editFaculty,
        {
         headers: {
           Authorization: user.token,
         },
       }
      );
      console.log("Faculty Edited Succesfully");
      setEditMode(false);
      setData((prev) => prev.map((item) => (item._id === editFaculty._id ? response.data : item))
      
      );
    } catch (error) {
      console.log("error While Editing");
    }
  };
  // Changes The Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFaculty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="FacultyDetails-container">
      <div className="heading">
        <h1>Faculty Details</h1>
        <button className="addfaculty" onClick={addfacultybtn}>
          Add
        </button>
      </div>
      {data.length === 0 ? (
        <p> You don't have any Faculties at the moment! Please click on 'Add' button to add a faculty member.</p>
      ) : (
        <div className="profile-faculty-main">
          {data.map((data,i) => (
            <div className="profile-faculty-sub" key={data._id}>
              {editMode && editFaculty && editFaculty._id === data._id ? (
                <div className="p-faculty-left">
                  <input className="img" type="file" name="" id="" />
                </div>
              ) : (
                <div className="p-faculty-left">
                  <img src={data.display_pic} />
                </div>
              )}
              <div className="p-faculty-right">
                {editMode && editFaculty && editFaculty._id === data._id ? (
                  <div className="info">
                    <input
                      className="faculty-input"
                      type="text"
                      name="name"
                      value={editFaculty.name}
                      onChange={handleInputChange}
                    />
                    {/* Experience */}
                    <input
                      className="faculty-input"
                      type="number"
                      name="experience_in_years"
                      value={editFaculty.experience_in_years}
                      onChange={handleInputChange}
                    />
                    {/* Graduated from */}
                    <input
                      className="faculty-input"
                      type="text"
                      name="graduated_from"
                      value={editFaculty.graduated_from}
                      onChange={handleInputChange}
                    />
                    <input
                      className="faculty-input"
                      type="text"
                      name="qualifications"
                      value={editFaculty.qualifications}
                      onChange={handleInputChange}
                    />
                    <div className="faculty-buttons">
                      <button className="buttons" onClick={handleSave}>
                        Save
                      </button>
                      <button className="buttons" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info">
                    <p>
                      <span className="span"> <span className="smltxt" >Name: </span> {data.name}</span>
                    </p>
                    <p>
                      <span className="smltxt" >Experience: </span>
                      {data.experience_in_years}+ years
                      {/* {" "} */}
                      {/* <sup className="spans">+ Years of Experience</sup>{" "} */}
                    </p>
                    <p> <span className="smltxt"> Graduated from: </span>{data.graduated_from}</p>
                    <p> <span className="smltxt" >Qualifications: </span>{data.qualifications}</p>
                    <div className="faculty-buttons">
                      <button
                        className="buttons"
                        onClick={() => handleEdit(data)}
                      >
                        Edit
                      </button>
                      <button
                        className="buttons"
                        onClick={() => handleDeleteFaculty(data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyDetails;
