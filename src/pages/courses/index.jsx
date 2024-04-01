import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import Image from '../../assets/Image.jpeg'
import { ProfileContext } from "../../context/ProfileContext";
const Courses = () => {
 const {addCourse ,setAddCourse} = useContext(ProfileContext);
  const [courses, setCourses] = useState([
    {
      name: "CLAT",
      category: "UG",
      price: "20,000 INR",
      duration: "2",
      mode: "Offline",
      image : Image,
    },
    {
      name: "CUET",
      category: "UG",
      price: "30,000 INR",
      duration: "5",
      mode: "Offline",
      image : Image,
    },
    {
      name: "JEE",
      category: "UG",
      price: "10,000 INR",
      duration: "6",
      mode: "Online",
      image : Image,
    },
    {
      name: "JEE MAIN",
      category: "UG",
      price: "5000 INR",
      duration: "2",
      mode: "Online",
      image : Image,
    },
    {
      name: "JEE ADVANCE",
      category: "UG",
      price: "69,999 INR",
      duration: "12",
      mode: "Hybrid",
      image : Image,
    },
  ]);
  // const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend when component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses"); // Adjust the URL as per your backend endpoint
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
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
        {courses.map((course) => (
          <div key={course._id}>
            <div className="card">
              <div className="card-body">
               <div className="images">
               <img src={course.image} alt="Course Image" />
               </div>
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">Category: {course.category}</p>
                <p className="card-text">Price: {course.price}</p>
                <p className="card-text">Duration: {course.duration} months</p>
                <p className="card-text">Mode: {course.mode}</p>
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
        ))}

      </div>
    
    </div>
  );
};

export default Courses;
