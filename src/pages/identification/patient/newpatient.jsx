import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState } from "react";
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
import professions from '../../../static/professions.json';
import nations from '../../../static/pays.json';
import religions from '../../../static/religions.json';

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

const NewPatient = ({ title }) => {

    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        adresse: "",
        email: "",
        patientAge: 0,
        patientBarCode: "patient",
        patientBirthDay: "",
        patientLastName: "",
        patientFirstName: "",
        patientNationalite: "",
        patientPlaceOfBirth: "",
        patientProfession: "",
        patientReligion: "",
        patientSex: false,
        telephone: "",
        infosup: [emptyInfoSup]
    };

    //options gender
    const genre = [
        { value: '0', label: 'MASCULIN' },
        { value: '1', label: 'FEMININ' },
        { value: '2', label: 'NON PRECISE' },
    ];

    //calcul de la date de naissance
    const [values, setValues] = useState(INITIAL_FORM_STATE);

    const calculateDob = (age) => {
        const today = new Date();
        const birthYear = today.getFullYear() - age;
        const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
        return birthDate;
    };

    const handleAgeChange = (e) => {
        const patientAge = e.target.value ? parseInt(e.target.value, 10) : '';
        const patientBirthDay = patientAge ? calculateDob(patientAge) : '';
        console.log('affichage age' + patientBirthDay);
        setValues({ ...values, patientAge, patientBirthDay }); 
    };

    //fin calcul

    const FORM_VALIDATION = Yup.object().shape({
        patientLastName: Yup.string().required("Renseignez le nom du patient").min(3, 'Le nom du patient doit contenir au moins 3 caractères'),
        telephone: Yup.number().integer().typeError('Numéro de téléphone invalide').required('Renseignez un numéro de téléphone').min(9, 'Le numéro doit contenir au moins 9 chiffres'),
        patientSex: Yup.string().required("Renseignez le genre"),
        patientBirthDay: Yup.date().required("Renseignez la date de naissance"),
        patientAge: Yup.number().required('Required').positive('Insérer un nombre positif').max(999999999),
        patientProfession: Yup.string().required("Renseignez la profession"),
        email: Yup.string().email("E-mail invalide"),
    })

    const handleSubmit = (values) => {
        // Handle form submission if needed
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
                                onSubmit={async (values) => {
                                    console.log('Mes données:', values)
                                    return new Promise(res => setTimeout(res, 2500));
                                }}
                            >
                                {({ values, errors, isSubmitting, handleChange }) => (
                                    <Form autoComplete="off">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.text}>
                                                    Informations du patient
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="patientLastName"
                                                    label="Nom(s)"
                                                />
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="patientFirstName"
                                                    label="Prénom(s)"
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <DateTimePicker
                                                    name="patientBirthDay"
                                                    label="Date de naissance"
                                                    value={values.patientBirthDay}
                                                />
                                                <TextField
                                                    name="patientAge"
                                                    label="Age du patient"
                                                    type="number"
                                                    value={values.patientAge}
                                                    onChange={handleAgeChange}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="patientPlaceOfBirth" label="Lieu de naissance" />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Select name="patientProfession" label="Profession" options={professions} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Radio label="Genre" name="patientSex" options={genre} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Select name="patientNationalite" label="Nationalité" options={nations} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Select name="patientReligion" label="Religion" options={religions} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.text}>
                                                    Coordonnées du patient
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="telephone" label="Contact (N° Téléphone)" />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="email" label="Adresse électronique" />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="adresse" label="Adresse postale" />
                                            </Grid>
                                            <FieldArray name="infosup">
                                                {({ push, remove }) => (
                                                    <React.Fragment>
                                                        <Grid item xs={12}>
                                                            <Typography variant="overline" className={classes.text}>
                                                                Informations supplémentaires
                                                            </Typography>
                                                        </Grid>
                                                        {values.infosup.map((_, index) => (
                                                            <Grid container item key={index} spacing={2}>
                                                                <Grid item xs={12} sm="auto" className={classes.strech}>
                                                                    <TextField
                                                                        name={`infosup[${index}].information`}
                                                                        label="Information"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm="auto" className={classes.strech}>
                                                                    <TextField
                                                                        name={`infosup[${index}].valeur`}
                                                                        label="Valeur"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm="auto">
                                                                    <Button onClick={() => remove(index)}>Supprimer</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => push(emptyInfoSup)}
                                                            >Ajouter info supplémentaire</Button>
                                                        </Grid>
                                                    </React.Fragment>
                                                )}
                                            </FieldArray>
                                            <Grid item>
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : undefined}
                                                >
                                                    {isSubmitting ? 'Enregistrement en cours' : 'Enregistrer'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
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

export default NewPatient;
