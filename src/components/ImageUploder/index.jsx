import React, { useState } from "react";
import { Uploader, Message, Loader, useToaster } from "rsuite";
// import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import { MdOutlineCloudUpload } from "react-icons/md";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const ImageUploader = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleUpload = (file) => {
    setUploading(true);
    previewFile(file.blobFile, (value) => {
      setFileInfo(value);
    });
  };

  const handleSuccess = (response, file) => {
    setUploading(false);
    toaster.push(<Message type="success">Uploaded successfully</Message>);
    console.log(response);
  };

  const handleError = () => {
    setFileInfo(null);
    setUploading(false);
    toaster.push(<Message type="error">Upload failed</Message>);
  };

  return (
    <Uploader
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={handleUpload}
      onSuccess={handleSuccess}
      onError={handleError}
    >
      <button style={{ width: 250, height: 250 }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} alt="Uploaded" width="100%" height="100%" />
        ) : (
          <MdOutlineCloudUpload style={{ fontSize: 200 }} />
        )}
      </button>
    </Uploader>
  );
};

export default ImageUploader;
