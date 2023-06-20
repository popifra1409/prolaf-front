import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik, Field, FieldArray } from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import TextField from "../../../components/FormsUI/Textfield";
import Select from "../../../components/FormsUI/Select";
/*import { TextField, Select } from "@material-ui/core"; */
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";

const emptyInfoSup = { information: '', valeur: '' };
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

    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        DepartmentAPI.getDepartments().then((res) => {
          console.log(setDepartment(res.data));
        });
        setLoading(false);
      }, []);


    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        dept_parent: "",
        dept_name: "",
        dept_description: "",
        dept_number: ""
    };


    const FORM_VALIDATION = Yup.object().shape({
        dept_parent: Yup.string().required("Enter the department parent").min(3, 'It should contain al least 3 letters'),
        dept_name: Yup.string().required("Enter the department name").min(3, 'It should contain al least 3 letters'),
        dept_description: Yup.string().required("Enter the department description"),
        dept_number: Yup.number().integer().typeError('Invalid Phone number').required('Enter the phone number').min(9, 'Should contain 9 figures'),
        
    })


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
                                onSubmit={async (values) => {
                                    console.log('My data:', values)
                                    return new Promise(res => setTimeout(res, 2500));
                                }}
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
                                                    options={department.map(departments => (
                                                        <option key={departments.departmentId} value={departments.dept_name}>{departments.dept_name}</option>
                                                ))} />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="dept_name"
                                                    label="Department Name"
                                                />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="dept_description"
                                                    label="Description"
                                                />
                                            </Grid>    
                                            <Grid item xs={6}>
                                                <TextField name="dept_number" label="Contact (Phone N°)" />
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
