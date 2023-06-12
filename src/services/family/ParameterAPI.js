import axios from "axios";

const Parameter_API_BASE_URL = "http://localhost:8000/family/parameters/";

class ParameterAPI {
    //list all parameters
    getParameters = async() =>{
        return await axios.get(Parameter_API_BASE_URL);
    };

    //get a single parameter
    getParameterById = async (parameterId) =>{
        return await  axios.get(Parameter_API_BASE_URL + parameterId);
    };

    //create a parameter
    addParameter = async(parameter) =>{
        return await axios.post(Parameter_API_BASE_URL + "save",  parameter);
    };
}

export default new ParameterAPI()