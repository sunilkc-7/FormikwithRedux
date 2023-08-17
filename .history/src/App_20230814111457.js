import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormComponent.scss";

const validationSchema

function FormComponent() {
  return (
    <Formik
      initialValues={{ name: "name", email: "email" }}
      validationSchema={validationSchema}
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
