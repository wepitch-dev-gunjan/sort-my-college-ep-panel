import { useContext, useEffect, useState } from "react";
import RecentLeads from "../../components/dashboardComponents/RecentLeads";
import Widget from "../../components/dashboardComponents/widget";
import "./style.scss";
import { MediaQueryContext } from "../../context/MediaQueryContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { DashboardContext } from "../../context/DashboardContext";
import { ProfileContext } from "../../context/ProfileContext";
import config from '@/config';
const { backend_url } = config;

const Dashboard = () => {
  const { dashboardData } = useContext(DashboardContext)
  const { smallScreen } = useContext(MediaQueryContext);
  const { profile } = useContext(ProfileContext)
  const { user } = useContext(UserContext)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const incrementActivityPoint = async () => {
      // console.log("last_checkin_date:", profile.last_checkin_date);
      const lastCheckinDate = new Date(profile.last_checkin_date).toString().slice(0, 10);
      // changed toISOString to toString line22 line24
      const currentDate = new Date().toString().slice(0, 10); // Corrected to get current date properly
      console.log(currentDate)

      if (lastCheckinDate !== currentDate) {
        const { data } = await axios.put(`${backend_url}/counsellor/activity/increment-activity-points`, null, {
          headers: {
            Authorization: user.token
          }
        })
        console.log(data)
      }
    }
    incrementActivityPoint()
  }, [])

  console.log(dashboardData)
  return (
    <div className="all-dashboard">
      <div className="Dashboard-container">
        <div className="business-dashbaord">
          <h1>Institute Dashboard</h1>
          <div className="widgets-container">
            <Widget heading="Enrolled Students" value="3021" />
            <Widget heading="Interactions" value="543632" />
            <Widget heading="Total Queries" value="456711" />
          </div>
        </div>

        {/* recent payments */}
        {/* {isSmallScreen ? null : <RecentPayments />} */}
        {/* <RecentPayments /> */}
        <div className='dashboard-recent-payments-main'>
          <RecentLeads />
        </div>

      </div>
      {/* <div className="summary">{!smallScreen && <Summary />}</div> */}
    </div>
  );
};

export default Dashboard;
