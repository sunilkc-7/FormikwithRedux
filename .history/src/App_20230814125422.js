import React from "react";
import { Formik, Field, Form, ErrorMessage, useField, useFormik } from "formik";
import * as Yup from "yup";
import "./FormComponent.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid emailaddress")
    .required("Email is required"),
});

const MyInputField = ({ name }) => {
  const [field] = useField(name);
  return <input {...field} />;
};

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
      <Form className="form-container">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error-message" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <MyInputField name="email" />

          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />
        </div>
        name
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
export default FormComponent;
