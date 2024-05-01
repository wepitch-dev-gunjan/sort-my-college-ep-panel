import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.scss";
import { UserContext } from "../../context/UserContext";
import config from "@/config";
import Course from "../../components/course";
import { CourseContext } from "../../context/CourseContext";
const { backend_url } = config;

const Courses = () => {
  const { user } = useContext(UserContext);
  const { addCourseEnable, setAddCourseEnable } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/courses`, {
        headers: {
          Authorization: user.token
        }
      });
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handlePopUp = () => {
    setAddCourseEnable((prev) => !prev);
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
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
