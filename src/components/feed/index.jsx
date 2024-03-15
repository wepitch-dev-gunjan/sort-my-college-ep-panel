import { useState } from "react";
import "./style.scss";
import Comment from "./Comment";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { Tooltip } from "@mui/material";

const Feed = ({ id, feed_link, feed_likes, feed_visibility, feed_caption }) => {
  const [comments, setComments] = useState([
    {
      _id: "jgjgjgjgjg",
      comment_text: "hello doston",
      comment_vidsibility: true,
      comment_owner: "Nn",
      comment_owner_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
    },
    {
      _id: "jgjgjgjgjg",
      comment_text: "hello dosto",
      comment_vidsibility: true,
      comment_owner: "Nn",
      comment_owner_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
    },
  ]);
  return (
    <div className="Feed-container">
      <img src={feed_link} alt="" />
      <div className="middle-icons">
      <Tooltip title="Likes" placement="bottom">
        <div className="like">
          <FaRegHeart size="20" />
        </div>
        </Tooltip>
        <Tooltip title="Comment" placement="bottom">
        <div className="comment">
          <FaRegComment size="20" />
        </div>
        </Tooltip>
        <Tooltip title="Share" placement="bottom">
        <div className="share">
          <BsSend size="20" />
        </div>
        </Tooltip>
      </div>
      <div className="comments">
        {comments.map((comment, i) => (
          <Comment
            key={i}
            id={comment._id}
            text={comment.comment_text}
            visibility={comment.comment_visibility}
            owner_name={comment.comment_owner}
            owner_img={comment.comment_owner_img}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
