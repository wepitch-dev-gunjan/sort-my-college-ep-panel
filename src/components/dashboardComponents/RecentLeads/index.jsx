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
const RecentLeads = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown element
  const { xSmallScreen } = useContext( MediaQueryContext );
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
   setIsDropdownOpen(prevState => !prevState);
 };
  const [queries, setQueries] = useState([
    {
      id: "12354",
      name: "Ravi Kumar",
      phone: "918279392039",
      query: "Regarding course enrollment",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "98765",
      name: "Priya Patel",
      phone: "918279392039",
      query: "Information about tuition fees",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "45678",
      name: "Neha Sharma",
      phone: "918279392039",
      query: "Clarification on class schedule",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "24680",
      name: "Rahul Singh",
      phone: "918279392039",
      query: "Request for study materials",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "13579",
      name: "Anjali Gupta",
      phone: "918279392039",
      query: "Concerns about grading policy",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "11223",
      name: "Amit Mishra",
      phone: "918279392039",
      query: "Application status",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "998877",
      name: "Neha Dubey",
      phone: "918279392039",
      query: "Inquiry about scholarship opportunities",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "332211",
      name: "Sandeep Joshi",
      phone: "918279392039",
      query: "Regarding course content",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "98745",
      name: "Divya Verma",
      phone: "918279392039",
      query: "Request for exam schedule",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "951753",
      name: "Sanjay Gupta",
      phone: "918279392039",
      query: "Information about admission process",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "147258",
      name: "Kriti Singh",
      phone: "918279392039",
      query: "Regarding hostel facilities",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "963852",
      name: "Vishal Sharma",
      phone: "918279392039",
      query: "Inquiry about course duration",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "789456",
      name: "Pooja Patel",
      phone: "918279392039",
      query: "Request for faculty information",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "951357",
      name: "Ankit Verma",
      phone: "918279392039",
      query: "Concerns about examination pattern",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "753951",
      name: "Manisha Singh",
      phone: "918279392039",
      query: "Regarding placement opportunities",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "852963",
      name: "Ajay Sharma",
      phone: "918279392039",
      query: "Request for course syllabus",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "369258",
      name: "Sunita Gupta",
      phone: "918279392039",
      query: "Inquiry about scholarship eligibility",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "147852",
      name: "Rahul Patel",
      phone: "918279392039",
      query: "Concerns about fee structure",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "258963",
      name: "Shreya Singh",
      phone: "918279392039",
      query: "Regarding transportation facilities",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "456123",
      name: "Aakash Kumar",
      phone: "918279392039",
      query: "Request for course accreditation details",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "789123",
      name: "Sonali Verma",
      phone: "918279392039",
      query: "Concerns about course timetable",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "951753",
      name: "Suresh Gupta",
      phone: "918279392039",
      query: "Regarding extra-curricular activities",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "357951",
      name: "Arjun Sharma",
      phone: "918279392039",
      query: "Request for course project details",
      status: "Replied",
      date: "2024-03-05",
    },
    {
      id: "753159",
      name: "Madhu Singh",
      phone: "918279392039",
      query: "Concerns about laboratory facilities",
      status: "Pending",
      date: "2024-03-05",
    },
    {
      id: "258369",
      name: "Arun Gupta",
      phone: "918279392039",
      query: "Regarding course fee payment options",
      status: "Replied",
      date: "2024-03-05",
    },
  ]);

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
              sx={{ height: "50px" , width : "400px"}}
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
                <p>{query.id}</p>
              </div>
              <div className="col">
                <p>{query.date}</p>
              </div>
              <div className="col">
                <p>{query.name}</p>
              </div>
              <div className="col">
                <p>{query.phone}</p>
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
