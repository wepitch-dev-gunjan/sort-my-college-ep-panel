import "./style.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useContext, useState, useEffect } from "react";
import SidebarMenuButton from "../buttons/sidebarMenuButton";
import RightLeftArrow from "../buttons/rightLeftArrow";
import GroupIcon from "@mui/icons-material/Group";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FeedIcon from "@mui/icons-material/Feed";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useRazorpay from "react-razorpay";
import PersonIcon from "@mui/icons-material/Person";
import { ProfileContext } from "../../context/ProfileContext";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";



const Sidebar = () => {
  const [expand, setExpand] = useState(true);
  const { profile } = useContext(ProfileContext)


  // edited
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call once to set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // Automatically minimize the sidebar on small screens
    if (isSmallScreen) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  }, [isSmallScreen]);
  // edited





  return (
    <div className={`sidebar ${expand ? "expanded" : "collapsed"}`}>
      <div className="right-left-arrow" onClick={() => setExpand(!expand)}>
        <RightLeftArrow expand={expand} />
      </div>
      <div className="sidebar-container">
        {
          profile.verified &&
          // !profile.verified && 
          (<>
            <SidebarMenuButton
              href="/"
              icon={DashboardIcon}
              text="Dashboard"
              expand={expand}
            />
            <SidebarMenuButton 
            href= "/courses"
            icon={FaGraduationCap}
            text="Courses"
            expand={expand}
            />
            <SidebarMenuButton 
            href= "/faculties"
            icon={LiaChalkboardTeacherSolid}
            text="Faculties"
            expand={expand}
            />
            <SidebarMenuButton
              href="/leads"
              icon={FaClipboardQuestion}
              text="Leads"
              expand={expand}
            />

            <SidebarMenuButton
              href="/users"
              icon={GroupIcon}
              text="Followers"
              expand={expand}
            />
            <SidebarMenuButton
              href="/feedbacks"
              icon={ReviewsIcon}
              text="User Feedbacks"
              expand={expand}
            />
            <SidebarMenuButton
              href="/feeds"
              icon={FeedIcon}
              text="Feeds"
              expand={expand}
            />

          </>)

        }
        <hr />

        <SidebarMenuButton
          href="/profile"
          icon={PersonIcon}
          text="Profile"
          expand={expand}
        />
        <SidebarMenuButton
          href="/help"
          icon={HelpOutlineIcon}
          text="Help"
          expand={expand}
        />
       
      </div>
    </div>
  );
};

export default Sidebar;
