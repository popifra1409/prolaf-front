import axios from "axios";

const Family_API_BASE_URL = "http://localhost:8000/family/families/";

class FamilyAPI {
    //list all families
    getFamilies = async() =>{
        return await axios.get(Family_API_BASE_URL);
    };

    //get a single family
    getFamilyById = async (familyId) =>{
        return await  axios.get(Family_API_BASE_URL + familyId + "/");
    };

    //create a family
    addFamily = async(family) =>{
        return await axios.post(Family_API_BASE_URL + "save",  family);
    };
}

export default new FamilyAPI()