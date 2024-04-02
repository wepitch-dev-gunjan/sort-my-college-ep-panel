import { useContext, useState } from 'react'
import config from "@/config";
import axios from "axios"; // Import Axios for making HTTP requests
import './style.scss'
import { HelpContext } from '../../context/HelpContext'
import { ProfileContext } from '../../context/ProfileContext';
const { backend_url } = config;

const DocumentDelete = ({documentDelete,setDocumentDelete}) => {
    const {askQuestionRef} = useContext(HelpContext)
    const {addCourse ,setAddCourse} = useContext(ProfileContext);
    const [courses, setCourse] = useState([]);

    console.log(documentDelete);
    const handlePopUp=()=>{
        setDocumentDelete(!documentDelete)
        console.log(documentDelete);

    }
// delete Courses
const handleDelete = async (courseId) => {
 try{
await axios.delete(`${ backend_url }/ep/courses/${courseId}`);
setCourse ((prevCourses) => 
 prevCourses.filter((course) => course._id !==courseId)
);
console.log("Course Deleted Succesfully")
 }catch(error){
  console.log("error Deleting Course" , error)
 }
}
    return(
        <div ref={askQuestionRef} className='delete-main'>
            <div className='delete-container'>
                <h3 className='h3'>Are You Sure You Want To Delete Course</h3>
                <div className='btn'>
                    <button onClick= {handleDelete}
                    >Yes</button>
                    <button onClick={handlePopUp}>No</button>

                </div>
            </div>
        </div>
    )
}

export default DocumentDelete