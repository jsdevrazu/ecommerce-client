import { Formik, Form } from "formik";
import { FC } from "react";
import { FormProps } from "../../Types";

const AppForm: FC<FormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <Form>{children}</Form>}
    </Formik>
  );
};

export default AppForm;
