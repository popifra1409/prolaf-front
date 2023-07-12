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

const NewBuilding = ({ title }) => {
    
    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        building_name: "",
        building_description: ""

    };


    const FORM_VALIDATION = Yup.object().shape({
        building_name: Yup.string().required("Enter the Building Name"),
        building_description: Yup.string().required("Enter the Description")
        
        
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
                                                    Building's Information
                                                </Typography>
                                            </Grid>
                                            
                                            <Grid item xs={12} className={classes.strech}>
                                                <TextField
                                                    name="building_name"
                                                    value={values.building_name}
                                                    label="Building Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.strech}>
                                                <TextField
                                                    name="building_description"
                                                    value={values.building_description}
                                                    label="Description"
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

export default NewBuilding;
