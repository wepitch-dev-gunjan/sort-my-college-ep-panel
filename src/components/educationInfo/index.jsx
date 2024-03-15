import TagsInput from "react-tagsinput";
import { handleArrayInputChange } from "../../utilities";
import "./style.scss";
import React, { useState } from 'react';
import 'react-tagsinput/react-tagsinput.css';

const EducationInfo = ({
  profile,
  setProfile,
  editProfileEnable,
}) => {
  const [tags, setTags] = useState(['hjhjh', 'hghghg'])

  return (
    <div className="BasicInfo-container">
      <div className="heading">
        <h2>My Educational Info</h2>
      </div>

      <div className="info">
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Qualification</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <TagsInput
                value={profile.qualifications}
                onChange={(newTags) => setProfile({ ...profile, qualifications: newTags})}
              />
              ) : (
                profile.qualifications?.map((qualification, i) => (
                  <p key={i}>{`${qualification}${i < profile.qualifications.length - 1 ? "," : ""
                    }`}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
