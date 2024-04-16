import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { handleInput, handleInputInsideInputChange } from "../../utilities";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";


const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

const BasicInfo = ({ profile, editProfileEnable, setProfile }) => {

  const [aboutInputs, setAboutInputs] = useState(profile.about || [""]);

  const handleDateChange = (date) => {
    setProfile((prev) => ({
      ...prev,
      date_of_birth: formatDate(date),
    }));
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );

    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a
              href="https://mui.com/x/introduction/licensing/#pro-plan"
              aria-label="Included on Pro package"
            >
              <ProSpan />
            </a>
          </Tooltip>
          {content}
        </Stack>
      );
    }

    const handleAddAboutPoint = () => {
      setProfile((prevProfile) => ({
        ...prevProfile,
        about: [...prevProfile.about, ""],
      }));
    };
    return content;
  }

  const handleAboutInputChange = (index, value) => {
    const newAboutInputs = [...aboutInputs];
    newAboutInputs[index] = value;
    setAboutInputs(newAboutInputs);
    console.log(aboutInputs);
    setProfile((prevProfile) => ({
      ...prevProfile,
      about: newAboutInputs, // Update the about field with newAboutInputs
    }));
  };

  const addAboutInput = () => {
    setAboutInputs([...aboutInputs, ""]);
  };

  const removeAboutInput = (index) => {
    const newAboutInputs = [...aboutInputs];
    newAboutInputs.splice(index, 1);
    setAboutInputs(newAboutInputs);
  };

  return (
    <div className="BasicInfo-container">
      <div className="heading">
        <h2>Institute Details</h2>
      </div>

      <div className="info">
        {/* name */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Name of Institute</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    handleInput("name", e.target.value, setProfile)
                  }
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
          </div>
        </div>
        {/* about */}
        {/* <div className="row">
          <div className="col">
            <div className="info-field">
              <p>About the Institute</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.about}
                    onChange={(e) =>
                      handleInput("about", e.target.value, setProfile)
                    }
                  ></input>
                  <p className="short-desc-institute">
                    Describe about the Institute in points
                  </p>
                </>
              ) : (
                <p>{profile.about}</p>
              )}
            </div>
          </div>
        </div> */}
        {/* about new*/}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>About the Institute</p>
            </div>
            <div className="info-value about-info-value">
            {editProfileEnable ? (
                <>
                  {aboutInputs.map((about, index) => (
                    <div className="about-sub-points" key={index}>
                      <input
                        type="text"
                        value={about}
                        onChange={(e) => handleAboutInputChange(index, e.target.value)}
                      />
                      {index > 0 && (
                        <button className="remove-about-point" onClick={() => removeAboutInput(index)}>Remove</button>
                      )}
                    </div>
                  ))}
                  <button className="add-about-point" onClick={addAboutInput}>Add</button>
                  <p className="short-desc-institute">
                    Describe about the Institute in points
                  </p>
                </>
              ) : (
                <p>{profile.about.join(", ")}</p>

              )}
            </div>
          </div>
        </div>
        {/* address not done yet */}
        <div className="row">
          <div className="col">
            <div className="info-field address-labels">
             <p>Address</p>
             </div>
            <div className="info-value address-inputs">
              {editProfileEnable ? (
                <>
                  {
                    <input
                      type="text"
                      value={profile.address.building_number}
                      onChange={(e) =>
                        handleInputInsideInputChange(
                          e.target.value,
                          'address',
                          'building_number',
                          setProfile
                        )
                      }
                    />
                  }

                  {
                    <input
                      type="text"
                      value={profile.address.area}
                      onChange={(e) =>
                        handleInputInsideInputChange(
                          e.target.value,
                          'address',
                          'area',
                          setProfile
                        )
                      }
                    />
                  }

                  {
                    <input
                      type="text"
                      value={profile.address.city}
                      onChange={(e) =>
                        handleInputInsideInputChange(
                          e.target.value,
                          'address',
                          'city',
                          setProfile
                        )
                      }
                    />
                  }

                  {
                    <input
                      type="text"
                      value={profile.address.state}
                      onChange={(e) =>
                        handleInputInsideInputChange(
                          e.target.value,
                          'address',
                          'state',
                          setProfile
                        )
                      }
                    />
                  }
                </>
              ) : (
               <>
                <p>{`${profile.address?.building_number},`}</p>
                <p>{`${profile.address?.area},`}</p>
                <p>{`${profile.address?.city},`}</p>
                <p>{`${profile.address?.state},`}</p>
                <p>{`${profile.address?.pin_code},`}</p>
               </>
              )}
            </div>
          </div>
        </div>
        {/* direction URL */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Direction URL</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                <input
                  type="text"
                  value={profile.direction_url}
                  onChange={(e) =>
                    handleInput("direction_url", e.target.value, setProfile)
                  }
                />
                <span className="input-info-small">Example: https://maps.app.goo.gl/hDKQS8UDo8RKvFW28</span>
                </>
                
              ) : (
                <p><a href={profile.direction_url}>{profile.direction_url}</a></p>
              )}
              
            </div>
          </div>
        </div>
        {/* year_established_in */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Year Established</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="number"
                  value={profile.year_established_in}
                  onChange={(e) =>
                    handleInput(
                      "year_established_in",
                      e.target.value,
                      setProfile
                    )
                  }
                />
              ) : (
                <p>{profile.year_established_in}</p>
              )}
            </div>
          </div>
        </div>
        {/* affilations */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Accreditations/Affiliations</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.affilations}
                  onChange={(e) =>
                    handleInput("affilations", e.target.value, setProfile)
                  }
                />
              ) : (
                <p>{profile.affilations}</p>
              )}
            </div>
          </div>
        </div>
        {/* email */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Email</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleInput("email", e.target.value, setProfile)
                  }
                />
              ) : (
                <p>{profile.email} </p>
              )}
            </div>
          </div>
        </div>
        {/* contact_number */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Contact Number</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <div className="phone-input">
                  {/* Country code dropdown */}
                  <select
                    value={profile.phone_code}
                    onChange={(e) =>
                      handleInput("phone_code", e.target.value, setProfile)
                    }
                  >
                    <option value="+1">+1(USA)</option>
                    <option value="+91">+91(India)</option>
                  </select>
                  <input
                    type="tel"
                    value={profile.contact_number}
                    onChange={(e) =>
                      handleInput("contact_number", e.target.value, setProfile)
                    }
                  />
                </div>
              ) : (
                <>
                  <p>{profile.contact_number}</p>
                </>
              )}
            </div>
          </div>
        </div>
        {/* gstin */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>GSTIN</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.gstin}
                  onChange={(e) =>
                    handleInput("gstin", e.target.value, setProfile)
                  }
                />
              ) : (
                <p>{profile.gstin}</p>
              )}
            </div>
          </div>
        </div>
        {/* Institute Timings */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Institute Timings</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <div className="institute-timings-days">
                    <p>Monday - </p>
                    {/* <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
                            <TimePicker />
                          </DemoItem> */}
                  </div>

                  <p>Tuesday - </p>
                  <p>Wednesday - </p>
                  <p>Thursday - </p>
                  <p>Friday - </p>
                  <p>Saturday - </p>
                  <p>Sunday - </p>
                </>
              ) : (
                <div className="institute-profile-timing-main">
                  <p>
                    Monday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Tuesday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Wednesday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Thursday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Friday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Saturday - <span>09:00 to 18:00</span>
                  </p>
                  <p>
                    Sunday - <span>09:00 to 18:00</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* mode_of_study */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Mode of Study</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <input
                  type="text"
                  value={profile.mode_of_study}
                  onChange={(e) =>
                    handleInput("mode_of_study", e.target.value, setProfile)
                  }
                ></input>
              ) : (
                <p>{profile.mode_of_study}</p>
              )}
            </div>
          </div>
        </div>
        {/* medium_of_study */}
        <div className="row">
          <div className="col">
            <div className="info-field">
              <p>Medium of Study</p>
            </div>
            <div className="info-value">
              {editProfileEnable ? (
                <>
                  <input
                    type="text"
                    value={profile.medium_of_study}
                    onChange={(e) =>
                      handleInput("medium_of_study", e.target.value, setProfile)
                    }
                  />
                  <span className="input-info-small">Example: English</span>
                </>
              ) : (
                <p>{profile.medium_of_study}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
