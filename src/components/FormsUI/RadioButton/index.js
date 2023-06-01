import React from "react";
import {
    FormControl, FormControlLabel, Radio, RadioGroup, FormLabel
} from "@material-ui/core";
import { useFormik } from 'formik';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const RadioWrapper = ({
    label,
    name,
    options,
    onChange,
    value,
    ...otherProps
}) => {
    const formik = useFormik({
        initialValues: {
            [name]: value,
        },
        onChange: (event) => {
            formik.setFieldValue(name, event.target.value);
            if (onChange) {
                onChange(event.target.value);
            }
        },
        ...otherProps,
    });

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup name={name} value={formik.values[name]}>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={
                            <Radio
                                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};
export default RadioWrapper;