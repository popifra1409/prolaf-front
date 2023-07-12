import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik, Field, FieldArray } from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import DateTimePicker from "../../../components/FormsUI/DateTimePicker";
import moment from "moment";
import TextField from "../../../components/FormsUI/Textfield";
/* import { TextField } from "@material-ui/core"; */
import Select from "../../../components/FormsUI/Select";
import Radio from "../../../components/FormsUI/RadioButton";
import FamilyAPI from "../../../services/family/FamilyAPI";
import LodgeAPI from "../../../services/family/LodgeAPI";


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

const NewPig = ({ title }) => {

    const [families, setFamily] = useState([]);
    const [lodges, setLodge] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        FamilyAPI.getFamilies()
          .then((res) => {
            const families = res.data.map(family => (
              <option key={family.familyId} value={family.familyId}>
                {family.family_name}
              </option>
            ));
            setFamily(families);
            setLoading(false);
          })
          LodgeAPI.getLodges()
          .then((res) => {
            const lodges = res.data.map(lodge => (
              <option key={lodge.lodgeId} value={lodge.lodgeId}>
                {lodge.lodge_name}
              </option>
            ));
            setLodge(lodges);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, []);


    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        family: "",
        lodge: "",
        member_name: "",
        birthdate: "",
        gender: "",
        mother: "",
        father: "",
        
    };

    //options gender
    const genre = [
        { value: '0', label: 'MALE' },
        { value: '1', label: 'FEMALE' }
        
    ];
    

    const FORM_VALIDATION = Yup.object().shape({
        family: Yup.string().required("Select the Family"),
        lodge: Yup.string().required("Select the Lodge"),
        member_name: Yup.string().required("Enter the Name").min(3, 'It should contain at least 3 letters'),
        gender: Yup.string().required("Select the gender"),
        mother: Yup.string().required("Select the mother")
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
                                                   Employee's Informations
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="family" 
                                                    label="Family"
                                                    value={values.family} 
                                                    options={families}
                                                />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="lodge" 
                                                    label="Lodge" 
                                                    value={values.lodge} 
                                                    options={lodges} />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="member_name"             
                                                    label="Member Name"
                                                    value={values.member_name} 
                                                />
                                            </Grid>
                                             
                                            <Grid item xs={6}>
                                                <DateTimePicker
                                                    name="birthdate"
                                                    label="Date of Birth"
                                                    value={values.birthdate}
                                                />
                                            </Grid>
                                            
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="mother"             
                                                    label="Mother"
                                                    value={values.mother} 
                                                />
                                            </Grid> 
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="father"             
                                                    label="Father"
                                                    value={values.father} 
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Radio label="Gender" name="gender" value={values.gender} options={genre} />
                                            </Grid> 
                                            
                                            <Grid item xs={16}>
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

export default NewPig;
