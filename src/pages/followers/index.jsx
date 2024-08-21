import { useState, useEffect, useContext } from 'react';
import './style.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import config from '@/config';

const { backend_url } = config;

const Followers = () => {
  const { user } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFollowers = async (search = "") => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/followers`,
        {
          headers: {
            Authorization: user.token,
          },
          params: { search },
        }
      );
      setFollowers(data);
      setLoading(false);
    } catch (err) {
      if (search.trim() === "") {
        // Fetch all followers if the search term is empty
        const { data } = await axios.get(
          `${backend_url}/ep/followers`,
          {
            headers: {
              Authorization: user.token,
            },
          }
        );
        setFollowers(data);
      } else {
        setError("No followers found for the given search term");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers(searchTerm);
  }, [user, searchTerm]);

  const handleReset = () => {
    setSearchTerm("");
    setError("");
    fetchFollowers(); // Fetch all followers
  };

  return (
    <div className="followers-main">
      <h1>Followers</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search followers..."
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
        <p>Loading followers...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : followers.length === 0 ? (
        <p>You don't have any followers yet! Please check back again.</p>
      ) : (
        <div className="followers-list">
          {followers.map((follower) => (
            <div key={follower._id} className="follower-item">
              <img
                src={follower.profile_pic}
                alt={follower.name}
                className="follower-pic"
              />
              <div className="follower-info">
                <p className="follower-name">{follower.name}</p>
                {/* <p className="follower-email">{follower.email}</p> */}
                <p className="follower-phone">+{follower.phone_number}</p>
                <p className="follower-education">{follower.education_level}</p>
                <p className="follower-gender">{follower.gender}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Followers;
