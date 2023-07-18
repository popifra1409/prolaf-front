import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import TextField from "../../../components/FormsUI/Textfield";
import Select from "../../../components/FormsUI/Select";
//import { Select } from "@material-ui/core"; 
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";

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

const NewDepartment = ({ title }) => {

    const [departments, setDepartment] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        dept_parent: "",
        dept_name: "",
        dept_description: "",
        dept_number: ""
    };


    const FORM_VALIDATION = Yup.object().shape({
        dept_name: Yup.string().required("Enter the department name").min(3, 'It should contain al least 3 letters'),
        dept_description: Yup.string().required("Enter the department description"),
        dept_number: Yup.number().integer().typeError('Invalid Phone number').required('Enter the phone number').min(9, 'Should contain 9 figures'),
        
    })
    const handleSubmit = async (values, parentid) => {
        parentid = values.dept_parent
        await DepartmentAPI.addDepartment(values, parentid).then((response)=> {
            console.log("Data" + response.data);
        })
    };

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
                                initialValues={{ ...INITIAL_FORM_STATE }}
                                validationSchema={FORM_VALIDATION}
                                onSubmit={handleSubmit}
                            >
                                {({ values, errors, isSubmitting }) => (
                                    <Form autoComplete="off">
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
                                                    value={values.dept_name}
                                                    label="Department Name"
                                                />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="dept_description"
                                                    value={values.dept_description}
                                                    label="Description"
                                                />
                                            </Grid>    
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="dept_number" 
                                                    value={values.dept_number}
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

export default NewDepartment;

