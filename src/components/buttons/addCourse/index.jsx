import React, { useContext, useEffect, useRef, useState } from "react";
import config from "@/config";
import axios from "axios";
import ImageUploader from "../../ImageUploder";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers-pro";
import useClickOutside from "../../../customHooks/useClickOutside";
import { UserContext } from "../../../context/UserContext";
import { TextField } from "@mui/material";
const { backend_url } = config;

const AddCourse = ({ setAddCourse, setCourses }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(UserContext);
  const Ref = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "",
    academic_session: { start_year: null, end_year: null },
    course_fee: "",
    course_duration_in_days: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errorrrr message when user starts typing in the field
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateChange = (field, value) => {
    setFormData({
      ...formData,
      academic_session: { ...formData.academic_session, [field]: value },
    });
  };

  const handleAddCourse = async () => {
    // // Validate form fields
    // const validationErrors = {};
    // if (!formData.name.trim()) {
    //   validationErrors.name = "Please fill in the name field";
    // }
    // if (!formData.type) {
    //   validationErrors.type = "Please select a type";
    // }
    // if (!formData.academic_session.start_year || !formData.academic_session.end_year) {
    //   validationErrors.academic_session = "Please fill in both start and end years";
    // }
    // if (!formData.course_fee.trim()) {
    //   validationErrors.course_fee = "Please fill in the course fee";
    // }
    // if (!formData.course_duration_in_days.trim()) {
    //   validationErrors.course_duration_in_days = "Please fill in the course duration";
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return; // Stop further execution
    // }

    try {
      const response = await axios.post(`${backend_url}/ep/courses`, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log("Course added successfully:", response.data);
      setAddCourse(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleCancel = () => {
    setAddCourse(false);
  };

  useClickOutside(Ref, () => handleCancel());

  return (
    <div className="addcourse-container">
      <div className="course_section">
        <div className="main-container">
          <div className="img_uploder">
            <ImageUploader />
          </div>
          <div className="course-data">
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Name:</label>
              </div>
              <div className="course_input">
                <input
                  placeholder="enter Course Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Type:</label>
              </div>
              <div className="course_input">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
                {errors.type && <div className="error">{errors.type}</div>}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Academic Session:</label>
              </div>
              <div className="course_input" style={{ width: "300px" }}>
                <DatePicker
                  label="Start Year"
                  views={["year"]}
                  value={formData.academic_session.start_year}
                  onChange={(value) => handleDateChange("start_year", value)}
                  renderInput={(props) => <TextField {...props} />}
                />
                <DatePicker
                  label="End Year"
                  views={["year"]}
                  value={formData.academic_session.end_year}
                  onChange={(value) => handleDateChange("end_year", value)}
                  renderInput={(props) => <TextField {...props} />}
                />
                {errors.academic_session && (
                  <div className="error">{errors.academic_session}</div>
                )}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Course Fee:</label>
              </div>
              <div className="course_input">
                <input
                  placeholder="Enter Fees"
                  type="number"
                  name="course_fee"
                  value={formData.course_fee}
                  onChange={handleChange}
                />
                {errors.course_fee && (
                  <div className="error">{errors.course_fee}</div>
                )}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Course Duration:</label>
              </div>
              <div className="course_input">
                <input
                  placeholder="Enter Duration"
                  type="number"
                  name="course_duration_in_days"
                  value={formData.course_duration_in_days}
                  onChange={handleChange}
                />
                {errors.course_duration_in_days && (
                  <div className="error">{errors.course_duration_in_days}</div>
                )}
              </div>
            </div>
            <div className="btn">
              <button
                className="edit"
                onClick={handleAddCourse}
                style={{ backgroundColor: "#1F0A69" }}
              >
                Submit
              </button>
              <button
                className="cancel"
                onClick={handleCancel}
                style={{ backgroundColor: "#1F0A69" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
