import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormComponent() {
  return (
    <div>
      <h1>Form Validation using Formik and Yup</h1>
      <form className="form-container">
        <div className="form-field"></div>
      </form>
    </div>
  );
}
export default FormComponent;
