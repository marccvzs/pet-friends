import { formOptions } from "@tanstack/react-form-nextjs";

export const formOpts = {
  name: "",
  age: 0,
  type: "",
  breed: [{ label: "", value: "" }],
  fosterable: false,
};

export const inquiryFormOpts = formOptions({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
});
