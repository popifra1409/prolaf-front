import axios from "axios";

const Pig_API_BASE_URL = "http://localhost:8000/family/pigs/";
const Postweaning_API_BASE_URL = "http://localhost:8000/family/pigs_post_weaning/";

class PigAPI {
    //list all pigs
    getPigs = async() =>{
        return await axios.get(Pig_API_BASE_URL);
    };

    //get a single pig
    getPigById = async (memberId) =>{
        return await  axios.get(Pig_API_BASE_URL + memberId + "/");
    };

    //create a pig
    addPig = async(pig) =>{
        return await axios.post(Pig_API_BASE_URL + "save",  pig);
    };

    //list all postweaning
    getPostweaning = async() =>{
        return await axios.get(Postweaning_API_BASE_URL);
    };

}

export default new PigAPI()