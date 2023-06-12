import axios from "axios";

const ParamRegistration_API_BASE_URL = "http://localhost:8000/family/paramRegistrations/";

class ParamRegistrationAPI {
    //list all paramRegistrations
    getParamRegistrations = async() =>{
        return await axios.get(ParamRegistration_API_BASE_URL);
    };

    //get a single paramRegistration
    getParamRegistrationById = async (paramRegistrationId) =>{
        return await  axios.get(ParamRegistration_API_BASE_URL + paramRegistrationId);
    };

    //create a paramRegistration
    addParamRegistration = async(paramRegistration) =>{
        return await axios.post(ParamRegistration_API_BASE_URL + "save",  paramRegistration);
    };
}

export default new ParamRegistrationAPI()