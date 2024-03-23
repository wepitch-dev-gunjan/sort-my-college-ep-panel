import * as React from "react";
import "./style.scss";
import { useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Users from "./pages/user";
import Feedbacks from "./pages/feedbacks";
import MyFeeds from "./pages/myfeeds";
import Notifications from "./components/notifications";
import { NotificationContext } from "./context/NotificationContext";
import { useRef } from "react";
import useClickOutside from "./customHooks/useClickOutside";
import { ToastContainer } from "react-toastify";
import { ProfileContext } from "./context/ProfileContext";
import AddProfilePic from "./components/profilePic/addProfilePic";
import AddCoverImage from "./components/coverImage/addCoverImage";
import Help from "./pages/help";
import FaqAndTroubleshooting from "./pages/faqAndTroubleshooting";
import AskQuestion from "./pages/askQuestion";
import "rsuite/dist/rsuite-no-reset.min.css";
import { HelpContext } from "./context/HelpContext";
import DocumentDelete from "./components/documentDelete";
import Leads from "./pages/leads";
import Courses from "./pages/courses"
import Faculties from "./pages/faculties";
import AllQueries from "./pages/allqueries";

function App() {
  const addProfilePicRef = useRef(null);
  const { user, setUser } = useContext(UserContext);

  const { profilePicEditMode, setProfilePicEditMode } =
    useContext(ProfileContext);
  const { coverImageEditMode, setCoverImageEditMode } =
    useContext(ProfileContext);
    const {documentDelete,setDocumentDelete}=useContext(ProfileContext)

  const { askQuestionEnable, setAskQuestionEnable } = useContext(HelpContext);

  const addCoverImageRef = useRef(null);
  const askQuestionRef = useRef(null);

  const { notificationsEnable, setNotificationsEnable, notificationsRef } =
    useContext(NotificationContext);
  const { isLoggedIn } = user;

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ ...user, isLoggedIn: false });
    navigate("/login");
  };

  useClickOutside(addProfilePicRef, () => {
    setProfilePicEditMode((prev) => !prev);
  });

  useClickOutside(askQuestionRef, () => {
    setAskQuestionEnable(false);
  });

  useClickOutside(addCoverImageRef, () => {
    setCoverImageEditMode((prev) => !prev);
  });

  useClickOutside(notificationsRef, () => {
    setNotificationsEnable(false);
  });

  return (
    <div>

      {profilePicEditMode && (
        <div className="add-profile-pic-panel">
          <AddProfilePic ref={addProfilePicRef} />
        </div>
      )}
      {coverImageEditMode && (
        <div className="add-cover-image-panel">
          <AddCoverImage ref={addCoverImageRef} />
        </div>
      )}

      {askQuestionEnable && (
        <div className="ask-a-question">
          <AskQuestion ref={askQuestionRef} />
        </div>
      )}
       {documentDelete && (
        <div className="ask-a-question">
          <DocumentDelete documentDelete={documentDelete} setDocumentDelete={setDocumentDelete} />
        </div>
      )}

      {isLoggedIn && <Header handleLogout={handleLogout} />}
      <div className="main">
        <ToastContainer />

        {notificationsEnable && <Notifications />}

        {isLoggedIn && <Sidebar />}
        <div className={`${isLoggedIn && "main-content"}`}>
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
                <Route path="/feeds" element={<MyFeeds />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/login" element={<Navigate replace to="/" />} />
                <Route path="/help" element={<Help />} />
                <Route path="/leads" element={<Leads />} />
               <Route path = "/allQueries" element={<AllQueries />}/>
                <Route
                  path="/help/faq-and-troubleshooting"
                  element={<FaqAndTroubleshooting />}
                />
                <Route path="/courses" element={<Courses />} />

                <Route path="/faculties" element={<Faculties />} />
                {/* <Route
                  path="/help/faq-and-troubleshooting/ask-a-question"
                  element={<AskQuestion />}
                /> */}
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/password-reset" element={<Login />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

// Webinar Feature
// Reward points
// Admin Approval of profile
// Counsellor have to register first with payment
// webinar recording feature - show recordings on the panel
