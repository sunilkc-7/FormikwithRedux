import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import "./FormComponent.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid emailaddress")
    .required("Email is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  price: Yup.number().required("Price is required"),
  rate: Yup.number().required("Rate is required"),
});

const MyInputField = ({ name }) => {
  const [field] = useField(name);
  return <input {...field} />;
};

function FormComponent() {
  return (
    <Formik
      initialValues={{
        name: "name",
        email: "email",
        dob: "null",
        price: "",
        rate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, setSubmitting) => {
        setTimeout(() => {
          alert(JSON.stringify(values));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ values }) => {
        useEffect(() => {
          setResult(values.price * values.rate);
        }, [values.price, values.rate]);

        <Form className="form-container">
          <button type="submit">Submit</button>
        </Form>;
      }}
    </Formik>
  );
}
export default FormComponent;
