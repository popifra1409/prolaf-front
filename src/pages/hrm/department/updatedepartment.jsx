import "../../new/new.scss";
import "../../../style/dark.scss";
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, {useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, IconButton, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik, FieldArray, useFormikContext } from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import TextField from "../../../components/FormsUI/Textfield";
import Select from "../../../components/FormsUI/Select";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles(theme => (
    {
        errorColor: {
            color: theme.palette.error.main
        },
        strech: {
            flexGrow: 1
        },
        text: {
            color: theme.palette.info.main
        }
    }
));

const UpdateDepartment = ({ title }) => { 
    const classes = useStyles();  
    const { departmentid } = useParams(); 
    const [departmentData, setDepartmentData] = useState("");
    const [departments, setDepartment] = useState("");
    const [loading, setLoading] = useState(true);

    let Navigate = useNavigate();

     useEffect(() => {
        const fetchDepartmentData = async () => {
            try {    
                const response = await DepartmentAPI.getDepartmentById(departmentid);
                const department = response.data;
                setDepartmentData(department);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchDepartmentData();
    }, [departmentid]);

    useEffect(() => {
        setLoading(true);
        DepartmentAPI.getDepartments()
          .then((res) => {
             const departments = res.data.map((department) => (
                {value: department.departmentId,
                 label: department.dept_name}
            )); 
            setDepartment(departments);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, []);
    
      const handleSubmit = async (values, parentid) => {
        parentid = values.dept_parent
        await DepartmentAPI.updateDepartment(values, parentid).then((response)=> {
            console.log("Data" + response.data);
            Navigate("/hrm/departments/");
        })
    };  
    
const INITIAL_FORM_STATE = {
    dept_parent: "",
    dept_name: "",
    dept_description: "",
    dept_number: ""
};


const FORM_VALIDATION = Yup.object().shape({
    dept_parent: Yup.string().required("Select the department parent"),
    dept_name: Yup.string().required("Enter the department name").min(3, 'It should contain al least 3 letters'),
    dept_description: Yup.string().required("Enter the department description"),
    dept_number: Yup.number().integer().typeError('Invalid Phone number').required('Enter the phone number').min(9, 'Should contain 9 figures'),
        
});

return (
    <div className="new">
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h1>{title}</h1>
            </div>
            <div className="bottom">
                <Card>
                    <CardContent>
                        <Formik
                            enableReinitialize
                            initialValues={{ ...INITIAL_FORM_STATE, ...departmentData }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={handleSubmit}
                        >
                            {({ values, handleSubmit, isSubmitting }) => (
                                <Form autoComplete="off" onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="overline" className={classes.text}>
                                                Department's Information
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} className={classes.strech}>
                                            
                                            <Select 
                                                name="dept_parent" 
                                                label="Department Parent"
                                                options = {departments} 
                                                /> 
                                        </Grid>
                                        <Grid item xs={6} className={classes.strech}>
                                            <TextField
                                                name="dept_name"
                                                value={values.dept_name || ''}
                                                label="Department Name"
                                            />
                                        </Grid>
                                        <Grid item xs={6} className={classes.strech}>
                                            <TextField
                                                name="dept_description"
                                                value={values.dept_description  || ''}
                                                label="Description"
                                            />
                                        </Grid>    
                                        <Grid item xs={6}>
                                            <TextField 
                                                name="dept_number" 
                                                value={values.dept_number  || ''}
                                                label="Contact (Phone N°)" />
                                        </Grid>
                                        
                                        <Grid item>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : undefined}
                                            >
                                                {isSubmitting ? 'Saving' : 'Save'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
);
};

export default UpdateDepartment