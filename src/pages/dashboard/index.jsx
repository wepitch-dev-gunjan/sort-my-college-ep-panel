import { useContext, useEffect, useState } from "react";
import RecentLeads from "../../components/dashboardComponents/RecentLeads";
import Widget from "../../components/dashboardComponents/widget";
import "./style.scss";
import { MediaQueryContext } from "../../context/MediaQueryContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { DashboardContext } from "../../context/DashboardContext";
import { ProfileContext } from "../../context/ProfileContext";
import config from "@/config";
import { Link } from "react-router-dom";
import Leads from "../leads";
const { backend_url } = config;

const Dashboard = () => {
  const { smallScreen } = useContext(MediaQueryContext);
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState({
    followers: 0,
    notRepliedQueries: 0,
    unseenQueries: 0,
    totalQueries: 0,
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(
          `${backend_url}/ep/dashboard-data`, 
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="all-dashboard">
      <div className="Dashboard-container">
        <div className="business-dashbaord">
          <h1>Institute Dashboard</h1>
          <div className="widgets-container">
            <Widget heading="Followers" value={dashboardData.followers} />
            <Widget heading="Not Replied Queries" value={dashboardData.notRepliedQueries} />
            <Widget heading="Unseen Queries" value={dashboardData.unseenQueries} />
            <Widget heading="Total Queries" value={dashboardData.totalQueries} />
          </div>
        </div>

        <div className="dashboard-recent-payments-main">
          <div className="seeall">
            <Link to="/leads" element={<Leads />}>
              See all
            </Link>
          </div>

          <RecentLeads />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
