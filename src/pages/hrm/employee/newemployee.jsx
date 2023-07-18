import "../../new/new.scss";
import "../../../style/dark.scss"
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik} from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import DateTimePicker from "../../../components/FormsUI/DateTimePicker";
import TextField from "../../../components/FormsUI/Textfield";
import { Checkbox } from "@material-ui/core";
import Select from "../../../components/FormsUI/Select";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";



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
                {value: department.departmentId,
                    label: department.dept_name}
            ));
            setDepartment(departments);
            setLoading(false);
          })
          EmployeeAPI.getEmployees()
          .then((res) => {
            const employees = res.data.map(employee => (
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
        { value: 'Male', label: 'MALE' },
        { value: 'Female', label: 'FEMALE' },
        { value: 'Non precise', label: 'NONE PRECISE' },
    ];
    const employeechoice = [
        { value: 'Supervisor', label: 'SUPERVISOR' },
        { value: 'Manager', label: 'MANAGER' },
        { value: 'Accountant', label: 'ACCOUNTANT' },
        { value: 'Worker', label: 'WORKER' }
        
    ];
    const statuschoice = [
        {value: 'Single', label: 'SINGLE'},
        {value: 'Married', label: 'MARRIED'},
        {value: 'Divorce', label: 'DIVORCE'},
        {value: 'Widower', label: 'WIDOWER'},
        {value: 'Partner', label: 'PARTNER'}
    ]

        const FORM_VALIDATION = Yup.object().shape({
        firstname: Yup.string().required("Enter the Name").min(3, "It should contain at least 3 letters"),
        phone: Yup.number().integer().typeError("Invalid Phone numbe").required('Enter Phone Number').min(9, 'It should contain 9 digits'),
        department: Yup.string().required("Select the department"),
        gender: Yup.string().required("Select the gender"),
        function: Yup.string().required("Enter the function"),
        resourcecontact: Yup.number().required("Enter the resource contact"),
        birthdate: Yup.date().required("Enter the birth date"),
        address: Yup.string().required("Enter the address"),
        email: Yup.string().email("Invalid E-mail")
    })

    const handleSubmit = async (values, supid, departmentid) => {
        supid = values.supervisor
        departmentid = values.department
        await EmployeeAPI.addEmployee(values, supid, departmentid).then((response)=> {
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
                                //validationSchema={FORM_VALIDATION}
                                onSubmit={handleSubmit}
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
                                                    options={departments}
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.strech}>
                                                <Select 
                                                    name="supervisor" 
                                                    label="Supervisor"  
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
                                                <Select 
                                                    label="Gender" 
                                                    name="gender"  
                                                    options={genre} />
                                            </Grid>  
                                            <Grid item xs={4} className={classes.strech}>
                                                <Select
                                                    name="status"             
                                                    label="Status"
                                                    options={statuschoice} 
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
                                                    type="number"             
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
                                                    options={employeechoice}
                                                />
                                            </Grid> 
                                             
                                            <Grid item xs={12}>
                                                <Typography variant="overline" className={classes.text}>
                                                    Employee's Contact Form
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="phone" type="number" label="Phone Number" value={values.phone}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="whatsappnumber" type="number" label="Whatsapp Number" value={values.whatsappnumber}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="facebooklink" label="Facebook Link" value={values.facebooklink}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="resourcename" label="Resource Name" value={values.resourcename}  />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField name="resourcecontact" type="number" label="Resource Contact" value={values.resourcecontact}  />
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
