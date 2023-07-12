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
import BuildingAPI from "../../../services/family/BuildingAPI";


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

const NewFamily = ({ title }) => {

    const [buildings, setBuilding] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        BuildingAPI.getBuildings()
          .then((res) => {
            const buildings = res.data.map(building => (
              <option key={building.buildingId} value={building.buildingId}>
                {building.building_name}
              </option>
            ));
            setBuilding(buildings);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }, []);
    
    const classes = useStyles();

    const INITIAL_FORM_STATE = {
        building: "",
        family_name: "",
        family_description: ""

    };


    const FORM_VALIDATION = Yup.object().shape({
        building: Yup.string().required("Select the Building Name"),
        family_name: Yup.string().required("Enter the Family name")
        
        
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
                                                    Family's Information
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} className={classes.strech}>
                                                <Select 
                                                    name="building" 
                                                    label="Building" 
                                                    options={buildings}
                                                />
                                            </Grid>
                                            
                                            <Grid item xs={12} className={classes.strech}>
                                                <TextField
                                                    name="family_name"
                                                    value={values.family_name}
                                                    label="Family Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.strech}>
                                                <TextField
                                                    name="family_description"
                                                    value={values.family_description}
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

export default NewFamily;
