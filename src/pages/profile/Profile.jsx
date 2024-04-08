import "./profile.scss";
import { useContext, useState } from "react";
import ProfilePic from "../../components/profilePic";
import CoverImage from "../../components/coverImage";
import { UserContext } from "../../context/UserContext";
import BasicInfo from "../../components/basicInfo";
import RegistrantDetails from "../../components/registrantDetails";
import OtherInfo from "../../components/otherInfo";
import { ProfileContext } from "../../context/ProfileContext";
import axios from "axios";
import { toast } from "react-toastify";
import CoursesOffered from "../../components/coursesOffered";
import FacultyDetails from "../../components/facultyDetails";
import WhatsNew from "../../components/whatsNew";
import config from "@/config";
const { backend_url } = config;

const Profile = () => {
  const { user } = useContext(UserContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const [initialUserProfileBackup, setInitialUserProfileBackup] =
    useState(profile);
  const { editProfileEnable, setEditProfileEnable } =
    useContext(ProfileContext);

  const [coverImage] = useState(
    "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="
  );

  // Function to handle saving changes
  const handleSave = async () => {
    try {
      const endpointUrl = `${backend_url}/counsellor/${user._id}`; // Replace with your actual endpoint URL

      const response = await axios.put(endpointUrl, profile, {
        headers: {
          Authorization: user.token,
        },
      });
      setProfile(response.data);
      setInitialUserProfileBackup(response.data);
      setEditProfileEnable(false);
      toast("Profile successfully saved");
    } catch (error) {
      // Handle errors if the request fails
      toast(error.message);
      console.error("Error while saving:", error);
      // You might want to handle the error state here
    }
  };

  // Function to handle cancelling changes
  const handleCancel = () => {
    setProfile(initialUserProfileBackup);
    setEditProfileEnable(false);
  };

  return (
    <div className="Profile-container">
      <div className="profile-body">
        <CoverImage src={profile.cover_image} />
        <div className="profile-pic">
          <ProfilePic src={profile.profile_pic} />
        </div>
        <div className="edit-profile">
          <div
            className="edit-profile-button"
            onClick={() => setEditProfileEnable(true)}
          >
            Edit profile
          </div>
        </div>
        <br />
        <div className="profile-info">
          <div className="top">
            {/* <h1>{profile.name}</h1> */}
            <h1>Siliguri Institute of Technology</h1>
            <h3>{profile.designation}</h3>
          </div>
          <div className="middle">
            <RegistrantDetails
              profile={profile}
              editProfileEnable={editProfileEnable}
              setProfile={setProfile}
            />
            <BasicInfo
              profile={profile}
              editProfileEnable={editProfileEnable}
              setProfile={setProfile}
            />

            {/* <OtherInfo
                profile={profile}
                editProfileEnable={editProfileEnable}
                setProfile={setProfile}
              /> */}

            {/* <FacultyDetails
              profile={profile}
              editProfileEnable={editProfileEnable}
              setProfile={setProfile}
            />
            <WhatsNew
              profile={profile}
              editProfileEnable={editProfileEnable}
              setProfile={setProfile}
            /> */}
          </div>
          <div className="bottom">
            {editProfileEnable && (
              <div className="buttons">
                <div className="edit-profile-button" onClick={handleSave}>
                  Save
                </div>
                <div className="edit-profile-button" onClick={handleCancel}>
                  Cancel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
