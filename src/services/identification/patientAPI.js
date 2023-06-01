import axios from "axios";

const Patient_API_BASE_URL = "http://localhost:9091/hims/patients/";

class PatientAPI {
    //list all patients
    getPatients = async() =>{
        return await axios.get(Patient_API_BASE_URL + "all");
    };

    //get a single patient
    getPatientsById = async (patientId) =>{
        return await  axios.get(Patient_API_BASE_URL + patientId);
    };

    //create a patient
    addPatient = async(patient) =>{
        return await axios.post(Patient_API_BASE_URL + "save",  patient);
    };
}

export default new PatientAPI()