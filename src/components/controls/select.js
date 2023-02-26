import React, {useState,useEffect} from 'react'
import { FormControl, InputLabel, Select  } from '@mui/material';
import DepartmentAPI from "../../services/departmentAPI";

export default function SelectDept(props) {
    
    const [departments, setDepartments] = useState([]);
  const api = new DepartmentAPI();
  const [loading, setLoading] = useState(true);


        useEffect(() => {
        setLoading(true);
        api.getDepartments().then((res) => {
          setDepartments(res.data);
          setLoading(false);
        });
      }, []);
    

    const handleChange = (event) =>{
        setDepartments(event.target.value);
    }


    const { name, label, value,error=null, onChange, options } = props;

    return (

        <FormControl variant="outlined"
            {...(error && { error: true })}>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    name={name}
                    value={value}
                    onChange={handleChange}>
                    <InputLabel value="">None</InputLabel>
                    {departments.map( departments => (
                <option value={departments.dept_name} key={departments.departmentId}>{departments.dept_name}</option>
                ))}
                </Select>
                {error && <InputLabel>{error}</InputLabel>}
            </FormControl>
    )
}


