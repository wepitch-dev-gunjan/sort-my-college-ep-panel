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
import { TfiAnnouncement } from "react-icons/tfi";
import { VscSymbolKeyword } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { GoCodeReview } from "react-icons/go";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { LiaGraduationCapSolid } from "react-icons/lia";











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
              icon={LuLayoutDashboard}
              text="Dashboard"
              expand={expand}
            />
            <SidebarMenuButton 
            href= "/courses"
            icon={LiaGraduationCapSolid}
            text="Courses Offered"
            expand={expand}
            />
            <SidebarMenuButton 
            href= "/faculties"
            icon={LiaChalkboardTeacherSolid}
            text="Faculties"
            expand={expand}
            />

            <SidebarMenuButton 
            href= "/key-features"
            icon={VscSymbolKeyword}
            text="Key Features"
            expand={expand}
            />

            <SidebarMenuButton
              href="/announcements"
              icon={TfiAnnouncement}
              text="Announcements"
              expand={expand}
            />

            <SidebarMenuButton
              href="/followers"
              icon={BsPeople}
              text="Followers"
              expand={expand}
            />

            <SidebarMenuButton
              href="/reviews"
              icon={GoCodeReview}
              text="Reviews"
              expand={expand}
            />

            <SidebarMenuButton
              href="/leads"
              icon={MdOutlineLeaderboard}
              text="Leads"
              expand={expand}
            />


          </>)

        }
        <hr />

        <SidebarMenuButton
          href="/profile"
          icon={CgProfile}
          text="Profile"
          expand={expand}
        />
        <SidebarMenuButton
          href="/help"
          icon={IoIosHelpCircleOutline}
          text="Help"
          expand={expand}
        />
       
      </div>
    </div>
  );
};

export default Sidebar;
