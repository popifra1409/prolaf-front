import React, {useState,useEffect} from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DepartmentAPI from "../../services/departmentAPI";

export default function SelectDept(props) {
    
  const [departments, setDepartments] = useState([]);
  const api = new DepartmentAPI();
  const [loading, setLoading] = useState(true);
        useEffect(() => {
        setLoading(true);
        api.getDepartments().then((res) => {
          setDepartments(res.data.data);
          setLoading(false);
        });
      }, []);
    

    const handleChange = (event) =>{
        setDepartments(event.target.value);
    }


    const { name, label, value,error=null, onChange } = props;

    return (
            <FormControl 
              fullWidth
              variant="outlined"
              {...(error && { error: true })}
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    id='Department'
                    label="Department"
                    name={name}
                    value={value}
                    onChange={handleChange}>
                    {
                    departments.map(department => (
                <MenuItem value={department.dept_name} key={department.dept_name}>{department.dept_name}</MenuItem>
                )) }
                </Select>
                {error && <InputLabel>{error}</InputLabel>}
            </FormControl>
    )
}



