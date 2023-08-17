import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormComponent.scss";

function FormComponent() {
  return (
    <
    <form className="form-container">
      <div className="form-field">
        <label htmlFor="name">Name:</label>
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
      </div>
    </form>
  );
}
export default FormComponent;
