import React, { useState, useEffect, useContext } from "react";
import config from "@/config";

import axios from "axios";
import "./style.scss";
import { ProfileContext } from "../../context/ProfileContext";
import { UserContext } from "../../context/UserContext";
import { DatePicker } from "rsuite";
const { backend_url } = config;
const Courses = () => {
  const { user } = useContext(UserContext);
  const { addCourse, setAddCourse } = useContext(ProfileContext);
  const { deleteData, setDeleteData } = useContext(ProfileContext);
  const [courses, setCourse] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editcourse, setEditCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/courses`, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(data);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [deleteData, addCourse]);

  const handlePopUp = () => {
    setAddCourse((prev) => !prev);
  };
  // handle Edit Save put API
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${backend_url}/ep/courses/${editcourse._id}`,
        editcourse,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log("Course Edited Succesfully ");
      setEditMode(false);
      setCourse((prev) =>
        prev.map((item) => (item._id === editcourse._id ? response.data : item))
      );
    } catch (error) {
      console.log("error while editing course", error);
    }
  };
  // handle Edit Course
  const handleEdit = (course) => {
    setEditCourse(course);
    setEditMode(true);
  };
  // cancel edit course
  const handleCancel = () => {
    setEditCourse(null);
    setEditMode(false);
  };
  const Delete = (id) => {
    const path = window.location.pathname;
    const newPath = `${path}/${id}`;
    window.history.pushState({ path: newPath }, "", newPath);
    setDeleteData((prev) => !prev);
  };
  // Changes The Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (field, value) => {
    setEditCourse((prev) => ({
      ...prev,
      academic_session: {
        ...prev.academic_session,
        [field]: value,
      },
    }));
  };
  return (
    <div className="container mt-5">
      <div className="add_course_btn">
        <h1 className="courses-heading">Courses</h1>
        <button onClick={handlePopUp}>ADD COURSE</button>
      </div>
      <hr />
      {courses.length === 0 ? (
        <p>No course found</p>
      ) : (
        <div className="row card-parent">
          {courses.map((course) => (
            <div key={course._id}>
              <div className="card">
                <div className="card-body">
                  <div className="images">
                    <img src={course.image} alt="Course Image" />
                  </div>
                  {editMode && editcourse && editcourse._id === course._id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        className="card-title"
                        value={editcourse.name}
                        onChange={handleInputChange}
                      />
                      {/* category */}
                      <label htmlFor="type">Category:</label>
                      <input
                        type="text"
                        name="type"
                        className="card-text"
                        value={editcourse.type}
                        onChange={handleInputChange}
                      />
                      {/* fees */}
                      <label htmlFor="course_fee">Fees:</label>

                      <input
                        type="text"
                        name="course_fee"
                        className="card-text"
                        value={editcourse.course_fee}
                        onChange={handleInputChange}
                      />
                      {/* Duration */}
                      <label htmlFor="course_duration_in_days">Duration:</label>

                      <input
                        type="text"
                        name="course_duration_in_days"
                        className="card-text"
                        value={editcourse.course_duration_in_days}
                        onChange={handleInputChange}
                      />
                      {/* academic Session */}
                      <label htmlFor="academic_session">Session:</label>
                      <DatePicker
                        label="Start Year"
                        views={["year"]} // Only allow selecting the year
                        value={editcourse.academic_session.start_year}
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
                        value={editcourse.academic_session.end_year}
                        onChange={(value) =>
                          handleDateChange("end_year", value)
                        }
                        renderInput={(props) => (
                          <input {...props} className="card-text" />
                        )}
                      />

                      <button className="save_btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel_btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{course.name}</h5>
                      <p className="card-text">Category: {course.type}</p>
                      <p className="card-text">Fees: {course.course_fee}</p>
                      <p className="card-text">
                        Duration: {course.course_duration_in_days}
                      </p>
                      <p className="card-text">
                        Session:{" "}
                        {course.academic_session?.start_year &&
                          course.academic_session?.start_year.substring(
                            0,
                            4
                          )}{" "}
                        -{" "}
                        {course.academic_session?.end_year &&
                          course.academic_session?.end_year.substring(0, 4)}
                      </p>

                      <div className="icons">
                        <button
                          className="edit_btn"
                          onClick={() => handleEdit(course)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete_btn"
                          onClick={() => Delete(course._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
