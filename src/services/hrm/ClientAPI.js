import axios from "axios";

const Client_API_BASE_URL = "http://localhost:8000/hrm/clients/";

class ClientAPI {
    //list all clients
    getClients = async() =>{
        return await axios.get(Client_API_BASE_URL);
    };

    //get a single client
    getClientById = async (agentId) =>{
        return await  axios.get(Client_API_BASE_URL + agentId);
    };

    //create a client
    addClient = async(client) =>{
        return await axios.post(Client_API_BASE_URL + "save",  client);
    };
}

export default new ClientAPI()