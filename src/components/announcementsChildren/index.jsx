import './style.scss';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from '../../context/ProfileContext';
import { UserContext } from '../../context/UserContext';
import axios from "axios";
import config from "@/config"

const { backend_url } = config;

const AnnouncementsChildren = (props) => {
    const { editAnnouncementsEnable, setEditAnnouncementsEnable } = useContext(ProfileContext);
    const [isEditable, setIsEditable] = useState(false);
    const {announcements, setAnnouncements} = useContext(ProfileContext);
    const { user } = useContext(UserContext);

    const handleEditClick = () => {
        setIsEditable(true); 
        setEditAnnouncementsEnable(true); 
    };

    const handleDeleteAnnouncement = async (id) => {
        try {
            const response = await axios.delete(`${backend_url}/ep/announcements/${id}`,{
                headers: {
                    Authorization: user.token
                }
            })
            console.log('Announcement deleted successfully:', response.data);
            setAnnouncements(prevAnnouncements =>
                prevAnnouncements.filter(announcement => announcement._id !== id)
            );
            console.log(announcements)
        } catch(error){
            console.log("Error deleting Announcement!!!")
        }
    }

    return (
        <div className={`announcements-children ${isEditable ? 'editable' : ''}`}>
            {isEditable ? (
                <input type="text" value={props.update} />
            ) : (
                <p>{props.update}</p>
            )}
            <div className="ac-edit-icons">
                {!isEditable && !editAnnouncementsEnable ? (
                    <FaRegEdit className='ac-edit' onClick={handleEditClick} />
                ) : (
                    <IoMdDoneAll className='ac-done' onClick={() => setEditAnnouncementsEnable(false)} />
                )}
                <MdDeleteOutline className='ac-delete' onClick={() => handleDeleteAnnouncement(props.announcement_id)} />
            </div>
        </div>
    );
}

export default AnnouncementsChildren;
