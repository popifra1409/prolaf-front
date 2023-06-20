import axios from "axios";

const External_API_BASE_URL = "http://localhost:8000/hrm/externals/";

class ExternalAPI {
    //list all externals
    getExternals = async() =>{
        return await axios.get(External_API_BASE_URL);
    };

    //get a single external
    getExternalById = async (contractId) =>{
        return await  axios.get(External_API_BASE_URL + contractId + "/");
    };

    //create an external
    addExternal = async(external) =>{
        return await axios.post(External_API_BASE_URL + "save",  external);
    };
}

export default new ExternalAPI()