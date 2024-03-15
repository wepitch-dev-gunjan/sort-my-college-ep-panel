import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { CiMenuKebab } from 'react-icons/ci';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import "./session.scss";
import { UserContext } from '../../context/UserContext';
import { backend_url } from '../../config';
import useClickOutside from '../../customHooks/useClickOutside';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import './session.scss';

const SessionCard = ({ session, setSessions, getResponse }) => {
  const menuRef = useRef(null)
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sessionDetails, setSessionDetails] = useState(session);

  useClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${backend_url}/counsellor/sessions/${sessionDetails._id}`, sessionDetails, {
        headers: {
          Authorization: user.token
        }
      });
      console.log('Session updated successfully', response.data);
      setEditMode(false);
      setSessions(prev => prev.map(item => (item._id === sessionDetails._id ? item : response.data.session)));
      // Perform any state updates or re-fetch the session list as needed

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCancel = () => {
    setSessionDetails(session);
    setEditMode(false);
  };

  const handleJoinNow = () => {
    if (session.session_link) {
      window.open(session.session_link, '_blank');
    }
  };

  const handleDelete = async () => {
    try {
      // Send an axios request to the server to delete the session
      const { data } = await axios.delete(`${backend_url}/counsellor/sessions/${session._id}`, {
        headers: {
          Authorization: user.token
        }
      });
      toast(data.message);
      getResponse();
    } catch (error) {
      toast(error.message);
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="sessions-i">
      <div className="top">
        <h2>{session.session_type + ' Session'}</h2>
        <div className="drop-down-button" onClick={() => setShowMenu(true)} >
          <CiMenuKebab />
        </div>
      </div>

      {<div ref={menuRef} className={`${showMenu && 'display-active'} drop-down-menu`}>
        <div onClick={() => setEditMode(true)} className="menu-item">
          <AiOutlineEdit />
          <span>Edit</span>
        </div>
        <div onClick={handleDelete} className="menu-item">
          <AiOutlineDelete />
          <span>Delete</span>
        </div>
      </div>}

  {editMode ? (
  <form className='edit-mode-form' onSubmit={handleSave}>
    <table className='edit-mode-table'>
      <tbody>
        <tr>
          <td>Date:</td>
          <td>
            <input
              type="date"
              value={sessionDetails.session_date}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_date: formatDate(e.target.value) })}
              required
            />
          </td>
        </tr>
        <tr>
          <td>Time:</td>
          <td>
            <input
              type="time"
              value={sessionDetails.session_time}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_time: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td>
            <input
              type="number"
              value={sessionDetails.session_duration}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_duration: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>Type:</td>
          <td>
            <input
              type="text"
              value={sessionDetails.session_type}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_type: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>Fees:</td>
          <td>
            <input
              type="number"
              value={sessionDetails.session_fee}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_fee: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>
            <input
              type="text"
              value={sessionDetails.session_status}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_status: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>Available Slots:</td>
          <td>
            <input
              type="number"
              value={sessionDetails.session_available_slots}
              onChange={(e) => setSessionDetails({ ...sessionDetails, session_available_slots: e.target.value })}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div className="edit-mode-bottom">
      <button onClick={handleSave} type="submit">
        Save
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  </form>
) : (
  <>
    <table className="display-mode-table">
      <tbody>
        <tr>
          <td>Date:</td>
          <td>{formatDate(session.session_date)}</td>
        </tr>
        <tr>
          <td>Time:</td>
          <td>{session.session_time}</td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td>{session.session_duration} minutes</td>
        </tr>
        <tr>
          <td>Type:</td>
          <td>{session.session_type}</td>
        </tr>
        <tr>
          <td>Fee:</td>
          <td>{session.session_fee}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{session.session_status}</td>
        </tr>
        <tr>
          <td>Available Slots:</td>
          <td>{session.session_available_slots}</td>
        </tr>
      </tbody>
    </table>
    <div className="bottom">
      <button onClick={handleJoinNow}>Join Now</button>
    </div>
  </>
)}
    </div>
  );
};

export default SessionCard;