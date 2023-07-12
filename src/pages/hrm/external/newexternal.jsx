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
import Radio from "../../../components/FormsUI/RadioButton";
/*import { TextField, Select } from "@material-ui/core"; */
import ClientAPI from "../../../services/hrm/ClientAPI";
import SupplierAPI from "../../../services/hrm/SupplierAPI";
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

const NewExternal = ({ title }) => {

    const [clients, setClient] = useState([]);
    const [suppliers, setSupplier] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
          ClientAPI.getClients()
          .then((res) => {
            const clients = res.data.map(client => (
              <option key={client.agentId} value={client.agentId}>
                {client.firstname}
              </option>
            ));
            setClient(clients);
            setLoading(false);
          })
          SupplierAPI.getSuppliers()
          .then((res) => {
            const suppliers = res.data.map(supplier => (
              <option key={supplier.agentId} value={supplier.agentId}>
                {supplier.firstname}
              </option>
            ));
            setSupplier(suppliers);
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

    const typeagent = [
        { value: 'client', label: 'Client' },
        { value: 'supplier', label: 'Supplier' }
        
    ];

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
                                                    External Contract's Information
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.strech}>
                                                <TextField
                                                    name="contract_no"
                                                    label="Contract No"
                                                    value={values.contract_no}
                                                />
                                            </Grid>  
                                            <Grid item xs={6}>
                                                <Select 
                                                    label="Type of Agent" 
                                                    name="agent" 
                                                    value={values.agent}
                                                    options={typeagent} />
                                            </Grid>  
                                            <Grid item xs={6} className={classes.strech}>
                                                <Select 
                                                    name="agent" 
                                                    label="Agent Name"
                                                    value={values.member} 
                                                    options={[...clients, ...suppliers]}
                                                />
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
                                            
                                            <Grid item xs={12}>
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

export default NewExternal;
