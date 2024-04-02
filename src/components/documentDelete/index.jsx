import { useContext, useEffect, useState } from "react";
import config from "@/config";
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import { HelpContext } from "../../context/HelpContext";
import { ProfileContext } from "../../context/ProfileContext";
const { backend_url } = config;

const DocumentDelete = ({ deleteData, setDeleteData }) => {
  const { askQuestionRef } = useContext(HelpContext);
  const { addCourse, setAddCourse } = useContext(ProfileContext);
  const [courses, setCourse] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    setCourseId(parts[parts.length - 1]);
    setPathName(parts[1]);
  }, []);

  const handlePopUp = () => {
    setDeleteData(!deleteData);
  };

  // delete Courses
  const handleDelete = async () => {
    try {
      await axios.delete(`${backend_url}/ep/${pathName}/${courseId}`);
      setCourse((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      setDeleteData((prev) => !prev);
      console.log("Course Deleted Succesfully");
    } catch (error) {
      console.log("error Deleting Course", error);
    }
  };
  return (
    <div ref={askQuestionRef} className="delete-main">
      <div className="delete-container">
        <h3 className="h3">Are You Sure You Want To Delete this {pathName}</h3>
        <div className="btn">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handlePopUp}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDelete;
