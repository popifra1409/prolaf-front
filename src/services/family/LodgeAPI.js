import axios from "axios";

const Lodge_API_BASE_URL = "http://localhost:8000/family/lodges/";

class LodgeAPI {
    //list all lodges
    getLodges = async() =>{
        return await axios.get(Lodge_API_BASE_URL);
    };

    //get a single lodge
    getLodgeById = async (lodgeId) =>{
        return await  axios.get(Lodge_API_BASE_URL + lodgeId + "/");
    };

    //create a lodge
    addLodge = async(lodge) =>{
        return await axios.post(Lodge_API_BASE_URL + "save",  lodge);
    };
}

export default new LodgeAPI()