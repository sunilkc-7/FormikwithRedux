import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormComponent.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid emailaddress")
    .required("Email is required"),
});

function FormComponent() {
  return (
    <Formik
      initialValues={{ name: "name", email: "email" }}
      validationSchema={validationSchema}
      onSubmit={(values, setSubmitting) => {
        setTimeout(() => {
          alert(JSON.stringify(values));
          setSubmitting(false);
        }, 500);
      }}
    >
      <form className="form-container">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
        </div>
      </form>
    </Formik>
  );
}
export default FormComponent;
