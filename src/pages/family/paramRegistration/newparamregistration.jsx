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
/* import { TextField } from "@material-ui/core"; */
import Select from "../../../components/FormsUI/Select";
import PigAPI from "../../../services/family/PigAPI";
import FowlAPI from "../../../services/family/FowlAPI";
import ParameterAPI from "../../../services/family/ParameterAPI";


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

const NewParamRegistration = ({ title }) => {

    const [pigs, setPig] = useState([]);
    const [fowls, setFowl] = useState([]);
    const [parameters, setParameter] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        PigAPI.getPigs()
          .then((res) => {
            const pigs = res.data.map(pig => (
              <option key={pig.memberId} value={pig.memberId}>
                {pig.member_name}
              </option>
            ));
            setPig(pigs);
            setLoading(false);
          })
          FowlAPI.getFowls()
          .then((res) => {
            const fowls = res.data.map(fowl => (
              <option key={fowl.memberId} value={fowl.memberId}>
                {fowl.member_name}
              </option>
            ));
            setFowl(fowls);
            setLoading(false);
          })
          ParameterAPI.getParameters()
          .then((res) => {
            const parameters = res.data.map(parameter => (
              <option key={parameter.parameterId} value={parameter.parameterId}>
                {parameter.name}
              </option>
            ));
            setParameter(parameters);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, []);


    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        member_choice: "",
        member: "",
        parameter: "",
        value: ""
        
    };

    //options gender
    const member = [
        { value: 'pig', label: 'PIG' },
        { value: 'fowl', label: 'FOWL' }
        
    ];
    

    const FORM_VALIDATION = Yup.object().shape({
        member_choice: Yup.string().required("Select the Type of Member"),
        member: Yup.string().required("Select the Member"),
        parameter: Yup.string().required("Select the parameter"),
        value: Yup.string().required("Enter the value")
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
                                                   Parameter Registration's Informations
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Select
                                                    name="typeofemployee"             
                                                    label="Type Of Member"
                                                    value={values.member_choice} 
                                                    options={member}
                                                />
                                            </Grid> 
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="member" 
                                                    label="Member"
                                                    value={values.member} 
                                                    options={[...pigs, ...fowls]}
                                                />
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Select
                                                    name="parameter"             
                                                    label="Parameter"
                                                    value={values.parameter} 
                                                    options={parameters}
                                                />
                                            </Grid> 
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="value"             
                                                    label="Value"
                                                    value={values.value} 
                                                />
                                            </Grid>
                                            
                                            <Grid >
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : undefined}
                                                >
                                                    {isSubmitting ? 'Saving' : 'Saved'}
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

export default NewParamRegistration;
