import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import config from "@/config";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ProfileContext } from "../../context/ProfileContext";
const { backend_url } = config;
const QueryDetail = () => {
  const id = useParams();
  const enquiry_id = id.enquiry_id;
  console.log(id);
  const [enquiry, setEnquiry] = useState("");
  const { user } = useContext(UserContext);
  const { queryPopup, setQueryPopup } = useContext(ProfileContext);
  // const [rerender, setRerender] = useState(false);
  const getQueriesData = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/ep/singleEnqury/${enquiry_id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      setEnquiry(data);
    } catch (error) {
      console.log("enqury error");
      console.log(error);
    }
  };
  const changeStatus = async () => {
    try {
      const { data } = await axios.put(
        `${backend_url}/ep/singleEnqury/${enquiry_id}`,
        {},
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log(data);
      setEnquiry(data);
      setQueryPopup((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQueriesData();
  }, []);

  return (
    <div className="main_container">
      <div className="main_query">
        {enquiry ? (
          <div className="query-container">
            <div className="data">
              <div className="fields">Name : </div>
              <div>{enquiry.enquirer.name}</div>
            </div>
            <div className="data">
              <div className="fields">Phone Number : </div>
              <div>+{enquiry.enquirer.phone_number}</div>
            </div>
            <div className="data">
              <div className="fields">Course Type : </div>
              <div>{enquiry.course.type}</div>
            </div>
            <div className="data">
              <div className="fields">Course Name : </div>
              <div>{enquiry.course.name}</div>
            </div>
            <div className="data">
              <div className="fields">Date : </div>
              <div>{enquiry.date}</div>
            </div>
            <div className="data">
              <div className="fields">Status : </div>
              <div>{enquiry.status}</div>
            </div>
            {/* <div className="data">
              <div className="fields">Message11 : </div>
              <div>{enquiry.message}</div>
            </div> */}
            <>
              <div className="btn1">
                <button
                  // disabled={enquiry.status === "Replied"}
                  onClick={changeStatus}
                >
                  Replied
                </button>
              </div>
            </>
          </div>
        ) : (
          // spinner
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default QueryDetail;
