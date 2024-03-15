import { Link, useNavigate } from 'react-router-dom';
import './style.scss'
import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';

const VerifyProfilePopup = () => {
  const { setEditProfileEnable } = useContext(ProfileContext)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profile');
    setEditProfileEnable(true)
  }
  return (
    <div className='VerifyProfilePopup-container'
      onClick={handleClick}
    >
      <h4>Complete your profile to get verified!</h4>
    </div>
  );
};

export default VerifyProfilePopup;