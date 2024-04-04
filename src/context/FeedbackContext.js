import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import config from "@/config";
const { backend_url } = config;

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/feedback/getall`, {
        params: {
          counsellor_id: user._id,
          page: 1,
          limit: 10,
        },
      });
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, [user]);

  // Pass the feedbacks state as the value to the Provider
  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        getFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
