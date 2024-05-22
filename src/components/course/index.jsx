import { DatePicker } from "rsuite";
import { toast } from "react-toastify";
import axios from "axios";
import './style.scss';
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { UserContext } from "../../context/UserContext";
import config from '@/config';
const { backend_url } = config;


const Course = ({ course }) => {
  const [editedCourse, setEditedCourse] = useState(course);
  const [editCourseEnable, setEditCourseEnable] = useState(false);
  const { deleteData, setDeleteData } = useContext(ProfileContext);
  const { user } = useContext(UserContext);

  const handleSave = async () => {
    try {

      const formData = new FormData();

      for (const key in editedCourse) {
       console.log(editedCourse[key])
        formData.append(key, editedCourse[key]);
      }
      
      const { data } = await axios.put(
        `${backend_url}/ep/courses/${course._id}`,
        editedCourse,
        {
          headers: {
            Authorization: user.token,
          }
        }
      );

      console.log("Start Year:", editedCourse.academic_session);

      console.log("Course Edited Succesfully ");

      // setEditedCourse((prev) =>
      //   prev.map((item) => (item._id === editedCourse._id ? data : item))
      // );
  
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
      [name]: value
    }));
    console.log(editedCourse)
  };

  const handleDateChange = (field, value) => {
    setEditedCourse((prev) => ({
      ...prev,
      academic_session: {
        ...prev.academic_session,
        [field]: value
      }
    }));
  };

  return (
    <div className="Course-container">
      <div className="card-body">
        {/* {editCourseEnable ? (
          <div className="input_field">
            <input className="img" type="file" name="image" />
          </div>
        ) : (
          <div className="images">
            <img src={editedCourse.image} alt="Course Image" />
          </div>
        )} */}
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
              {/* category */}
              <label htmlFor="type">Category:</label>
              <input
                type="text"
                name="type"
                className="card-text"
                value={editedCourse.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="course_div">
              {/* fees */}
              <label htmlFor="course_fee">Fees:</label>

              <input
                type="text"
                name="course_fee"
                className="card-text"
                value={editedCourse.course_fee}
                onChange={handleInputChange}
              />
            </div>
            <div className="duration_div">
              {/* Duration */}
              <label htmlFor="course_duration_in_days">Duration:</label>

              <input
                type="text"
                name="course_duration_in_days"
                className="card-text"
                value={editedCourse.course_duration_in_days}
                onChange={handleInputChange}
              />
            </div>
            {/* academic Session */}
            {/* <label htmlFor="academic_session">Session:</label>
            <DatePicker
              label="Start Year"
              views={["year"]} // Only allow selecting the year
              value={editedCourse.academic_session.start_year}
              onChange={(value) =>
                handleDateChange("start_year", value)
              }
              renderInput={(props) => (
                <input {...props} className="card-text" />
              )}
            />

            <DatePicker
              label="End Year"
              views={["year"]} // Only allow selecting the year
              value={editedCourse.academic_session.end_year}
              onChange={(value) => handleDateChange("end_year", value)}
              renderInput={(props) => (
                <input {...props} className="card-text" />
              )}
            /> */}

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
            <h5 className="card-title">{editedCourse.name}</h5>
            <p className="card-text">Category: {editedCourse.type}</p>
            <p className="card-text">Fees: {editedCourse.course_fee}</p>
            <p className="card-text">
              Duration: {editedCourse.course_duration_in_days} 
            </p>
            <p className="card-text">Session: {editedCourse.academic_session && editedCourse.academic_session.start_year && new Date(editedCourse.academic_session.start_year).getFullYear()} - {editedCourse.academic_session && editedCourse.academic_session.end_year && new Date(editedCourse.academic_session.end_year).getFullYear()}</p>

        

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