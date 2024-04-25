export const handleInput = (fieldName, value, setProfile) => {
  setProfile(prev => ({
    ...prev,
    [fieldName]: value,
  }));
};

export const handleArrayInputChange = (fieldName, value, setProfile) => {
  const updatedValues = value.split(",");
  handleInput(fieldName, updatedValues, setProfile);
};

export const handleInputInsideInputChange = (value, input1, input2, setProfile) => {
  setProfile((prevProfile) => ({
    ...prevProfile,
    [input1]: {
      ...prevProfile.address,
      [input2]: value,
    },
  }));
}

export const dataURLtoFile = (dataURL) => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'image.png', { type: mime });
};

export const allTimings = [
  "01:00 am",
  "02:00 am",
  "03:00 am",
  "04:00 am",
  "05:00 am",
  "06:00 am",
  "07:00 am",
  "08:00 am",
  "09:00 am",
  "10:00 am",
  "11:00 am",
  "12:00 pm",
  "01:00 pm",
  "02:00 pm",
  "03:00 pm",
  "04:00 pm",
  "05:00 pm",
  "06:00 pm",
  "07:00 pm",
  "08:00 pm",
  "09:00 pm",
  "10:00 pm",
  "11:00 pm",
  "12:00 am"
];

export const week = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]

export const filterTime = (inputTime) => {

  // Find the index of the input time in the array
  const index = allTimings.findIndex(time => time === inputTime);

  // If input time is not found, return the original array
  if (index === -1) {
    return allTimings;
  }

  // Return a new array starting from the index after the input time
  return allTimings.slice(index + 1);
}

export const convertTo24HourFormat = (timeString) => {
  let [hourStr, period] = timeString.split(' ');
  let [hour, minute] = hourStr.split(':').map(Number);

  if (period === 'pm' && hour !== 12) {
    hour += 12;
  } else if (period === 'am' && hour === 12) {
    hour = 0;
  }

  return hour;
}
