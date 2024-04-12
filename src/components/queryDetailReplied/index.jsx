import { useContext, useEffect, useState } from "react";
import config from "@/config";
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import { HelpContext } from "../../context/HelpContext";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
const { backend_url } = config;

const QueryReplied = ({ setQueryPopup }) => {
  const { askQuestionRef } = useContext(HelpContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [enquiry_id, setEnquiry_id] = useState("");
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    setEnquiry_id(parts[parts.length - 1]);
    setPathName(parts[1]);
    console.log(currentPath);
  }, []);
  console.log(pathName);

  const handlePopUp = () => {
    navigate(`/${pathName}/${enquiry_id}`);

    setQueryPopup((prev) => !prev);
  };

  // delete Courses
  const handleDelete = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/ep/singleEnqury/${enquiry_id}`,
        {},
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log(data);
      setEnquiry_id(data);
      // setRerender((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div ref={askQuestionRef} className="delete-main">
      <div className="delete-container">
        <h3 className="h3">
          Are You Sure You have Replied for this Query {pathName}
        </h3>
        <div className="btn">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handlePopUp}>No</button>
        </div>
      </div>
    </div>
  );
};

export default QueryReplied;
