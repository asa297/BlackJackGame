import * as Yup from "yup";
export const InformationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  birthDay: Yup.date().required("Required"),
  nationality: Yup.string().required("Required"),
  gender: Yup.object().required("Required"),
  phoneNumber: Yup.number()
    .typeError("Invalid number")
    .required("Required"),
  passport: Yup.string()
    .min(9, "Too Short")
    .max(9, "Too Long!"),
  salary: Yup.number()
    .typeError("Invalid number")
    .required("Required")
});

export const CihzenValidation = value => {
  let errorMessage;
  if (!/^\d+$/.test(value)) {
    errorMessage = "Invalid number";
  } else if (value.length < 13) {
    errorMessage = "Too short";
  }

  return errorMessage;
};
