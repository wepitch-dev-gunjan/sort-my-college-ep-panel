import { DatePicker } from "rsuite";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { UserContext } from "../../context/UserContext";
import config from "@/config";
import ProfilePic from "../profilePic";
const { backend_url } = config;
const Course = ({ course, image }) => {
  const [editedCourse, setEditedCourse] = useState(course);
  const [editCourseEnable, setEditCourseEnable] = useState(false);
  const { deleteData, setDeleteData } = useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const {profile} =useContext(ProfileContext);
  const [durationUnit, setDurationUnit] = useState(editedCourse.duration_unit || 'days');
  const [durationRange, setDurationRange] = useState(getDurationRange(durationUnit));
  const handleSave = async () => {
    try {
      const formData = new FormData();

      for (const key in editedCourse) {
        console.log(editedCourse[key]);
        formData.append(key, editedCourse[key]);
      }

      const { data } = await axios.put(
        `${backend_url}/ep/courses/${course._id}`,
        editedCourse,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      console.log("Start Year:", editedCourse.academic_session);

      console.log("Course Edited Successfully");

      setEditCourseEnable(false);
    } catch (error) {
      toast.error(error.message);
      console.log("Error while editing course", error);
    }
  };
  const handleCancel = () => {
    setEditCourseEnable(false);
  };

  const Delete = (id) => {
    const path = window.location.pathname;
    const newPath = `${path}/${id}`;
    window.history.pushState({ path: newPath }, "", newPath);
    setDeleteData((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(editedCourse);
  };

  const handleDateChange = (field, value) => {
    setEditedCourse((prev) => ({
      ...prev,
      academic_session: {
        ...prev.academic_session,
        [field]: value,
      },
    }));
  };
  const handleDurationUnitChange = (e) => {
   const { value } = e.target;
   setEditedCourse((prev) => ({
    ...prev,
    duration_unit: value,
    course_duration: 1 // Reset duration to 1 when unit changes
  }));
   setDurationUnit(value);
   handleInputChange(e); // update the parent component state
   setDurationRange(getDurationRange(value));
 };

 function getDurationRange(unit) {
   switch (unit) {
     case 'days':
       return Array.from({ length: 30 }, (_, i) => i + 1);
     case 'months':
       return Array.from({ length: 12 }, (_, i) => i + 1);
     case 'years':
       return Array.from({ length: 5 }, (_, i) => i + 1);
     default:
       return [];
   }
 }
  return (
    <div className="Course-container">
      <div className="card-body">
        {editCourseEnable ? (
          <>
            <input
              type="text"
              name="name"
              className="card-title"
              value={editedCourse.name}
              onChange={handleInputChange}
            />
            <br />
            <div className="category_div">
              <label htmlFor="type">Category:</label>
              <select
                name="type"
                className="card-text"
                value={editedCourse.type}
                onChange={handleInputChange}
              >
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
            </div>
            {/* <div className="course_div">
              <label htmlFor="course_fee">Fees:</label>
              <input
                type="text"
                name="course_fee"
                className="card-text"
                value={editedCourse.course_fee}
                onChange={handleInputChange}
              />
            </div> */}
            {editedCourse.course_fee && (
              <div className="course_div">
                <label htmlFor="course_fee">Fees:</label>
                <input
                  type="text"
                  name="course_fee"
                  className="card-text"
                  value={editedCourse.course_fee}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="duration_div">
              <label htmlFor="course_duration">Duration:</label>
              <select
                name="course_duration"
                className="card-text"
                value={editedCourse.course_duration}
                onChange={handleInputChange}
              >
                {durationRange.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <select
                name="duration_unit"
                className="card-text"
                value={durationUnit}
                onChange={handleDurationUnitChange}
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <div className="academic_session">
              <label htmlFor="academic_session_start_year">Session:</label>
              <input
                type="text"
                name="academic_session_start_year"
                className="card-text"
                value={
                  editedCourse.academic_session?.start_year?.slice(0, 4) || ""
                }
                onChange={(e) => handleDateChange("start_year", e.target.value)}
              />
              <input
                type="text"
                name="academic_session_end_year"
                className="card-text"
                value={
                  editedCourse.academic_session?.end_year?.slice(0, 4) || ""
                }
                onChange={(e) => handleDateChange("end_year", e.target.value)}
              />
            </div>
            <div className="icons">
              <button className="edit_btn" onClick={handleSave}>
                Save
              </button>
              <button className="delete_btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="logo">
              <img src={profile.profile_pic} />
            </div>
            <h5 className="card-title">{editedCourse.name}</h5>
            <p className="card-text">Category: {editedCourse.type}</p>
            {/* <p className="card-text">Feesss: {editedCourse.course_fee}</p> */}

            {editedCourse.course_fee && (
              <p className="card-text">Fees: {editedCourse.course_fee}</p>
            )}

            <p className="card-text">
              Duration: {editedCourse.course_duration}{" "}
              {editedCourse.duration_unit}
            </p>
            <p className="card-text">
              Session:{" "}
              {editedCourse.academic_session &&
              editedCourse.academic_session.start_year
                ? editedCourse.academic_session.start_year.slice(0, 4)
                : "N/A"}{" "}
              -{" "}
              {editedCourse.academic_session &&
              editedCourse.academic_session.end_year
                ? editedCourse.academic_session.end_year.slice(0, 4)
                : "N/A"}
            </p>
            <div className="icons">
              <button
                className="edit_btn"
                onClick={() => setEditCourseEnable(true)}
              >
                Edit
              </button>
              <button
                className="delete_btn"
                onClick={() => Delete(editedCourse._id)}
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

export default Course;
