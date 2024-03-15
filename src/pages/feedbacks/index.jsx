import React, { useContext, useEffect } from "react";
import "./style.scss";
import Rating from "@mui/material/Rating";
import Feedback from "../../components/feedback";
import { FeedbackContext } from "../../context/FeedbackContext";

const Feedbacks = () => {
  const { feedbacks, getFeedbacks } = useContext(FeedbackContext);

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="Feedbacks-container">
      <div className="feedbacks">
        {!feedbacks ? (
          <p>Loading feedbacks...</p>
        ) : (
          feedbacks.map((feedback, i) => (
            <Feedback
              key={i}
              id={feedback._id}
              user_name={feedback.user_name}
              user_pic={feedback.profile_pic}
              rating={feedback.rating}
              comment={feedback.message}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
