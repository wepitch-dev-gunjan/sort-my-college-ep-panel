import './style.scss'
import FacultyDetails from "../../components/facultyDetails"
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import config from "@/config";
import axios from "axios";
import { UserContext } from '../../context/UserContext';
const { backend_url } = config;
const Faculties = ({faculty}) => {
 const [faculties, setFaculties] = useState([]);
 const [editFaculty, setEditFaculty] = useState(null);
 const { addfaculty,setAddfaculty, deleteData, setDeleteData } =
 useContext(ProfileContext);
 const { user } = useContext(UserContext);

 //getFacultyDetails
 const getFacultyDetails = async () => {
  try {
    const { data } = await axios.get(`${backend_url}/ep/faculties`,{
     headers: {
      Authorization :user.token,
     }
    });
    console.log(data);
    setFaculties(data);
  } catch (error) {
    console.log("error h bhai", error);
  }
};
useEffect(() => {
  getFacultyDetails();
}, [deleteData , addfaculty]);

const addfacultybtn = () => {
  setAddfaculty((prev) => !prev);
}; 
    return(
     <div className="Faculty-container mt-5">
      <div className="addfaculty">
      <h1 className="heading">Faculty Details</h1>
        <button  onClick={addfacultybtn}>
          Add Faculty
        </button>
      </div>
      <hr />
      {faculties.length === 0 ? (
        <p> You don't have any Faculties at the moment! Please click on 'Add' button to add a faculty member.</p>
      ) : (
       <div className="row card-parent">
         {faculties.map((faculty) => (
           <FacultyDetails key={faculty._id} faculty ={faculty}/>
         ))}
       </div>
     )}
   </div>
        // <div className="faculties-parent">
        //     <FacultyDetails />
        // </div>
    )
} 

export default Faculties