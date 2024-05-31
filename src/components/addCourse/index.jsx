import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import config from "@/config";
import axios from "axios";
import ImageUploader from "../ImageUploder";
import "./style.scss";
import { UserContext } from "../../context/UserContext";
import { CourseContext } from "../../context/CourseContext";
import CustomDatePicker from "../customDatePicker";
import { FaBookReader } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";

import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  InputAdornment,
} from "@mui/material";
import Spinner from "../spinner/Index";

const { backend_url } = config;

const AddCourse = forwardRef((props, ref) => {
  const { setAddCourseEnable } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
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
   if (name === "start_year" || name === "end_year") {
     setCourse((prev) => ({
       ...prev,
       academic_session: {
         ...prev.academic_session,
         [name]: value, // Store as string
       },
     }));
   } else {
     setCourse((prev) => ({ ...prev, [name]: value }));
   }
   setErrors({ ...errors, [name]: "" });
 };
 
 

  const handleDateChange = (field, value) => {
    setAddCourseEnable((prev) => !prev);
    setCourse((prev) => ({
      ...prev,
      academic_session: { ...prev.academic_session, [field]: value },
    }));
  };

  const handleAddCourse = async () => {
    try {
      setLoading((prev) => !prev);

      const { data } = await axios.post(`${backend_url}/ep/courses`, course, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log("Course added successfully:", data);
      setLoading((prev) => !prev);

      setAddCourseEnable(false);
      setCourse({
        // Clear the course state after successful addition
        name: "",
        image: "",
        type: "",
        academic_session: { start_year: null, end_year: null },
        course_fee: "",
        course_duration_in_days: "",
      });
    } catch (error) {
      setLoading((prev) => !prev);

      console.error("Error adding course:", error);
    }
  };

  const handleCancel = () => {
    setAddCourseEnable(false);
  };

  return (
    <div className="addcourse-container">
      <div className="course_section">
        <div className="main-container">
          <div className="course-data">
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Name:</label> */}
              </div>
              <div className="course_input">
                <TextField
                  fullWidth
                  placeholder="    Enter Course Name"
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaBookReader />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Type:</label> */}
              </div>
              <div className="course_input">
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={course.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="UG">UG</MenuItem>
                    <MenuItem value="PG">PG</MenuItem>
                  </Select>
                </FormControl>

                {errors.type && <div className="error">{errors.type}</div>}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Academic Session:</label> */}
              </div>
              <div className="course_input">
                <TextField
                  fullWidth
                  placeholder="Enter Start Year"
                  type="number"
                  name="start_year"
                  value={course.academic_session.start_year || ""}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  placeholder="Enter End Year"
                  type="number"
                  name="end_year"
                  value={course.academic_session.end_year || ""}
                  onChange={handleChange}
                />
                {errors.academic_session && (
                  <div className="error">{errors.academic_session}</div>
                )}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Course Fee:</label> */}
              </div>
              <div className="course_input">
                <TextField
                  fullWidth
                  placeholder="    Enter Fees"
                  type="number"
                  name="course_fee"
                  value={course.course_fee}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaRupeeSign />
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.course_fee && (
                  <div className="error">{errors.course_fee}</div>
                )}
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Course Duration:</label> */}
              </div>
              <div className="course_input">
                <TextField
                  fullWidth
                  placeholder="   Enter duration in days"
                  type="number"
                  name="course_duration_in_days"
                  value={course.course_duration_in_days}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GiDuration />
                      </InputAdornment>
                    ),
                  }}
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
                {loading ? <Spinner /> : "Submit"}
              </button>
              <button
                className="cancel"
                onClick={handleCancel}
                // style={{ backgroundColor: "#1F0A69" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddCourse;
