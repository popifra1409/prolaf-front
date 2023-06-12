import axios from "axios";

const Internal_API_BASE_URL = "http://localhost:8000/hrm/internals/";

class InternalAPI {
    //list all internals
    getInternals = async() =>{
        return await axios.get(Internal_API_BASE_URL);
    };

    //get a single internal
    getInternalById = async (contractId) =>{
        return await  axios.get(Internal_API_BASE_URL + contractId);
    };

    //create a internal
    addInternal = async(internal) =>{
        return await axios.post(Internal_API_BASE_URL + "save",  internal);
    };
}

export default new InternalAPI()