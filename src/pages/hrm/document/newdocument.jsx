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
import FileInput from "../../../components/FormsUI/FileInput";
/*import { TextField, Select } from "@material-ui/core"; */
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";
import DocumentAPI from "../../../services/hrm/DocumentAPI";


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

const NewDocument = ({ title }) => {

    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
          EmployeeAPI.getEmployees()
          .then((res) => {
            const employees = res.data.map((employee) => (
                {value: employee.employeeId,
                 label: employee.firstname}
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
        employee: "",
        numCni: "",
        cniupload: "",
        diploma: "",
        diplomaupload: "",
        mariagecertificate: ""
    };


    const FORM_VALIDATION = Yup.object().shape({
        employee: Yup.string().required("Select the employee"),
        cniupload: Yup.string().required("Provide the ID Card"),
        diplomaupload: Yup.string().required("Provide the Diploma"),
        mariagecertificate: Yup.string().required("Provide the Mariage Certificate")
        
    })

    const handleSubmit = async (values, employeeid) => {
        employeeid = values.employee
        await DocumentAPI.addDocument(values, employeeid).then((response)=> {
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
                                                    Document's Information
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="employee" 
                                                    label="Employee" 
                                                    options={employees} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="numCni" 
                                                    label="ID Card Number"
                                                    value={values.numCni} 
                                                 />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField  
                                                    type="file"
                                                    name="cniupload"
                                                    //value={values.cniupload}  
                                                    accept="image/*" />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="diploma"
                                                    label="Diploma"
                                                    value={values.diploma} 
                                                />
                                            </Grid>  
                                            
                                            <Grid item xs={6} className={classes.strech}>
                                            <TextField
                                                type="file"
                                                name="diplomaupload"
                                                label="Diploma"
                                                accept="image/*"
                                            />  
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField 
                                                    type="file" 
                                                    name="mariagecertificate" 
                                                    //value={values.mariagecertificate} 
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

export default NewDocument;
