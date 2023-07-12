import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({
    name,
    options,
    ...otherProps
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const { value } = evt.target;
        setFieldValue(name, value)
    } 

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField {...configSelect}>
            {Array.isArray(options) ? (
        options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      ) : (
        <MenuItem value="">No options available</MenuItem>
      )}

        {/* {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
             {Object.keys(options).map((item, pos) => {
                return (
                    <MenuItem key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}  */}
        </TextField>
    )
}
export default SelectWrapper;