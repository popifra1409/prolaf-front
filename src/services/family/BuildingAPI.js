import axios from "axios";

const Building_API_BASE_URL = "http://localhost:8000/family/buildings/";

class BuildingAPI {
    //list all buildings
    getBuildings = async() =>{
        return await axios.get(Building_API_BASE_URL);
    };

    //get a single building
    getBuildingById = async (buildingId) =>{
        return await  axios.get(Building_API_BASE_URL + buildingId + "/");
    };

    //create a building
    addBuilding = async(building) =>{
        return await axios.post(Building_API_BASE_URL + "save",  building);
    };
}

export default new BuildingAPI()