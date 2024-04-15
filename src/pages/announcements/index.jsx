import './style.scss'
import AnnouncementsChildren from '../../components/announcementsChildren'
import axios from "axios";
import config from "@/config"
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { ProfileContext } from '../../context/ProfileContext';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { TiPlus } from "react-icons/ti";



const { backend_url } = config;

const Announcements = () =>{
    const {announcements, setAnnouncements} = useContext(ProfileContext);
    const [newAnnouncementText, setNewAnnouncementText] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const { editAnnouncementsEnable, setEditAnnouncementsEnable } = useContext(ProfileContext);
    const {addAnnouncementPopup, setAddAnnouncementPopup} = useContext(ProfileContext);
    const { user } = useContext(UserContext);


    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${backend_url}/ep/announcements`, {
                    headers: {
                        Authorization: user.token
                    }
                });
                setAnnouncements(data);
                console.log(data);
            } catch (error) {
                console.log("Error Fetching Announcements");
            }
        }
        fetchData();
    }, [user.token]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
      };
    
      const handleAddAnnouncement = async () => {
        try {
          const response = await axios.post(`${backend_url}/ep/announcements`, {
            update: newAnnouncementText,
          }, {
            headers: {
                Authorization: user.token
            }
          });
        
          setAnnouncements([...announcements, response.data.data]); // Update announcements list
          console.log(announcements)
          console.log(response.data)
          setNewAnnouncementText(''); // Clear the input
          togglePopup(); // Close the popup
        } catch (error) {
          console.error('Error adding announcement:', error);
        }
      };

    return(
        <div className="announcements-main">
            <div className="announcements-head">
                <h1>Announcements</h1>
                    <button className='a-edit' onClick={() => setAddAnnouncementPopup(true)}>Add New</button>
            </div>
            <div className="announcements-parent">
            {announcements.length === 0 ? (
                    <div className="no-announcements-message">
                        <p>You don't have any announcements yet, please click on 'Add New' to add an announcement.</p>
                    </div>
                ) : (
                    announcements.map((announcement, i) => (
                        <AnnouncementsChildren
                            key={i}
                            update={announcement.update}
                            announcement_id={announcement._id}
                            createdAt={(new Date(announcement.createdAt)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + (new Date(announcement.createdAt)).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        />
                    ))
                )}
                {/* <button><TiPlus /></button> */}
            </div>
        </div>
    )
}

export default Announcements