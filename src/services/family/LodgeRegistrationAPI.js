import axios from "axios";

const LodgeRegistration_API_BASE_URL = "http://localhost:8000/family/lodge_Registrations/";

class LodgeRegistrationAPI {
    //list all lodgeRegistrations
    getLodgeRegistrations = async() =>{
        return await axios.get(LodgeRegistration_API_BASE_URL);
    };

    //get a single lodgeRegistration
    getLodgeRegistrationById = async (lodgeRegistrationId) =>{
        return await  axios.get(LodgeRegistration_API_BASE_URL + lodgeRegistrationId);
    };

    //create a lodgeRegistration
    addLodgeRegistration = async(lodgeRegistration) =>{
        return await axios.post(LodgeRegistration_API_BASE_URL + "save",  lodgeRegistration);
    };
}

export default new LodgeRegistrationAPI()