import React from "react";
import ImageUploader from "../ImageUploder";
import "./style.scss";
import TextFields from "../TextFields";

const AddFaculty = () => {
  return (
    <div className="addfaculty-container">
      <div className="faculty_section">
        <div className="main-container">
          <div className="img_uploder">
            <ImageUploader />
          </div>
          <div className="faculty-data">
            <div className="right-Section">
              <div className="faculty_details">
                <label htmlFor="">Name:</label>
              </div>
              <div className="faculty_input">
                <TextFields data={"Name"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="faculty_details">
                <label htmlFor="">Experience in years:</label>
              </div>
              <div className="faculty_input">
                <TextFields data={"Experience in years"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="faculty_details">
                <label htmlFor="">Qualifications</label>
              </div>
              <div className="faculty_input">
                <TextFields data={"Qualifications"} />
              </div>
            </div>
            <div className="right-Section">
              <div className="faculty_details">
                <label htmlFor="">Graduated From:</label>
              </div>
              <div className="faculty_input">
                <TextFields data={"Graduated From"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;
