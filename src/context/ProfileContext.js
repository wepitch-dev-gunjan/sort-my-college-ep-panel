import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { backend_url } from '../config';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backend_url}/counsellor/${user._id}`,
        {
          headers: {
            Authorization: user.token
          }
        });
      setProfile(response.data[0])
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    if (user && user.isLoggedIn)
      fetchProfile();
  }, [user]);

  const [editProfileEnable, setEditProfileEnable] = useState(false)
  const [profilePicEditMode, setProfilePicEditMode] = useState(false);
  const [coverImageEditMode, setCoverImageEditMode] = useState(false);
  const [documentDelete, setDocumentDelete] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        profilePicEditMode,
        profile,
        setProfile,
        coverImageEditMode,
        setCoverImageEditMode,
        setProfilePicEditMode,
        setEditProfileEnable,
        editProfileEnable,
        fetchProfile,
        documentDelete,
        setDocumentDelete
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
