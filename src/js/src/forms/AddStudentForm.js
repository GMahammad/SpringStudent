import { Formik } from "formik";
import { Button, Input } from "antd";
import { addNewStudent } from "../client";

const AddStudentForm = (props) => {
  const modalInputMargin = { marginTop: "10px" };
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", gender: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.firstName) {
            errors.firstName = "First Name is required";
          }
          if (!values.lastName) {
            errors.lastName = "Last Name is required";
          }
          if (!values.gender) {
            errors.gender = "Gender is required";
          }else if(!['MALE','FEMALE','male','female'].includes(values.gender)){
            errors.gender = "Invalid Gender please enter (MALE, FEMALE, male, female)"
          }

          return errors;
        }}
        onSubmit={(student, { setSubmitting }) => {
            addNewStudent(student).then(() => {
                props.onSuccess()
            })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm,
          isValid
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              style={modalInputMargin}
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First Name"
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <Input
              style={modalInputMargin}
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last Name"
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && errors.lastName}
            <Input
              style={modalInputMargin}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <Input
              style={modalInputMargin}
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Gender"
              value={values.gender}
            />
            {errors.gender && touched.gender && errors.gender}

            <Button  onClick={submitForm} type="submit" disabled={isSubmitting || (touched && !isValid)}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default AddStudentForm;
