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
import { Checkbox } from "@material-ui/core";
import Select from "../../../components/FormsUI/Select";
import Radio from "../../../components/FormsUI/RadioButton";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";


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

const NewEmployee = ({ title }) => {

    const [departments, setDepartment] = useState([]);
    const [employees, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        DepartmentAPI.getDepartments()
          .then((res) => {
            const departments = res.data.map(department => (
              <option key={department.departmentId} value={department.departmentId}>
                {department.dept_name}
              </option>
            ));
            setDepartment(departments);
            setLoading(false);
          })
          EmployeeAPI.getEmployees()
          .then((res) => {
            const employees = res.data.map(employee => (
              <option key={employee.employeeIdId} value={employee.employeeId}>
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
        employeeMat: "",
        department: "",
        supervisor: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        birthplace: "",
        gender: "",
        status: "",
        email: "",
        address: "",
        phone: "",
        photo: "",
        function: "",
        hiringdate: "",
        seniority: "",
        salary: "",
        whatsappnumber: "",
        facebooklink: "",
        resourcecontact: "",
        resourcename: "",
        isChiefOfDepartment: "",
        typeofemployee: ""
    };

    //options gender
    const genre = [
        { value: '0', label: 'MALE' },
        { value: '1', label: 'FEMALE' },
        { value: '2', label: 'NONE PRECISE' },
    ];
    const employeechoice = [
        { value: 'supervisor', label: 'SUPERVISOR' },
        { value: 'manager', label: 'MANAGER' },
        { value: 'accountant', label: 'ACCOUNTANT' },
        { value: 'worker', label: 'WORKER' }
        
    ];

    const FORM_VALIDATION = Yup.object().shape({
        firstname: Yup.string().required("Enter the Name").min(3, 'It should contain at least 3 letters'),
        phone: Yup.number().integer().typeError('Invalid Phone number').required('Enter Phone Number').min(9, 'It should contain 9 digits'),
        department: Yup.string().required("Select the department"),
        gender: Yup.string().required("Select the gender"),
        function: Yup.string().required("Enter the function"),
        resourcecontact: Yup.string().required("Enter the resource contact"),
        birthdate: Yup.date().required("Enter the birth date"),
        address: Yup.string().required("Enter the address"),
        email: Yup.string().email("Invalid E-mail"),
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
                                            <Grid item xs={4} className={classes.strech}>
                                                <Select 
                                                    name="department" 
                                                    label="Department Parent"
                                                    value={values.department} 
                                                    options={departments}
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <Select 
                                                    name="supervisor" 
                                                    label="Supervisor" 
                                                    value={values.supervisor} 
                                                    options={employees} />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="firstname"             
                                                    label="First Name"
                                                    value={values.firstname} 
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="lastname"             
                                                    label="Last Name"
                                                    value={values.lastname} 
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <DateTimePicker
                                                    name="birthdate"
                                                    label="Date of Birth"
                                                    value={values.birthdate}
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="birthplace"             
                                                    label="Place of Birth"
                                                    value={values.birthplace} 
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Radio label="Gender" name="gender" value={values.gender} options={genre} />
                                            </Grid>  
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="status"             
                                                    label="Status"
                                                    value={values.status} 
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField 
                                                    type="file" 
                                                    name="photo" 
                                                    value={values.photo} 
                                                    accept="image/*" />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="function"             
                                                    label="Function"
                                                    value={values.function} 
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <DateTimePicker
                                                    name="hiringdate"
                                                    label="hired Date"
                                                    value={values.hiringdate}
                                                />
                                            </Grid>           
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="seniority"             
                                                    label="Seniority"
                                                    value={values.seniority} 
                                                />
                                            </Grid>        
                                            <Grid item xs={4} className={classes.strech}>
                                                <TextField
                                                    name="salary"             
                                                    label="Salary"
                                                    value={values.salary} 
                                                />
                                            </Grid>   
                                            <Grid item xs={4} >
                                                <Select
                                                    name="typeofemployee"             
                                                    label="Type Of Employee"
                                                    value={values.typeofemployee} 
                                                    options={employeechoice}
                                                />
                                            </Grid> 
                                             
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.text}>
                                                    Employee's Contact Form
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="phone" label="Phone Number" value={values.phone}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="whatsappnumber" label="Whatsapp Number" value={values.whatsappnumber}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="facebooklink" label="Facebook Link" value={values.facebooklink}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="resourcename" label="Resource Name" value={values.resourcename}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="resourcecontact" label="Resource Contact" value={values.resourcecontact}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="adresse" label="Adresse" value={values.adresse}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="email" label="Email" value={values.email} />
                                            </Grid>
                                            <Grid item xs={12} className={classes.strech}>
                                                <Checkbox 
                                                    name="isChiefOfDepartment" 
                                                    value={values.isChiefOfDepartment} 
                                                     />
                                                     Is Chief Of Department
                                            </Grid>
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

export default NewEmployee;
