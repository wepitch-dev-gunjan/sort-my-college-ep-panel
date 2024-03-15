import React, { useState } from 'react';
import { Rating } from '@mui/material';
import './style.scss';

const Feedback = ({ id, user_name, user_pic, rating, comment }) => {
  return (
    <div className='Feedback-container'>
      <div key={id}>
        <div className="top">
          <div className="left">
            <img src={user_pic} alt="" />
          </div>
          <div className="right">
            <h3>{user_name}</h3>
            <div className="rating">
              <Rating name='read only' value={rating} readOnly />
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
