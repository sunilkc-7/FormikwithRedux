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
          dob: "",
          price: "",
          rate: "",
          personal_details: {
            fatherName: "",
            motherName: "",
          },
          certificate: [
            {
              name: "SLC",
              year: "2016",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const stringifiedvalue = JSON.stringify(values);
            localStorage.setItem("form-data", stringifiedvalue);
            alert("Form data success");
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values }) => {
          console.log(values, "VALUE");
          const result = values.price * values.rate;
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
                  <label htmlFor="price">Currency:</label>
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
              <div className="form-field">
                <label htmlFor="personal_details.fatherName">
                  Father's Name:
                </label>
                <Field name="personal_details.fatherName" type="text" />
                <ErrorMessage
                  name="personal_details.fatherName"
                  component="div"
                  className="error-message"
                />
                <label htmlFor="personal_details.motherName">
                  Mother's Name:
                </label>
                <Field name="personal_details.motherName" type="text" />
                <ErrorMessage
                  name="personal_details.motherName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-field">
                <label htmlFor="certificate">Certificate Name: </label>
                <div>
                  <Field as="select" name="certificate[0].name" type="text" />
                </div>

                <ErrorMessage
                  name="certificate[0].name"
                  component="div"
                  className="error-message"
                />
                <label htmlFor="certificate">Passed Year:</label>
                <Field name="certificate[0].year" type="date" />
                <ErrorMessage
                  name="certificate[0].year"
                  component="div"
                  className="error-message"
                />
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
