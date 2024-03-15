import React, { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import "./style.scss";
import { backend_url } from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext";
import Spinner from "../../spinner/Index";
import { ProfileContext } from "../../../context/ProfileContext";

const DocumentItem = ({
  document,
  setDocuments,
  documentTypes,
  getDocumentTypes,
  getDocuments,
  documentType,
  file,
  editProfileEnable,
  getIdByName,
  getDocumentTypeFromId
}) => {
  const hiddenFileInput = useRef(null);
  const { user } = useContext(UserContext);
  const [currentField, setCurrentField] = useState(documentTypes[0]?.name);
  const [loading,setLoading]=useState(true)
  const{documentDelete , setDocumentDelete}=useContext(ProfileContext)

  const handleSelect = (e) => {
    setCurrentField(e.target.value);
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      setLoading(false)
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${backend_url}/counsellor/document/upload-document`,
        formData,
        {
          headers: {
            Authorization: user.token // Assuming user.token contains the authorization token
          },
          params: {
            document_type: getIdByName(currentField) // Assuming currentField is defined elsewhere in your code
          }
        }
      );
      

      // Update state or do something with the response data if needed
      setDocuments(prev => [...prev.slice(0, prev.length - 1), data])
      // setDocumentTypes(prev => prev.filter(documentType => documentType.name != currentField))
      getDocumentTypes()
      toast.success("Document uploaded successfully"); // Assuming toast is defined and comes from a library like react-toastify
      setLoading(true)


    
    } catch (error) {
      // Improve error handling
      console.error("Error uploading document:", error.response ? error.response.data : error.message);
      toast.error("Error uploading document. Please try again later.");
    }
  };

  const handleDeleteDocument =  () => {
    setDocumentDelete(!documentDelete)
  //   try {
  //     const { data } = await axios.delete(`${backend_url}/counsellor/document/${document._id}`,
  //       null,
  //       {
  //         headers: {
  //           Authorization: user.token
  //         }
  //       })
  //     await getDocuments()
  //     await getDocumentTypes()
  //   } catch (error) {
  //     console.log(error)
  //   }
  }

  return (
    <div className="DocumentItem">
      {/* changed by r  */}
      <div className="row DocumentItemRow">
        <div className="col DocumentItemCol">
          <div className="dropdown">
            {editProfileEnable && !documentType ? (
              <select
                onChange={handleSelect}
                value={currentField}
              >
                {documentTypes.map(dType => (
                  <option value={dType.name} key={dType._id} >{dType.name}</option>
                ))}
              </select>
            ) : (
              <>
                <p>{getDocumentTypeFromId(documentType)}</p>
              </>
            )}

          </div>

          {editProfileEnable ? (
            <>
              <button className="button-upload" onClick={handleClick}>
                {loading ?
                "Upload a file" : <Spinner/>
                }
              </button>
              <input
                className="upload-btn"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
              <div className="delete-button" onClick={handleDeleteDocument}>
                <MdDeleteForever size="20" />
              </div>
            </>
          ) : (
            <div >
              <a href={file} target="_blank" >link</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
