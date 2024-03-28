import React, {
  useState,
  useRef,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import AvatarEditor from "react-avatar-editor";
import "./style.scss";
import { ProfileContext } from "../../../context/ProfileContext";
import { IoCloudUploadOutline } from "react-icons/io5";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { dataURLtoFile } from "../../../utilities";
import { toast } from "react-toastify";
import config from '@/config';
const { backend_url } = config;

const AddCoverImage = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const fileRef = useRef(null);
  const { setCoverImageEditMode, fetchProfile } =
    useContext(ProfileContext);
  const { user } = useContext(UserContext);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => setImage(event.target.result);
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const onSave = async () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const file = dataURLtoFile(canvasScaled.toDataURL()); // Convert data URL to File object

      try {
        const formData = new FormData();
        formData.append('image', file); // Append the File object to FormData

        await axios.post(`${backend_url}/counsellor/cover-image`, formData, {
          headers: {
            Authorization: user.token,
            'Content-Type': 'multipart/form-data',
          },
        });
        fetchProfile()

        // Handle success, show message, or perform other actions upon successful upload
        setCoverImageEditMode(false)
        toast('Image updated successfully');
      } catch (error) {
        // Handle error, show error message, or perform error-related actions
        setCoverImageEditMode(false)
        toast('Error uploading image:', error);
      }
    }
  };

  const handleCancel = () => {
    setCoverImageEditMode(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => setImage(event.target.result);
      fileReader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="AddCoverImage-container">
      {!image && (
        <div className="drop-area-container">
          <div
            ref={ref}
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileRef.current.click()}
          >
            <IoCloudUploadOutline size="100" />
            Drag & Drop here
            <p>or</p>
            <div className="browse-button">Browse File</div>
          </div>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {image && (
        <>
          <div className="middle">
            <div className="avatar-editor-container">
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={800}
                height={400}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
              />
              <div className="bottom">
                <button onClick={onSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
            <input
              type="range"
              onChange={handleScaleChange}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
        </>
      )}
    </div>
  );
});

export default AddCoverImage;
