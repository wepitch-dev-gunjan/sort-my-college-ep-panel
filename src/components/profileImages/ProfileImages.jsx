import React, { useContext, useState } from 'react'
import './profileImages.scss'
import { UserContext } from '../../context/UserContext';

const ProfileImages = () => {
  const { user } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState('default-profile.jpg');
  const [coverPic, setCoverPic] = useState('default-cover.jpg');


  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setProfilePic(fileReader.result);
    };
  };

  const handleCoverPicChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setCoverPic(fileReader.result);
    };
  };

  return (
    <div className='profileImages'>
      <div className="coverImage">
        <img src={coverPic} alt="Cover" className="cover-photo" />
        <input
          type="file"
          onChange={handleCoverPicChange}
          className="file-input"
          accept="image/*"
        />
      </div>
      <div className="profileImageSection">
        <div className="profileDetails">
          <div className="profileImage">
            <img src={profilePic} alt="Profile" className="profile-photo" />
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="file-input"
              accept="image/*"
            />
          </div>
          <div className="profiletiltle">
            {user.name}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfileImages