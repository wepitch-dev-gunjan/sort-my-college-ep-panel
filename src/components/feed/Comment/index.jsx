import "./style.scss";
import { RiDeleteBinLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { CiEdit } from "react-icons/ci";

const Comment = ({ id, owner_name, owner_img, text, visibility }) => {
  return (
    <div className="Comment-container">
      <div className="owner">
        <img src={owner_img} alt="" />
      </div>
      <div className="content">
        <div className="top">
          <span>{owner_name}</span>
          <div className="icons">
            <Tooltip title="Edit" placement="bottom">
              <div className="edit-icon">
                <CiEdit size="16" />
              </div>
            </Tooltip>
            <Tooltip title="Delete" placement="bottom">
              <div className="delete-icon">
                <RiDeleteBinLine size="16" />
              </div>
            </Tooltip>
          </div>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comment;
