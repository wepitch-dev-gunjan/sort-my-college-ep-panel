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
const { backend_url } = config;
const RecentLeads = () => {
  const [queries, setQueries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown element
  const { xSmallScreen } = useContext(MediaQueryContext);
  const { user } = useContext(UserContext);
  const [selectDate, setSelectDate] = useState(null);
  const [filterParams ,setFilterParams] =useState({
   status : "",
   date : null,
  });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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
      const response = await axios.get(`${backend_url}/ep/enquiries`, {
        headers: {
          Authorization: user.token,
        },
      });
      let { data } = response;
      console.log(data);
      setQueries(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  useEffect(() => {
    getQueriesData();
  }, []);

  const handleDateChange = (date) => {
    setSelectDate(date);
  };
  const handleFilterChange = (e) => {
const {name , value} = e.target ;
if(name === "status") {
 const newValue = value === "All" ? "" : value;
 setFilterParams((prevState) => ({
  ...prevState,
  [name]: newValue
 })); 
} 
  };
  const resetFilters = async () => {
try{
 setFilterParams({
  status :"",
  date : null,
 });
 getQueriesData();
}
catch(error){
console.log(error);
}
  }
  const pathName = window.location.pathname;
  return (
    <div className="RecentPayments-container">
      <h1>Recent Leads</h1>
      {/* filters */}
      <>{pathName === "/leads" ? 
       <div className="main_Container">
       <DatePicker
            label="Select Date"
            value={selectDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{ marginLeft: "16px" }}
          />
        <FormControl style={{ width: "150px" }}>
          <InputLabel>Status</InputLabel>
          <Select 
          name="status" 
          value = {filterParams.status}
          label="Status" 
          onChange={handleFilterChange}
          defaultValue="All">
            <MenuItem value="All">ALL</MenuItem>
            <MenuItem value="UNSEEN">UNSEEN</MenuItem>
            <MenuItem value="REPLIED">REPLIED</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
          </Select>
        </FormControl>
        <div className="btn_main">
          <Button sx={{ height: "55px" }} variant="contained">
            Apply Filters
          </Button>
          <Button sx={{ height: "55px" }} variant="contained"
          onClick = {resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
      : null}</>

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
              <h4>SNO</h4>
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
          {queries.length === 0 ? (
            <p> No Queries Found</p>
          ) : (
            <div className="queries">
              {queries.map((query, i) => (
                <div className="row" key={i}>
                  <div className="col">
                    {" "}
                    <p>{i + 1}</p>
                  </div>
                  <div className="col">
                    <p>{query.date}</p>
                  </div>
                  <div className="col">
                    <p>{query.name}</p>
                  </div>
                  <div className="col">
                    <p>{query.phone_number}</p>
                  </div>
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
                    <Link to={`/allQueries/${query._id}`}>
                      <p>View </p>
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
