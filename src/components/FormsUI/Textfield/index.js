import React from "react";
import { TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const TextFieldWrapper = ({
  name,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <TextField {...configTextField} />
  );
};

export default TextFieldWrapper;