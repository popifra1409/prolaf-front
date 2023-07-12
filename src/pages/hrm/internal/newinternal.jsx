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
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";
import DateTimePicker from "../../../components/FormsUI/DateTimePicker";

const emptyInfoSup = { information: '', value: '' };
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

const NewInternal = ({ title }) => {

    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
          EmployeeAPI.getEmployees()
          .then((res) => {
            const employees = res.data.map(employee => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.firstname}
              </option>
            ));
            setEmployee(employees);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, []);



    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        contract_no: "",
        employee: "",
        dateofcreation: "",
        duration: "",
        formofcontract: "",
        contractupload: ""
        
    };


    const FORM_VALIDATION = Yup.object().shape({
        employee: Yup.string().required("Select the employee"),
        contract_no: Yup.string().required("Provide the contract number"),
        duration: Yup.string().required("Provide the Duration"),
        contractupload: Yup.string().required("Provide the Contract Doc")
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
                                                    Internal Contract's Information
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="contract_no"
                                                    label="Contract No"
                                                    value={values.contract_no}
                                                />
                                            </Grid>  
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="employee" 
                                                    label="Employee"
                                                    value={values.employee} 
                                                    options={employees} />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <DateTimePicker 
                                                    name="dateofcreation" 
                                                    label="Date Of Creation" 
                                                    value={values.dateofcreation}
                                                     />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="duration" 
                                                    label="Duration"
                                                    value={values.duration}
                                                     />
                                            </Grid>
                                            
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="formofcontract"
                                                    label="Form Of Contract"
                                                    value={values.formofcontract}
                                                />
                                            </Grid>  
                                            
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField 
                                                    type="file" 
                                                    name="contractupload" 
                                                    value={values.contractupload}
                                                    accept="image/*" />
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

export default NewInternal;
