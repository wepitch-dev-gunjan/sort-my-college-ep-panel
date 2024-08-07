import { useContext, useEffect, useState } from "react";
import config from "@/config";
import axios from "axios"; // Import Axios for making HTTP requests
import "./style.scss";
import { HelpContext } from "../../context/HelpContext";
import { ProfileContext } from "../../context/ProfileContext";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import Spinner from "../spinner/Index";
const { backend_url } = config;

const DocumentDelete = ({ deleteData, setDeleteData }) => {
  const { askQuestionRef } = useContext(HelpContext);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    setId(parts[parts.length - 1]);
    setPathName(parts[1]);
    console.log(currentPath);
  }, []);
  console.log(id);
  console.log(pathName);

  const handlePopUp = () => {
    setDeleteData(!deleteData);
    navigate(`/${pathName}`);

    setDeleteData((prev) => !prev);
  };

  // delete Courses
  const handleDelete = async () => {
    try {
      setLoading((prev) => !prev);
      await axios.delete(`${backend_url}/ep/${pathName}/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      setLoading((prev) => !prev);

      setDeleteData((prev) => !prev);
      navigate(`/${pathName}`);

      console.log(`${pathName} Deleted Succesfully`);
    } catch (error) {
      setLoading((prev) => !prev);
      console.log("error Deleting Course", error);
      navigate(`/${pathName}`);
    }
  };
  const DeletePathName = pathName === "faculties" ? " faculty" : "course";
  return (
    <div ref={askQuestionRef} className="delete-main">
      <div className="delete-container">
        <h3 className="h3">
          Are you sure you want to delete this {DeletePathName} ?
        </h3>
        <div className="btn">
          <button onClick={handleDelete}>
            {loading ? <Spinner /> : "Yes"}
          </button>
          <button onClick={handlePopUp}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDelete;
