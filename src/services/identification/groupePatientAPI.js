import axios from "axios";

const GroupePatient_API_BASE_URL = "http://localhost:9091/hims/groupepatients/";

class GroupePatientAPI {
    //list all groupes patients
    getGroupePatients = async() =>{
        return await axios.get(GroupePatient_API_BASE_URL+ "all");
    };
}

export default new GroupePatientAPI()