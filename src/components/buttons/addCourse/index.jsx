import React from "react";
import ImageUploader from "../../ImageUploder";
import "./style.scss"
import TextFields from "../../TextFields";
import CheckBoxes from "../../checkbox";
import { DatePicker, DateRangePicker } from "@mui/x-date-pickers-pro";


const AddCourse = ({setAddCourse}) => {
 const handlePopClose= () =>{
  setAddCourse((prev) => !prev);
 }
  return (
    <div className="addcourse-container">
      <div className="course_section">
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
              <DatePicker label={'"start year"'} views={['year']} />
              <DatePicker label={'"end year"'} views={['year']} />
              </div>
            </div>
            <div className="right-Section">
              <div className="course_details">
                <label htmlFor="">Graduated From:</label>
              </div>
              <div className="course_input">
                <TextFields data={"Graduated From"} />
              </div>
            </div>
            <button onClick={handlePopClose}> Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
