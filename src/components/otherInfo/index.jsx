import "./style.scss";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { handleInput } from "../../utilities";
import TagsInput from "react-tagsinput";
import React from 'react';
import 'react-tagsinput/react-tagsinput.css';


const OtherInfo = ({
  profile,
  setProfile,
  editProfileEnable,

}) => {
  // const handleYearsChange = (e) => {
  //   const value = parseInt(e.target.value);
  //   if (!isNaN(value)) {
  //     handleInput('years_of_experience', value);
  //   }
  // };

  const handleRadioChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      nationality: e.target.value,
    }));
  };

 

  const handleLocationCheckboxChange = (fieldName, value) => {
    const updatedLocations = profile.locations_focused.includes(value)
      ? profile.locations_focused.filter((location) => location !== value)
      : [...profile.locations_focused, value];
    handleInput(fieldName, updatedLocations, setProfile);
  };


  const handleCheckboxChange = (fieldName, value) => {
    const updatedDegrees = profile.degree_focused.includes(value)
      ? profile.degree_focused.filter((degree) => degree !== value)
      : [...profile.degree_focused, value];
    handleInput(fieldName, updatedDegrees, setProfile);
  };

  
  return (
    <div className="OtherInfo-container">
      <div className="heading">
        <h2>Other info</h2>
      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Courses/Programs Offered</p>
            </div>

            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.experience_in_years}
                    onChange={e => handleInput('experience_in_years', e.target.value, setProfile)}
                  />
                </>
              ) : (
                <p>
                  Bachelor of Science in Computer Science,
                  Master of Business Administration (MBA) with a focus on Finance,
                  Diploma in Digital Marketing,
                  Certificate in Data Analytics,
                  Associate Degree in Graphic Design
                </p>
              )}
            </div>
          </div>
        </div>



 


      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Facilities/Resources</p>
            </div>

            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.experience_in_years}
                    onChange={e => handleInput('experience_in_years', e.target.value, setProfile)}
                  />
                </>
              ) : (
                <p>
                  <ul className='other-info-li'>
                    <li>State-of-the-art computer labs equipped with the latest software and hardware.</li>
                    <li>Dedicated career counseling and placement services.</li>
                    <li>On-campus cafeteria serving nutritious meals and snacks.</li>
                    <li>Student lounge for relaxation and informal gatherings.</li>
                  </ul>
                </p>
              )}
            </div>
          </div>
        </div>



 


      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Affiliations</p>
            </div>

            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.experience_in_years}
                    onChange={e => handleInput('experience_in_years', e.target.value, setProfile)}
                  />
                </>
              ) : (
                <p>
                  <ul className='other-info-li'>
                    <li>Accredited by the Accreditation Board for Engineering and Technology (ABET).</li>
                    <li>Collaborative partnership with industry leaders such as Microsoft, Google, and IBM for technology-related programs.</li>
                    <li>Member of the American Marketing Association (AMA) for marketing education and resources.</li>
                    <li>Affiliated with the National Association of Schools of Art and Design (NASAD) for design programs.</li>
                  </ul>
                </p>
              )}
            </div>
          </div>
        </div>



 


      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Social Media Links</p>
            </div>

            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.experience_in_years}
                    onChange={e => handleInput('experience_in_years', e.target.value, setProfile)}
                  />
                </>
              ) : (
                <p>https://www.sittechno.org/contact-us-5e4f8f9bd01ee.html</p>
              )}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default OtherInfo;
