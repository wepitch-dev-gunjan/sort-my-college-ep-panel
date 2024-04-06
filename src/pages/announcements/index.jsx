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
    const [announcements, setAnnouncements] = useState([]);
    const { editAnnouncementsEnable, setEditAnnouncementsEnable } = useContext(ProfileContext);
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
    }, [user.token])

    return(
        <div className="announcements-main">
            <div className="announcements-head">
                <h1>Announcements</h1>
                    <button className='a-edit' >Add New</button>
            </div>
            <div className="announcements-parent">
                {announcements.map((announcement, i) => (
                    <AnnouncementsChildren
                    key={i} 
                    update={announcement.update}
                    
                    />
                ))}
                {/* <button><TiPlus /></button> */}
            </div>
        </div>
    )
}

export default Announcements