import { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import {
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MediaQueryContext } from "../../../context/MediaQueryContext";
import { MdMenu } from "react-icons/md";
import axios from "axios";
import config from "@/config";
import { UserContext } from "../../../context/UserContext";
const { backend_url } = config;
const RecentLeads = () => {
  const [queries, setQueries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown element
  const { xSmallScreen } = useContext(MediaQueryContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const getQueriesData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/ep/enquiries`, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log("sddsfsdf", { data });
      setQueries(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  useEffect(() => {
    getQueriesData();
  }, []);

  return (
    <div className="RecentPayments-container">
      <h1>Recent Leads</h1>

      <div className="filters" ref={dropdownRef}>
        {xSmallScreen ? (
          <>
            <div className="dropdown-header" onClick={toggleDropdown}>
              {/* Hamburger icon */}
              <span>Filters</span>
              <MdMenu />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {/* Search field */}
                <TextField
                  label="Search"
                  type="text"
                  name="search"
                  placeholder="Search by all fields"
                />
                {/* Status dropdown */}
                <FormControl style={{ width: "150px" }}>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" label="Status" defaultValue="All">
                    <MenuItem value="All">ALL</MenuItem>
                    <MenuItem value="REPLIED">REPLIED</MenuItem>
                    <MenuItem value="PENDING">PENDING</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </>
        ) : (
          <>
            <TextField
              label="Search"
              type="text"
              name="search"
              sx={{ height: "50px", width: "400px" }}
              placeholder="Search by all fields"
            />
            <FormControl style={{ width: "150px" }}>
              <InputLabel>Status</InputLabel>
              <Select name="status" label="Status" defaultValue="All">
                <MenuItem value="All">ALL</MenuItem>
                <MenuItem value="REPLIED">REPLIED</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
              </Select>
            </FormControl>
            <div className="btn_main">
              <Button sx={{ height: "55 px" }} variant="contained">
                Apply Filters
              </Button>
              <Button sx={{ height: "55 px" }} variant="contained">
                Reset Filters
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="payments-top">
        {/* <h1>Recent Leads</h1> */}
        <Link to="/queries">
          <div className="see-all-button">SEE ALL</div>
        </Link>
      </div>
      <div className="dashboard-table-parent">
        <div className="table payments-table">
          <div className="row">
            <div className="col">
              <h4>ID</h4>
            </div>
            <div className="col">
              <h4>Date</h4>
            </div>
            <div className="col">
              <h4>Name</h4>
            </div>
            <div className="col">
              <h4>Phone Number</h4>
            </div>
            <div className="col">
              <h4>Status</h4>
            </div>
            {/* <div><h4>Query</h4></div> */}
          </div>
          {queries.map((query, i) => (
            <div className="row" key={i}>
              <div className="col">
                {" "}
                <p>{query._id}</p>
              </div>
              <div className="col">
                <p>{query.date}</p>
              </div>
              <div className="col">
                <p>{query.name}</p>
              </div>
              <div className="col">{/* <p>{query.phone}</p> */}</div>
              {/* <div className= "col"><p>{query.query}</p></div> */}
              <div
                className={`col ${
                  query.status === "Cancelled"
                    ? "red"
                    : query.status === "Replied"
                    ? "green"
                    : query.status === "Pending"
                    ? "blue"
                    : ""
                }`}
              >
                <p>{query.status}</p>
              </div>
              <div className="link">
                <Link to={"/allQueries"}>
                  <p>View </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentLeads;
