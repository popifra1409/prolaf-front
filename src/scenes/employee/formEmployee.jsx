import { Box, Button, FormControl,Select, InputLabel,MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Controls from "../../components/controls/Controls";
import SelectDept from "../../components/controls/select";



const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'Not Precise', title: 'Not Precise' },
]


const initialValues = {
  employeeMat: "",
  department: "",  
  firstname: "",
  lastname: "",
  birthdate: "",
  birthplace: "",
  gender: "Not Precise",
  email: "",
  address: "",
  phone: "",
  status: "",
  photo: "",
  function: "",
  hiringdate: "",
  seniority: "",
  salary: "",
  whatsappnumber: "",
  facebooklink: "",
  resourcecontact: "",
  superior:"",
  isChiefOfDepartment: "",
  
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const emailRegExp =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const employeeSchema = yup.object().shape({
  employeeMat: yup.string().required("required"),
  firstname: yup.string().required("required"),
  department: yup.string().required("required"),
  address: yup.string().required("required"),
  hiringdate: yup.string().required("required"),
  function: yup.string().required("required"),
  salary: yup.string().required("required"),
  email: yup
    .string()
    .matches(emailRegExp, "Email is not valid")
    .required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  whatsappnumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),                      
});

    const FormEmployee = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values) => {
      console.log(values);
    };
    
    return (
        <Box m="20px">
          <Header title="EMPLOYEE" subtitle="Add a new Employee" />
    
          <Formik           
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={employeeSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="employeeMat"
                  label="Eployee Matricule"
                  value={values.employeeMat}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.employeeMat && !!errors.employeeMat}
                  helperText={touched.employeeMat && errors.employeeMat}
                  sx={{ gridColumn: "span 2" }}
                    />

                  <FormControl
                    fullWidth
                    sx={{ gridColumn: "span 2" }}
                  >
                    <SelectDept 
                      label="Department"
                      sx={{ gridColumn: "span 2" }}
                      />
                  </FormControl>
                    

                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="firstname"
                  label="First Name"
                  value={values.firstname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.firstname && !!errors.firstname}
                  helperText={touched.firstname && errors.firstname}
                  sx={{ gridColumn: "span 2" }}
                    />

                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="lastname"
                  label="Last Name"
                  value={values.lastname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: "span 2" }}
                    />
                  
                
                  <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="birthplace"
                  label="Place Of Birth"
                  value={values.lastname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.birthplace && !!errors.birthplace}
                  helperText={touched.birthplace && errors.birthplace}
                  sx={{ gridColumn: "span 2" }}
                    />

                
                  <TextField
                    id="date"
                    label="Date of birth"
                    type="date"
                    //value={values.birthdate}
                    defaultValue="2017-05-24"
                    error={!!touched.birthdate && !!errors.birthdate}
                    helperText={touched.birthdate && errors.birthdate}
                    sx={{ gridColumn: "span 2" }} 
                    InputLabelProps={{
                    shrink: true,

                     }}
                  />
       
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="email"
                  label="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                    />

                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleChange}
                        items={genderItems}
                    />

                  <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="address"
                  label="Address"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                    />

                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2" }}
                    />               
                  

                  <FormControl 
                  fullWidth
                  sx={{ gridColumn: "span 2" }}
                  >
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    //id="status"
                    value={values.status}
                    label="Status"
                    //onChange={Updateselect}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                  >
                    <MenuItem value={'Marie'}>Marie</MenuItem>
                    <MenuItem value={'Divorcer'}>Divorcer</MenuItem>
                    <MenuItem value={'Celibataire'}>Celibataire</MenuItem>
                    <MenuItem value={'Concubinage'}>Concubinage</MenuItem>
                  </Select>
                </FormControl>

                <Button
                    variant="contained"
                    component="label"
                    sx={{ gridColumn: "span 2" }}
                  >
                     Upload Photo
                    <input
                    type="file"
                    hidden
                    accept="image/*"
                    //className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                    
                  />
                  </Button>

                
                  <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="function"
                  label="Function"
                  value={values.function}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.function && !!errors.function}
                  helperText={touched.function && errors.function}
                  sx={{ gridColumn: "span 2" }}
                    />               
                  

                  
                  <TextField
                    id="date"
                    label="Hire Date"
                    type="date"
                    defaultValue="2017-05-24"
                    error={!!touched.hiringdate && !!errors.hiringdate}
                    helperText={touched.hiringdate && errors.hiringdate}
                    sx={{ gridColumn: "span 2" }} 
                    InputLabelProps={{
                    shrink: true,

                     }}
                  />

                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="seniority"
                  label="Seniority"
                  value={values.seniority}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.seniority && !!errors.seniority}
                  helperText={touched.seniority && errors.seniority}
                  sx={{ gridColumn: "span 2" }}
                    />  
                
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="salary"
                  label="Salary"
                  value={values.salary}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.salary && !!errors.salary}
                  helperText={touched.salary && errors.salary}
                  sx={{ gridColumn: "span 2" }}
                    />  

                  
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="whatsappnumber"
                  label="Whatsapp Number"
                  value={values.whatsappnumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.whatsappnumber && !!errors.whatsappnumber}
                  helperText={touched.whatsappnumber && errors.whatsappnumber}
                  sx={{ gridColumn: "span 2" }}
                    />  

                              
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="facebooklink"
                  label="Facebook Link"
                  value={values.facebooklink}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.facebooklink && !!errors.facebooklink}
                  helperText={touched.facebooklink && errors.facebooklink}
                  sx={{ gridColumn: "span 2" }}
                    />
                       
                  <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="resourcecontact"
                  label="Resource Contact"
                  value={values.resourcecontact}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.resourcecontact && !!errors.resourcecontact}
                  helperText={touched.resourcecontact && errors.resourcecontact}
                  sx={{ gridColumn: "span 2" }}
                    />

                                     
                <TextField  fullwidth
                  variant="filled"
                  type="text"
                  name="superior"
                  label="Superior"
                  value={values.superior}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.superior && !!errors.superior}
                  helperText={touched.superior && errors.superior}
                  sx={{ gridColumn: "span 2" }}
                    />                 
                  
                  <Controls.Checkbox
                    name="isChiefOfDepartment"
                    label="Is Chief Of Department"
                    value={values.isChiefOfDepartment}
                    onChange={handleChange}
                  />

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add New Departement
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
   
    };
 
    export default FormEmployee;
    