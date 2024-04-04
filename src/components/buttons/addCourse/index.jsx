import React, { useContext, useEffect, useRef, useState } from "react";
import config from "@/config";
import axios from "axios";

import ImageUploader from "../../ImageUploder";
import "./style.scss"
import TextFields from "../../TextFields";
import CheckBoxes from "../../checkbox";
import { DatePicker } from "@mui/x-date-pickers-pro"; // Import only necessary components
import useClickOutside from "../../../customHooks/useClickOutside"
import { UserContext } from "../../../context/UserContext";
const { backend_url } = config;

const AddCourse = ({ setAddCourse , setCourses }) => {
 const { user } = useContext(UserContext)
 const Ref = useRef(null)

 const handleCancel = () => {
  setAddCourse(false);
 }
 useClickOutside(Ref, () => handleCancel());
 
 const [formData, setFormData] = useState({
  name: "",
  image: "",
  type: "",
  academic_session: { start_year: null, end_year: null },
  course_fee: "",
  course_duration_in_days: "",
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
 };

 const handleDateChange = (field, value) => {
  setFormData({
   ...formData,
   academic_session: { ...formData.academic_session, [field]: value },
  });
 };

 const handleAddCourse = async () => {
  try {
   const response = await axios.post(
    `${backend_url}/ep/courses`,
    formData,
    {
     headers: {
      Authorization: user.token,
     },
    }
   );
   console.log("Course added successfully:", response.data);
   setAddCourse(false);
  } catch (error) {
   console.error("Error adding course:", error);
  }
 };

 return (
  <div className="addcourse-container">
   <div  className="course_section">
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
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
        />
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
       </div>
      </div>
      <div className="right-Section">
       <div className="course_details">
        <label htmlFor="">Academic Session:</label>
       </div>
       <div className="course_input" style={{ width: "300px" }}>
        <DatePicker
         label="Start Year"
         value={formData.academic_session.start_year}
         onChange={(date) => handleDateChange("start_year", date)}
        />
        <DatePicker
         label="End Year"
         value={formData.academic_session.end_year}
         onChange={(date) => handleDateChange("end_year", date)}
        />
       </div>
      </div>
      <div className="right-Section">
       <div className="course_details">
        <label htmlFor="">Course Fee:</label>
       </div>
       <div className="course_input">
        <input
         type="number"
         name="course_fee"
         value={formData.course_fee}
         onChange={handleChange}
        />
       </div>
      </div>
      <div className="right-Section">
       <div className="course_details">
        <label htmlFor="">Course Duration:</label>
       </div>
       <div className="course_input">
        <input
         type="number"
         name="course_duration_in_days"
         value={formData.course_duration_in_days}
         onChange={handleChange}
        />
       </div>
      </div>
      <div className="btn">
       <button
        onClick={handleAddCourse}
        style={{ backgroundColor: "#1F0A69" }}
       >
        Submit
       </button>
       <button
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
