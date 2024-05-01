import React, { useRef, useEffect, useContext } from 'react';
import { DatePicker } from "@mui/x-date-pickers-pro";
import { CourseContext } from '../../context/CourseContext';


const CustomDatePicker = ({ ...props }) => {
  const datePickerRef = useRef(null);
  const { setAddCourseEnable } = useContext(CourseContext)
  // Add event listener to the DatePicker component
  useEffect(() => {
    const handleClickInsideDatePicker = (event) => {
      console.log(props)
      // Check if the click occurred inside the DatePicker
      if (datePickerRef.current && datePickerRef.current.contains(event.target)) {
        // If click occurred inside the DatePicker, stop event propagation
        event.stopPropagation();
      }
    };

    // Add event listener to the document for capturing all clicks
    document.addEventListener('click', handleClickInsideDatePicker);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickInsideDatePicker);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  // Your clickOutside hook implementation here

  return (
    <div>
      {/* Pass ref to the DatePicker component */}
      <DatePicker ref={datePickerRef} {...props} />
      {/* Other content of your component */}
    </div>
  );
};

export default CustomDatePicker;
