import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "../ImageUploder";
import "./style.scss";
import axios from "axios";
import config from "@/config";
const { backend_url } = config;

const AddFaculty = ({ setAddfaculty }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    await axios
      .post(`${backend_url}/ep/addfaculties`, values)
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
    setAddfaculty((prev) => !prev);
  };

  return (
    <div className="addfaculty-container">
      <Formik
        initialValues={{
          name: "",
          experience_in_years: "",
          qualifications: "",
          graduated_from: "",
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          experience_in_years: Yup.string().required("Experience is required"),
          qualifications: Yup.string().required("Qualifications are required"),
          graduated_from: Yup.string().required("Graduated From is required"),
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
                        id="experience_in_years"
                        className="input"
                        name="experience_in_years"
                      />
                      <br />

                      <ErrorMessage
                        name="experience_in_years"
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
                        id="graduated_from"
                        name="graduated_from"
                      />
                      <br />
                      <ErrorMessage
                        name="graduated_from"
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
