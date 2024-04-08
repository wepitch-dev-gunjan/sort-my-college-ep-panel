import './style.scss'
import axios from "axios";
import config from "@/config"
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { ProfileContext } from '../../context/ProfileContext';

const { backend_url } = config;

const AddAnnouncementPopup = () => {

  const [newAnnouncementText, setNewAnnouncementText] = useState('');
  const { user } = useContext(UserContext);
  const {addAnnouncementPopup, setAddAnnouncementPopup} = useContext(ProfileContext)
  const {announcements, setAnnouncements} = useContext(ProfileContext)

  const handleAddAnnouncement = async () => {
    try {
      const response = await axios.post(`${backend_url}/ep/announcements`, {
        update: newAnnouncementText,
      }, {
        headers: {
            Authorization: user.token
        }
      });
      setAnnouncements([...announcements, response.data.data]);
      setAddAnnouncementPopup(false);
      setNewAnnouncementText(''); // Clear the input
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };



  return (
    <div className="pop-parent">
    <div className="popup">
    <h2>Add Announcement</h2>
        <textarea
            value={newAnnouncementText}
            onChange={(e) => setNewAnnouncementText(e.target.value)}
            placeholder="Enter a new announcement..."
        />
        <div className="actions">
            <button className='add' onClick={handleAddAnnouncement}>Add</button>
            <button className='cancel' onClick={() => setAddAnnouncementPopup(false)}>Cancel</button>
        </div>
    </div>
</div>
  )
}

export default AddAnnouncementPopup