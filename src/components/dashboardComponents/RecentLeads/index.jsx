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
import axios from "axios";
import config from "@/config";
import { UserContext } from "../../../context/UserContext";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from 'date-fns';

const { backend_url } = config;

const RecentLeads = () => {
  const [queries, setQueries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { xSmallScreen } = useContext(MediaQueryContext);
  const { user } = useContext(UserContext);
  const [filterParams, setFilterParams] = useState({
    status: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toISTISOString = (date) => {
    if (!date) return null;
  
    const validDate = date instanceof Date ? date : new Date(date);
    if (isNaN(validDate.getTime())) {
      console.error("Invalid date:", date);
      return null;
    }
  
    const offset = 5.5 * 60; // IST offset in minutes
    const ISTDate = new Date(validDate.getTime() + offset * 60 * 1000);
    return ISTDate.toISOString();
  };
  
  const getQueriesData = async () => {
    try {
      const response = await axios.get(`${backend_url}/ep/enquiries`, {
        headers: {
          Authorization: user.token,
        },
        params: {
          ...filterParams,
          startDate: filterParams.startDate
            ? toISTISOString(filterParams.startDate)
            : null,
          endDate: filterParams.endDate
            ? toISTISOString(filterParams.endDate)
            : null,
        },
      });
      let { data } = response;
      setQueries(data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };
  

  
  useEffect(() => {
    getQueriesData();
  }, [filterParams]);

  const handleDateChange = (name) => (date) => {
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams((prevState) => ({
      ...prevState,
      [name]: value === "All" ? "" : value,
    }));
  };

  const resetFilters = async () => {
    setFilterParams({
      status: "",
      startDate: null,
      endDate: null,
    });
  };

  const pathName = window.location.pathname;

  return (
    <div className="RecentPayments-container">
      <h1>Recent Leads</h1>
      {pathName === "/leads" && (
        <div className="main_Container">
          <DatePicker
            label="Start Date"
            value={filterParams.startDate}
            onChange={handleDateChange("startDate")}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={filterParams.endDate}
            onChange={handleDateChange("endDate")}
            renderInput={(params) => <TextField {...params} />}
          />

          <FormControl style={{ width: "150px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filterParams.status}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Seen">Seen</MenuItem>
              <MenuItem value="Unseen">Unseen</MenuItem>
              <MenuItem value="Replied">Replied</MenuItem>
              <MenuItem value="Not Replied">Not Replied</MenuItem>
            </Select>
          </FormControl>
          <div className="btn_main">
            <Button
              sx={{ height: "55px" }}
              onClick={getQueriesData}
              variant="contained"
            >
              Apply Filters
            </Button>
            <Button
              sx={{ height: "55px" }}
              variant="contained"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
          <div className="noofenquiries">
            <p>No. of Leads: {queries.length}</p>
          </div>
        </div>
      )}

      <div className="payments-top">
        <Link to="/queries">
          <div className="see-all-button">SEE ALL</div>
        </Link>
      </div>
      <div className="dashboard-table-parent">
        <div className="table payments-table">
          <div className="row">
            <div className="col">
              <h4>SNO</h4>
            </div>
            <div className="col">
              <h4>Date</h4>
            </div>
            <div className="col">
              <h4>Time</h4>
            </div>
            <div className="col">
              <h4>Name</h4>
            </div>
            <div className="col">
              <h4>Status</h4>
            </div>
            <div className="col">
              <h4>View Profile</h4>
            </div>
          </div>
          {queries.length === 0 ? (
            <p>No Queries Found</p>
          ) : (
            <div className="queries">
              {queries.map((query, i) => (
                <div className="row leads-table-entries" key={i}>
                  <div className="col">
                    <p>{i + 1}</p>
                  </div>
                  <div className="col">
                    <p>{query.date}</p>
                  </div>
                  <div className="col">
                    <p>{query.createdAt}</p>
                  </div>
                  <div className="col">
                    <p>{query.name}</p>
                  </div>
                  <div
                    className={`col ${
                      query.status === "Unseen"
                        ? "red"
                        : query.status === "Replied"
                        ? "green"
                        : query.status === "Pending"
                        ? "blue"
                        : query.status === "Not Replied"
                        ? "red"
                        : ""
                    }`}
                  >
                    <p>{query.status}</p>
                  </div>
                  <div className="link">
                    <Link to={`/allQueries/${query._id}`}>
                      <p>View</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentLeads;


