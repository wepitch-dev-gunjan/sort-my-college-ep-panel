import React, { useContext, useRef } from "react";
import ImageUploader from "../../ImageUploder";
import "./style.scss"
import TextFields from "../../TextFields";
import CheckBoxes from "../../checkbox";
import { DatePicker, DateRangePicker } from "@mui/x-date-pickers-pro";
import useClickOutside from "../../../customHooks/useClickOutside"
import { UserContext } from "../../../context/UserContext";

const AddCourse = ({setAddCourse}) => {
 const {user} = useContext(UserContext)
 const Ref = useRef(null)
 const handleAddCourse= () =>{
  setAddCourse((prev) => !prev);
 }
 const handleCancel =() =>{
  setAddCourse(false);
 }
 useClickOutside (Ref ,() => handleCancel());
  return (
    <div className="addcourse-container">
      <div ref = {Ref} className="course_section">
        <div className="main-container">
          <div className="img_uploder">
         <ImageUploader />
          </div>
          <div className="course-data">
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Name:</label>
              </div>
              <div className="course_input">
                <TextFields data={"Name"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Type :</label>
              </div>
              <div className="course_input">
                <CheckBoxes data={"Type"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Acedemic Session</label>
              </div>
              <div className="course_input">
              <DatePicker sx = {{position : "absolute"}} label={'"start year"'} views={['year']} />
              <DatePicker label={'"end year"'} views={['year']} />
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Course Fee:</label>
              </div>
              <div className="course_input">
                <TextFields data={"course_fee"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Course Duration:</label>
              </div>
              <div className="course_input">
                <TextFields data={"course_duration_in_days"} />
              </div>
            </div>
            <button onClick={handleAddCourse}> Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
