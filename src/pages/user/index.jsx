import React, { useContext, useState } from "react";
import "./style.scss";
import { FollowerContext } from "../../context/FollowerContext";

const Users = () => {
  const { followers } = useContext(FollowerContext);
  return (
    <div className="users-container">
      <div className="heading sticky">
        <h1>My Followers</h1>
        {/* <div className="row">
          <div className="col">
            <h4>IMAGE</h4>
          </div>
          <div className="col">
            <h4>NAME</h4>
          </div>
          <div className="col">
            <h4>EMAIL</h4>
          </div>
          <div className="col">
            <h4>FOLLOW DATE</h4>
          </div>
        </div> */}
      </div>
      <div className="AllUsers-container">
        <div className="table">
         {/* edited */}
<div className="All-row">
<div className="row">
          <div className="col">
            <h4>IMAGE</h4>
          </div>
          <div className="col">
            <h4>NAME</h4>
          </div>
          <div className="col">
            <h4>EMAIL</h4>
          </div>
          <div className="col">
            <h4>FOLLOW DATE</h4>
          </div>
        </div>
</div>
          {followers.map((follower, i) => (
            <div className="row" key={i}>
              <div className="col">
                <img src={follower.follower_profile_pic} alt="follower avatar" />
              </div>

              <div className="col">{follower.follower_name}</div>
              <div className="col">{follower.follower_email}</div>
              <div className="col">{follower.updatedAt}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Users;
