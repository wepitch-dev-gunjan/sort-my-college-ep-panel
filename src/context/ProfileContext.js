import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import config from "@/config";
const { backend_url } = config;

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/institute`, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(data);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (user && user.isLoggedIn) fetchProfile();
  }, [user]);

  const [editProfileEnable, setEditProfileEnable] = useState(false);
  const [profilePicEditMode, setProfilePicEditMode] = useState(false);
  const [coverImageEditMode, setCoverImageEditMode] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [addfaculty, setAddfaculty] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [editKeyFeatureEnable, setEditKeyFeatureEnable] = useState(false);
  const [editAnnouncementsEnable, setEditAnnouncementsEnable] = useState(false);
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
        deleteData,
        setDeleteData,
        addfaculty,
        setAddfaculty,
        addCourse,
        setAddCourse,
        editKeyFeatureEnable,
        setEditKeyFeatureEnable,
        editAnnouncementsEnable,
        setEditAnnouncementsEnable

      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
