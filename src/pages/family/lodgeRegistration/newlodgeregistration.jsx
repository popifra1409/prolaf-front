import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik,  } from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import DateTimePicker from "../../../components/FormsUI/DateTimePicker";
import moment from "moment";
import TextField from "../../../components/FormsUI/Textfield";
import { Checkbox } from "@material-ui/core";
import Select from "../../../components/FormsUI/Select";
import LodgeRegistrationAPI from "../../../services/family/LodgeRegistrationAPI";
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

const NewLodgeRegistration = ({ title }) => {

    const [lodges, setLodge] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFinSejour, setIsFinSejour] = useState(false);


    useEffect(() => {
        setLoading(true);
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
        lodge: "",
        enteryDate: "",
        enteryReason: "",
        weight: "",
        isFinSejour: "",
        leavingDate: "",
        leavingReason: ""
        
    };

    const FORM_VALIDATION = Yup.object().shape({
        lodge: Yup.string().required("Select the Lodge"),
        enteryDate: Yup.string().required("Enter the Date"),
        enteryReason: Yup.string().required("Enter the reason").min(3, 'It should contain at least 3 letters'),
        weight: Yup.string().required("Enter the weight")
    })

    const handleSubmit = async (values) => {
        await LodgeRegistrationAPI.addLodgeRegistration(values).then((response)=> {
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
                                                   Lodge Registration's Informations
                                                </Typography>
                                            </Grid>
                                    
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="lodge" 
                                                    label="Lodge" 
                                                    value={values.lodge} 
                                                    options={lodges} />
                                            </Grid>
                                           
                                            <Grid item xs={6}>
                                                <DateTimePicker
                                                    name="enteryDate"
                                                    label="Entery Date"
                                                    value={values.enteryDate}
                                                />
                                            </Grid>
                                            
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="enteryReason"             
                                                    label="Entery Reason"
                                                    value={values.enteryReason} 
                                                />
                                            </Grid> 
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="weight"             
                                                    label="Weight"
                                                    value={values.weight} 
                                                />
                                            </Grid>
                                            <Grid>     
                                                <Checkbox
                                                    name="isFinSejour"
                                                    checked={isFinSejour}
                                                    onChange={(e) => setIsFinSejour(e.target.checked)}
                                                />
                                                Is Fin Sejour
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.text}>
                                                    Fin Sejour
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <DateTimePicker
                                                    name="leavingDate"
                                                    label="Leaving Date"
                                                    value={values.leavingDate}
                                                    disabled={!isFinSejour}
                                                />
                                            </Grid>  
                                            <Grid item xs={6}>
                                                <TextField 
                                                    name="leavingReason" 
                                                    label="Leaving Reason" 
                                                    value={values.leavingReason} 
                                                    disabled={!isFinSejour}
                                                 />
                                            </Grid>
    
                                            <Grid item xs={6}>
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

export default NewLodgeRegistration;
