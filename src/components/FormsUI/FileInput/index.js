import React from 'react';
import { useField } from 'formik';
import { Button, Typography } from '@material-ui/core';

const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    props.onChange(props.name, file);
  };

  return (
    <div>
      <Typography>{label}</Typography>
      <input type="file" onChange={handleChange} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Typography color="error">{meta.error}</Typography>
      ) : null}
    </div>
  );
};

export default FileInput;
