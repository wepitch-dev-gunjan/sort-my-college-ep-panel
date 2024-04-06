import './style.scss';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from '../../context/ProfileContext';

const AnnouncementsChildren = (props) => {
    const { editAnnouncementsEnable, setEditAnnouncementsEnable } = useContext(ProfileContext);
    const [isEditable, setIsEditable] = useState(false); // Local state to track edit mode

    const handleEditClick = () => {
        setIsEditable(true); // Set the component to editable mode
        setEditAnnouncementsEnable(true); // Set the global edit state
    };

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
                <MdDeleteOutline className='ac-delete'/>
            </div>
        </div>
    );
}

export default AnnouncementsChildren;
