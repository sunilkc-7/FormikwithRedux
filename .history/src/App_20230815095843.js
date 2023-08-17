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
    <div>
      <Formik
        initialValues={{
          name: "name",
          email: "email",
          dob: "null",
          price: "",
          rate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(valuess, setSubmitting) => {
          setTimeout(() => {
            alert(JSON.stringify(valuess));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ valuess }) => {
          const result = valuess.price * valuess.rate;
          return (
            <Form className="form-container">
              <div className="form-field">
                <label htmlFor="name">Name:</label>
                <Field name="name" type="text" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
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
              <div className="form-field">
                <label htmlFor="dob">Date of Birth:</label>
                <Field name="dob" type="date" />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="error-message"
                />
              </div>
              <div
                className="form-field"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ width: "48%" }}>
                  <label htmlFor="price">Price:</label>
                  <Field name="price" type="number" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label htmlFor="rate">Rate:</label>
                  <Field name="rate" type="number" />
                  <ErrorMessage
                    name="rate"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="result">Result:</label>
                <input name="result" type="text" value={result} readOnly />
              </div>

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default FormComponent;
