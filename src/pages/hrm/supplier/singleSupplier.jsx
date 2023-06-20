import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierAPI from "../../../services/hrm/SupplierAPI";
import { Link } from "react-router-dom";


const SingleSupplier = () => {
    const { agentid } = useParams();

    const [supplier, setSupplier] = useState({
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
        SupplierAPI.getSupplierById(agentid).then((res) => {
            let pat = res.data;
            setSupplier({
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
                                to={`/hrm/suppliers/update/${agentid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Supplier's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{supplier.agentId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">First Name:</span>
                                    <span className="itemValue">{supplier.firstname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Last Name:</span>
                                    <span className="itemValue">{supplier.lastname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">{supplier.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{supplier.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{supplier.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Company:</span>
                                    <span className="itemValue">{supplier.company}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">NIU:</span>
                                    <span className="itemValue">{supplier.niu}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Observation:</span>
                                    <span className="itemValue">{supplier.observation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Bank Account:</span>
                                    <span className="itemValue">{supplier.bankaccount}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleSupplier;
