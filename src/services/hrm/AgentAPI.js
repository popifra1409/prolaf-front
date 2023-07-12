import axios from "axios";

const Agent_API_BASE_URL = "http://localhost:8000/hrm/agents/";

class AgentAPI {
    //list all agents
    getAgents = async() =>{
        return await axios.get(Agent_API_BASE_URL);
    };

    //get a single agent
    getAgentById = async (agentId) =>{
        return await  axios.get(Agent_API_BASE_URL + agentId + "/");
    };

    //create a agent
    addAgent = async(agent) =>{
        return await axios.post(Agent_API_BASE_URL + "save",  agent);
    };
}

export default new AgentAPI()