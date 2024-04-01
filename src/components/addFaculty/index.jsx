import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "../ImageUploder";
import "./style.scss";
import axios from "axios";

const AddFaculty = ({ setAddfaculty }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setAddfaculty((prev) => !prev);
    axios
      .post("your-backend-url", values)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        resetForm();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="addfaculty-container">
      <Formik
        initialValues={{
          name: "",
          experience: "",
          qualifications: "",
          graduatedFrom: "",
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          experience: Yup.string().required("Experience is required"),
          qualifications: Yup.string().required("Qualifications are required"),
          graduatedFrom: Yup.string().required("Graduated From is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="faculty_section">
              <div className="main-container">
                <div className="img_uploder">
                  <ImageUploader
                    onImageUpload={(file) => setFieldValue("image", file)}
                  />
                </div>
                <div className="faculty-data">
                  <div className="right-Section">
                    <div className="faculty_details">
                      <label htmlFor="name">Name:</label>
                    </div>
                    <div className="faculty_input">
                      <Field
                        type="text"
                        className="input"
                        id="name"
                        name="name"
                      />
                      <br />

                      <ErrorMessage
                        name="name"
                        component="span"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="right-Section">
                    <div className="faculty_details">
                      <label htmlFor="experience">Experience in years:</label>
                    </div>
                    <div className="faculty_input">
                      <Field
                        type="text"
                        id="experience"
                        className="input"
                        name="experience"
                      />
                      <br />

                      <ErrorMessage
                        name="experience"
                        component="span"
                        className="error"
                      />
                    </div>
                  </div>
                  <div className="right-Section">
                    <div className="faculty_details">
                      <label htmlFor="qualifications">Qualifications</label>
                    </div>
                    <div className="faculty_input">
                      <Field
                        type="text"
                        className="input"
                        id="qualifications"
                        name="qualifications"
                      />
                      <br />
                      <ErrorMessage
                        name="qualifications"
                        component="span"
                        className="error"
                      />
                    </div>
                  </div>

                  <div className="right-Section">
                    <div className="faculty_details">
                      <label htmlFor="graduatedFrom">Graduated From:</label>
                    </div>
                    <div className="faculty_input">
                      <Field
                        className="input"
                        type="text"
                        id="graduatedFrom"
                        name="graduatedFrom"
                      />
                      <br />
                      <ErrorMessage
                        name="graduatedFrom"
                        component="span"
                        className="error"
                      />
                    </div>
                  </div>
                  <button
                    className="button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddFaculty;
