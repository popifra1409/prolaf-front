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

const NewSupplier = ({ title }) => {


    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        email: "",
        company: "",
        niu: "",
        observation: "",
        bankaccount: ""
    };


    const FORM_VALIDATION = Yup.object().shape({
        firstname: Yup.string().required("Enter the name").min(3, 'It should contain al least 3 letters'),
        bankaccount: Yup.string().required("Enter the bank account number"),
        niu: Yup.string().required("Enter the niu"),
        phone: Yup.number().integer().typeError('Invalid Phone number').required('Enter the phone number').min(9, 'Should contain 9 figures'),
        
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
                                                    Supplier's Information
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField 
                                                    name="firstname" 
                                                    label="First Name" 
                                                    value={values.firstname}
                                                     />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="lastname"
                                                    label="Last Name"
                                                    value={values.lastname}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="address"
                                                    label="Address"
                                                    value={values.address}
                                                />
                                            </Grid>    
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="phone" 
                                                    label="Contact (Phone N°)" 
                                                    value={values.phone}
                                                    />
                                                    
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="email" 
                                                    label="Email" 
                                                    value={values.email}
                                                    />    
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="company" 
                                                    label="Company" 
                                                    value={values.company}/>
                                                    
                                            </Grid>
                        
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="niu" 
                                                    label="NIU" 
                                                    value={values.niu}
                                                    />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="bankaccount" 
                                                    label="Bank Account" 
                                                    value={values.bankaccount}
                                                    />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField 
                                                    name="observation" 
                                                    label="Observation" 
                                                    value={values.observation}
                                                    />
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

export default NewSupplier;
