import React, { useState, useEffect, useContext } from "react";
import config from "@/config";

// import config from "../../config"
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import { ProfileContext } from "../../context/ProfileContext";
// const { backend_url } = config;
const { backend_url } = config;
const Courses = () => {
 const {addCourse ,setAddCourse} = useContext(ProfileContext);
  const [courses, setCourse] = useState([]);

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/ep/courses`); 
        console.log(data)
        setCourse(data)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    useEffect (() => {
   fetchCourses();
    } , []);
  
const handlePopUp =() =>{
setAddCourse((prev)=> !prev)
}
  return (
    <div className="container mt-5">
      <div className="add_course_btn">
      <h1 className="courses-heading">Courses</h1>
    <button onClick={handlePopUp}>
     ADD COURSE
        </button>
    </div>
<hr></hr>
      <div className="row card-parent">
        {courses.map((course) => {
         return(
          <div key={course._id}>
            <div className="card">
              <div className="card-body">
               <div className="images">
               <img src={course.image} alt="Course Image" />
               </div>
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">Category: {course.type}</p>
                <p className="card-text">Fees: {course.course_fee}</p>
                <p className="card-text">Duration: {course.course_duration_in_days}</p>
                <p className="card-text">Session: {course.acedemic_session}</p>
                <div className="icons">
                  <button className="edit_btn">
                    Edit
                  </button>
                  <button className="delete_btn">Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
)})}

      </div>
    
    </div>
  );
};

export default Courses;
