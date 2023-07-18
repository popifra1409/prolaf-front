import backgroundImage from "../../assets/photo/login1.jpg";
import React, { useState} from "react";
import { Card, CardContent, Grid, Button, makeStyles, Typography } from '@material-ui/core';
import { Form, Formik} from 'formik';
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import TextField from "../../components/FormsUI/Textfield";
//import LoginAPI from "../../services/user/LoginAPI";
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import LoginAPI from '../../services/user/LoginAPI';
import axios from 'axios';


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


const LoginPage = ({ title }) => {
   
    const classes = useStyles();
    let Navigate = useNavigate();
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    
    
    const handleLogin = async (e) => {
      
      await LoginAPI.addDepartment(e).then((response)=> {
          console.log("Data" + response.data);
      })
  };


    const INITIAL_FORM_STATE = {
        pseudo: "",
        password: ""
    };
    
    const FORM_VALIDATION = Yup.object().shape({
        pseudo: Yup.string().required("Enter the User Name").min(3, "It should contain at least 3 letters"),
        password: Yup.string().required("Enter the password").min(6, "It should contain at least 6 characters")
        
    })
    

    return (
        <div className="new" style={{ display: "flex", justifyContent:"center", alignItems: "center", height: "100vh", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover"  }}>
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <Grid container justify="center">
              <Grid item xs={12} sm={12}style={{ display: "flex", justifyContent:"center" }}>
                <Card >
                  <CardContent >
                  <Formik
                        initialValues={{ ...INITIAL_FORM_STATE }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={handleLogin}
                    >
                                {({ values,  isSubmitting }) => (
                                    <Form autoComplete="off">
                                        <Grid container spacing={4} direction="column" justifyContent="center">
                                            <Grid item xs={12}  >
                                                <Typography variant="overline" color="secondary" className={classes.text}>
                                                    LOGIN FORM
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.strech}>
                                              <AccountCircleIcon className="icon" /> 
                                                <TextField
                                                    name="pseudo"
                                                    value={values.pseudo}
                                                    label="User Name"
                                                    onChange={(e) => setPseudo(e.target.value)}
                                                />
                                                </Grid>
                                                <Grid item xs={12} className={classes.strech}>
                                                <LockResetIcon className="icon"/>
                                                <TextField
                                                    name="password"
                                                    type="password"
                                                    value={values.password}
                                                    label="Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                </Grid>
                                               
                                            <Grid item xs={12}>
                                                <Button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={isSubmitting ? <CircularProgress size="1rem" /> : undefined}
                                                >
                                                    {isSubmitting ? 'loging in' : 'login'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        
                                    </Form>
                                )}
                            </Formik>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
export default LoginPage
