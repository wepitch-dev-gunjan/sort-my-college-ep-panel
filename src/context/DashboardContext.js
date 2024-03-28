import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import config from '@/config';
const { backend_url } = config;

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        if (user && user.token) {
          const { data } = await axios.get(
            `${backend_url}/ep/dashboard/dashboard-data`,
            {
              headers: {
                Authorization: user.token
              }
            }
          );
          setDashboardData(data);
        } else {
          setDashboardData({
            totalFollowers: 0,
            totalSessions: 0
          }); // Set followers count to 0 if user or token is not available
        }
        setLoading(false); // Update loading state
        setError(null); // Reset error state on successful response
      } catch (error) {
        setError(error.message); // Set error state with the error message
        setLoading(false); // Update loading state
        setDashboardData({
          totalFollowers: 0,
          totalSessions: 0
        });
      }
    };

    getDashboardData();
  }, [user]); // Run the effect whenever the user changes

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        error,
        loading
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
