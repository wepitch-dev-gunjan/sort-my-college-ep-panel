import React, { useState, useEffect, useContext } from "react";
import config from "@/config";

// import config from "../../config"
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import { ProfileContext } from "../../context/ProfileContext";
import { UserContext } from "../../context/UserContext";
// const { backend_url } = config;
const { backend_url } = config;
const Courses = () => {
 const {user} = useContext(UserContext);
 const {addCourse ,setAddCourse} = useContext(ProfileContext);
 const {documentDelete,setDocumentDelete} =useContext(ProfileContext);
  const [courses, setCourse] = useState([]);

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/ep/courses`,{
         headers : {
          Authorization  :user.token
         }
        }); 
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
// // delete Courses
// const handleDelete = async (courseId) => {
//  try{
// await axios.delete(`${ backend_url }/ep/courses/${courseId}`);
// setCourse ((prevCourses) => 
//  prevCourses.filter((course) => course._id !==courseId)
// );
// console.log("Course Deleted Succesfully")
//  }catch(error){
//   console.log("error Deleting Course" , error)
//  }
// }
const Delete =() =>{
 setDocumentDelete((prev) => !prev)
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
                  <button className="delete_btn"
                  onClick={Delete}
                   >
                    Delete
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
