import { useContext, useEffect, useState, createContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import config from '@/config';
const { backend_url } = config;

export const FollowerContext = createContext();

export const FollowerProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const { data } = await axios.get(`${backend_url}/ep/follower/followers`, {
          headers: {
            Authorization: user.token
          }
        });
        setFollowers(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching followers:', error);
        // Perform error handling, like displaying an error message
      }
    };
    getFollowers();
  }, [user]);

  return (
    <FollowerContext.Provider
      value={{
        followers, setFollowers
      }}
    >
      {children}
    </FollowerContext.Provider>
  );
};
