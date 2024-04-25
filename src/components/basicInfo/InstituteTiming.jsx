import { useEffect, useState } from "react";
import { allTimings, convertTo24HourFormat, filterTime } from "../../utilities";
import IOSSwitch from "../iosSwitch";
import dayjs from "dayjs";

const InstituteTiming = ({ timing, profile, setProfile }) => {
  const [startTime, setStartTime] = useState(profile.timings.start_time);
  const [endTimeTimings, setEndTimeTimings] = useState(['']);

  const handleTimingsChange = (day, field, timing) => {
    const i = profile.timings.findIndex(item => item.day === day);
    const updatedTimings = [...profile.timings]; // Copy the timings array
    updatedTimings[i][field] = timing; // Update the specified field of the timing object
    setProfile(prevProfile => ({ ...prevProfile, timings: updatedTimings })); // Update the profile object
  };

  const handleIsOpenChange = (day, value) => {
    const i = profile.timings.findIndex(item => item.day === day);
    const updatedTimings = [...profile.timings]; // Copy the timings array
    updatedTimings[i]["is_open"] = value; // Update the specified field of the timing object
    setProfile(prevProfile => ({ ...prevProfile, timings: updatedTimings }));
  }

  useEffect(() => {
    console.log(timing.day, convertTo24HourFormat(timing.start_time), convertTo24HourFormat(timing.end_time))
    setEndTimeTimings(filterTime(timing.start_time))
    if (convertTo24HourFormat(timing.end_time) < convertTo24HourFormat(timing.start_time) && convertTo24HourFormat(timing.end_time) !== 0) handleTimingsChange(timing.day, "end_time", timing.start_time)
  }, [profile.timings])
  return (
    <div className="timing">
      <div className="day">
        {timing.day}
      </div>
      <div className="start-time">
        <select
          className="day-start-time"
          value={timing.start_time}
          onChange={(e) => handleTimingsChange(timing.day, "start_time", e.target.value)}
        >
          {allTimings.map((time, i) => (
            <option value={time} key={i}>{time}</option>
          ))}
        </select>
      </div>
      <div className="end-time">
        <select
          className="day-start-time"
          value={timing.end_time}
          onChange={(e) => handleTimingsChange(timing.day, "end_time", e.target.value)}
        >
          {endTimeTimings.map((time, i) => (
            <option value={time} key={i}>{time}</option>
          ))}
        </select>
      </div>
      <IOSSwitch sx={{ m: -1 }} defaultChecked={timing.is_open} onChange={e => handleIsOpenChange(timing.day, e.target.checked)} />
    </div>
  );
};

export default InstituteTiming;