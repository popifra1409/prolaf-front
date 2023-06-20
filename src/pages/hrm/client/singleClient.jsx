import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientAPI from "../../../services/hrm/ClientAPI";
import { Link } from "react-router-dom";


const SingleClient = () => {
    const { agentid } = useParams();

    const [client, setClient] = useState({
        agentId: agentid,
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
        ClientAPI.getClientById(agentid).then((res) => {
            let pat = res.data;
            setClient({
                agentId: pat.agentId,
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
                                to={`/hrm/clients/update/${agentid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Client's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{client.agentId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">First Name:</span>
                                    <span className="itemValue">{client.firstname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Last Name:</span>
                                    <span className="itemValue">{client.lastname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">{client.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{client.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{client.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Company:</span>
                                    <span className="itemValue">{client.company}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">NIU:</span>
                                    <span className="itemValue">{client.niu}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Observation:</span>
                                    <span className="itemValue">{client.observation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Bank Account:</span>
                                    <span className="itemValue">{client.bankaccount}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleClient;
