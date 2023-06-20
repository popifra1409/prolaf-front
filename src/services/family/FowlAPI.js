import axios from "axios";

const Fowl_API_BASE_URL = "http://localhost:8000/family/fowls/";

class FowlAPI {
    //list all fowls
    getFowls = async() =>{
        return await axios.get(Fowl_API_BASE_URL);
    };

    //get a single fowl
    getFowlById = async (memberId) =>{
        return await  axios.get(Fowl_API_BASE_URL + memberId + "/");
    };

    //create a fowl
    addFowl = async(fowl) =>{
        return await axios.post(Fowl_API_BASE_URL + "save",  fowl);
    };
}

export default new FowlAPI()