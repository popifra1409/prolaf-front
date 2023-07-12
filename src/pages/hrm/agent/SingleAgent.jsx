import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgentAPI from "../../../services/hrm/AgentAPI";
import { Link } from "react-router-dom";


const SingleAgent = () => {
    const { agentid } = useParams();

    const [agent, setAgent] = useState({
        agentId: agentid,
        agenttype: "",
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        email: "",
        company: "",
        niu: "",
        observation: "",
        bankaccount: ""
        
    });

    useEffect(() => {
        AgentAPI.getAgentById(agentid).then((res) => {
            let pat = res.data;
            setAgent({
                agentId: pat.agentId,
                agenttype: pat.agenttype,
                firstname: pat.firstname,
                lastname: pat.lastname,
                address: pat.address,
                phone: pat.phone,
                email: pat.email,
                company: pat.company,
                niu: pat.niu,
                observation: pat.observation,
                bankaccount: pat.bankaccount
                
            });

        }, [agentid])
    });

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">
                            <Link
                                to={`/hrm/agents/update/${agentid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Agent's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{agent.agentId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">First Name:</span>
                                    <span className="itemValue">{agent.firstname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Agent Type:</span>
                                    <span className="itemValue">{agent.agenttype}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Last Name:</span>
                                    <span className="itemValue">{agent.lastname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">{agent.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{agent.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{agent.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Company:</span>
                                    <span className="itemValue">{agent.company}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">NIU:</span>
                                    <span className="itemValue">{agent.niu}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Observation:</span>
                                    <span className="itemValue">{agent.observation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Bank Account:</span>
                                    <span className="itemValue">{agent.bankaccount}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleAgent;
