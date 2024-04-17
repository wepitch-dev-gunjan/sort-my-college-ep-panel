import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import "./style.scss"
const RecentLeadsFilters = () => {
  return (
    <div className="main_Container">
      <TextField
        label="Search"
        type="text"
        name="search"
        sx={{ height: "50px", width: "300px" }}
        placeholder="Search by all fields"
      />
      <FormControl style={{ width: "150px" }}>
        <InputLabel>Status</InputLabel>
        <Select name="status" label="Status" defaultValue="All">
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
        <Button sx={{ height: "55px" }} variant="contained">
          Reset Filters
        </Button>
      </div>
    </div>
    // <div className="filters" ref={dropdownRef}>
// {xSmallScreen ? (
//   <>
//     <div className="dropdown-header" onClick={toggleDropdown}>
//       {/* Hamburger icon */}
//       <span>Filters</span>
//       <MdMenu />
//     </div>
//     {isDropdownOpen && (
//       <div className="dropdown-content">
//         {/* Search field */}
//         <TextField
//           label="Search"
//           type="text"
//           name="search"
//           placeholder="Search by all fields"
//         />
//         {/* Status dropdown */}
//         <FormControl style={{ width: "150px" }}>
//           <InputLabel>Status</InputLabel>
//           <Select name="status" label="Status" defaultValue="All">
//             <MenuItem value="All">ALL</MenuItem>
//             <MenuItem value="REPLIED">REPLIED</MenuItem>
//             <MenuItem value="PENDING">PENDING</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//     )}
//   </>
// ) : (
//   <>
//    <RecentLeadsFilters />
//   </>
// )}
// </div>
  );
};

export default RecentLeadsFilters;
