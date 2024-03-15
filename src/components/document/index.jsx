import React, { useContext, useEffect, useState } from "react";
import DocumentItem from "./documentItem";
import "./style.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../../config";
import { UserContext } from "../../context/UserContext";

const Documents = ({
  editProfileEnable,
}) => {
  const { user } = useContext(UserContext)
  const [documents, setDocuments] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [filteredDocumentTypes, setFilteredDocumentTypes] = useState([]);
  const [addDocumentEnable, setAddDocumentEnable] = useState(false);

  // fetch documents and store it to the documents state
  const getDocuments = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/counsellor/document/get-documents`, {
        headers: {
          Authorization: user.token
        }
      });
      setDocuments(data)
    } catch (error) {
      console.log(error);
      toast("Error getting documents")
    }
  }
  // fetch documentTypes and store it to documentTypes state
  const getDocumentTypes = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/counsellor/documentType/documentTypes`);
      setDocumentTypes(data)
    } catch (error) {
      console.log(error);
      toast("Error getting documents")
    }
  }

  const getFilteredDocumentTypes = (dTypes) => {
    const filteredTypesFromDocuments = documents.map(document => document.document_type)
    return dTypes.filter(documentType => !filteredTypesFromDocuments.includes(documentType._id))
  }

  const handleAddDocument = () => {
    setAddDocumentEnable(false)
    setDocuments([...documents, {
      user: user._id,
      _id: user._id,
      document_type: ""
    }])
  }

  useEffect(() => {
    const promises = async () => {
      await getDocuments()
      await getDocumentTypes()
    }
    promises()
  }, [user])

  function getIdByName(name) {
    for (let i = 0; i < documentTypes.length; i++) {
      if (documentTypes[i].name === name) {
        return documentTypes[i]._id;
      }
    }
    // Return null if no match found
    return null;
  }

  const getDocumentTypeFromId = (id) => {
    const documentTypeName = documentTypes.filter(documentType => {
      return documentType._id === id;
    });
    return documentTypeName[0]?.name;
  }
  useEffect(() => {
    setFilteredDocumentTypes(getFilteredDocumentTypes(documentTypes))
    if (documents.length < documentTypes.length)
      setAddDocumentEnable(true);
    else
      setAddDocumentEnable(false);
    console.log("documents length : " + documents.length,
      "documentTypes length : " + documentTypes.length
    )
  }, [documentTypes])
  return (
    <div className="Documents-container">
      <div className="heading">
        <h2>Documents</h2>
      </div>

      {documents.map(document => (
        <DocumentItem
          document={document}
          setDocuments={setDocuments}
          key={document._id}
          documentTypes={filteredDocumentTypes}
          getDocuments={getDocuments}
          getDocumentTypes={getDocumentTypes}
          documentType={document.document_type}
          file={document.file}
          editProfileEnable={editProfileEnable}
          getIdByName={getIdByName}
          getDocumentTypeFromId={getDocumentTypeFromId}
        />
      ))}

      {editProfileEnable && addDocumentEnable && (
        <div className="add-document"
          onClick={handleAddDocument}
        >
          <span>Add document</span>
        </div>
      )}
    </div>
  );
};

export default Documents;