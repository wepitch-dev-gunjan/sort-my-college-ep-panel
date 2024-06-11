import React, { forwardRef, useContext, useState } from "react";
import config from "@/config";
import axios from "axios";
import "./style.scss";
import { UserContext } from "../../context/UserContext";
import { CourseContext } from "../../context/CourseContext";
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
    course_duration: "",
  });
  const [errors, setErrors] = useState({});
  const [durationUnit, setDurationUnit] = useState('days');
  const [durationRange, setDurationRange] = useState(Array.from({ length: 30 }, (_, i) => i + 1));

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
    setCourse((prev) => ({
      ...prev,
      academic_session: { ...prev.academic_session, [field]: value },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!course.name) newErrors.name = "Course name is required";
    if (!course.type) newErrors.type = "Course type is required";
    // if (!course.academic_session.start_year) newErrors.start_year = "Start year is required";
    if (!course.academic_session.end_year) newErrors.end_year = "Academic Session is required";
    if (!course.course_fee) newErrors.course_fee = "Course fee is required";
    if (!course.course_duration) newErrors.course_duration = "Course duration is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCourse = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const courseData = {
        ...course,
        duration_unit: durationUnit
      };

      const { data } = await axios.post(`${backend_url}/ep/courses`, courseData, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log("Course added successfully:", data);
      setLoading(false);

      setAddCourseEnable(false);
      setCourse({
        // Clear the course state after successful addition
        name: "",
        image: "",
        type: "",
        academic_session: { start_year: null, end_year: null },
        course_fee: "",
        course_duration: "",
      });
    } catch (error) {
      setLoading(false);

      console.error("Error adding course:", error);
    }
  };

  const handleCancel = () => {
    setAddCourseEnable(false);
  };

  const handleDurationUnitChange = (e) => {
    const { value } = e.target;
    setDurationUnit(value);
    let range;
    switch (value) {
      case 'days':
        range = Array.from({ length: 30 }, (_, i) => i + 1);
        break;
      case 'months':
        range = Array.from({ length: 12 }, (_, i) => i + 1);
        break;
      case 'years':
        range = Array.from({ length: 5 }, (_, i) => i + 1);
        break;
      default:
        range = [];
    }
    setDurationRange(range);
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
                  placeholder="Enter Course Name"
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
              </div>
                {errors.name && <div className="error">{errors.name}</div>}
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

              </div>
                {errors.type && <div className="error">{errors.type}</div>}
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
                {/* {errors.start_year && <div className="error">{errors.start_year}</div>} */}
                <TextField
                  fullWidth
                  placeholder="Enter End Year"
                  type="number"
                  name="end_year"
                  value={course.academic_session.end_year || ""}
                  onChange={handleChange}
                />
              </div>
                {errors.end_year && <div className="error">{errors.end_year}</div>}
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Course Fee:</label> */}
              </div>
              <div className="course_input">
                <TextField
                  fullWidth
                  placeholder="Enter Fees"
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
              </div>
                {errors.course_fee && (
                  <div className="error">{errors.course_fee}</div>
                )}
            </div>
            <div className="right-Section">
              <div className="course_details">
                {/* <label htmlFor="">Course Duration:</label> */}
              </div>
              <div className="course_input">
                <FormControl fullWidth>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    name="duration_unit"
                    value={durationUnit}
                    onChange={handleDurationUnitChange}
                  >
                    <MenuItem value="days">Days</MenuItem>
                    <MenuItem value="months">Months</MenuItem>
                    <MenuItem value="years">Years</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    name="course_duration"
                    value={course.course_duration}
                    onChange={handleChange}
                  >
                    {durationRange.map((val) => (
                      <MenuItem key={val} value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
                {errors.course_duration && (
                  <div className="error">{errors.course_duration}</div>
                )}
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
