import { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [addCourseEnable, setAddCourseEnable] = useState(false);

  return (
    <CourseContext.Provider
      value={{
        addCourseEnable,
        setAddCourseEnable,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
