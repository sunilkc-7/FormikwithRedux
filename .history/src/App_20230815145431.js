import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
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

const CertificateList = () => {
  const { values, setFieldValue } = useFormikContext();

  const removeCertificate = (index) => {
    const updatedCertificates = [...values.certificate];
    updatedCertificates.splice(index, 1);
    setFieldValue("certificate", updatedCertificates);
  };

  return (
    <div>
      {values.certificate.map((cert, index) => (
        <div key={index}>
          <span>
            {cert.name} - {cert.year}
          </span>
          <button type="button" onClick={() => removeCertificate(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

function FormComponent() {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          dob: "",
          price: "",
          rate: "",
          personal_details: {
            fatherName: "",
            motherName: "",
          },
          certificate: [],
          currentCertificate: { name: "", year: "" },
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
        {({ values, setFieldValue }) => {
          const result = values.price * values.rate;

          const addCertificate = () => {
            const newCertificate = values.currentCertificate;
            if (newCertificate.name && newCertificate.year) {
              setFieldValue("certificate", [
                ...values.certificate,
                newCertificate,
              ]);
              setFieldValue("currentCertificate", { name: "", year: "" });
            }
          };

          return (
            <Form className="form-container">
              {/* ... [the rest of your fields here] ... */}
              <div className="form-field">
                <label htmlFor="certificate">Certificate Name:</label>
                <Field as="select" name="currentCertificate.name">
                  <option value="" label="Select certificate" />
                  <option value="SLC" label="SLC" />
                  <option value="NEB" label="NEB" />
                  <option value="Bachelor" label="Bachelor" />
                  <option value="Master" label="Master" />
                </Field>
                <ErrorMessage
                  name="currentCertificate.name"
                  component="div"
                  className="error-message"
                />

                <label htmlFor="currentCertificate.year">Passed Year:</label>
                <Field name="currentCertificate.year" type="date" />
                <ErrorMessage
                  name="currentCertificate.year"
                  component="div"
                  className="error-message"
                />

                <button type="button" onClick={addCertificate}>
                  Add
                </button>
              </div>

              <CertificateList />

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default FormComponent;
