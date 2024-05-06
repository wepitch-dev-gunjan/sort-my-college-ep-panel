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
import TextField from "@mui/material/TextField";
import { CourseContext } from "../../context/CourseContext";
import CustomDatePicker from "../customDatePicker";
import { FaBookReader } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { GiDuration } from "react-icons/gi";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
const { backend_url } = config;

const AddCourse = forwardRef((props, ref) => {
  const datepicker = useRef(null);
  const { setAddCourseEnable } = useContext(CourseContext);

  const [course, setCourse] = useState({
    name: "",
    image: "",
    type: "",
    academic_session: { start_year: null, end_year: null },
    course_fee: "",
    course_duration_in_days: "",
  });
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
    // Clear errorrrr message when user starts typing in the field
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
      const { data } = await axios.post(`${backend_url}/ep/courses`, course, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log("Course added successfully:", data);
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
          {/* <div className="img_uploder">
            <ImageUploader />
          </div> */}
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
                <CustomDatePicker
                  ref={datepicker}
                  name = "start_year"
                  label="Start Year"
                  views={["year"]}
                  value={course.academic_session.start_year}
                  onChange={handleChange}
                  renderInput={(props) => <TextField {...props} />}
                />
                <CustomDatePicker
                  ref={datepicker}
                  label="End Year"
                  views={["year"]}
                  value={course.academic_session.end_year}
                  // onChange={handleChange}
                  // onChange={(value) => handleDateChange("end_year", value)}
                  renderInput={(props) => <TextField {...props} />}
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
                        <MdAttachMoney />
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
                  placeholder="   Enter Duration"
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
                Submit
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
