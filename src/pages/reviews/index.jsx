import { useState, useEffect, useContext } from 'react';
import './style.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import config from '@/config';

const { backend_url } = config;

const Reviews = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async (search = "") => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/reviews`,
        {
          headers: {
            Authorization: user.token,
          },
          params: { search },
        }
      );
      setReviews(data);
      setLoading(false);
    } catch (err) {
      if (search.trim() === "") {
        // Fetch all reviews if the search term is empty
        const { data } = await axios.get(
          `${backend_url}/ep/reviews`,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        setReviews(data);
      } else {
        setError("No reviews found for the given search term");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(searchTerm);
  }, [user, searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    setError("");
    fetchReviews(); // Fetch all reviews
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-main">
      <h1>Reviews</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => {
            setError(""); // Clear error when typing
            setSearchTerm(e.target.value);
          }}
          className="search-input"
        />
        <button onClick={handleReset} className="reset-button">
          Reset Filters
        </button>
      </div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : reviews.length === 0 ? (
        <p>You don't have any reviews yet! Please check back again.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <img
                src={review.user_profile_pic}
                alt={review.user_name}
                className="review-pic"
              />
              <div className="review-info">
                <p className="review-name">{review.user_name}</p>
                <div className="review-rating">{renderStars(review.rating)}</div>
                <p className="review-comment">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )} 
    </div>
  );
};

export default Reviews;
