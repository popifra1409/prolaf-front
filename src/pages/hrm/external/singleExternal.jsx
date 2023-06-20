import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExternalAPI from "../../../services/hrm/ExternalAPI";
import { Link } from "react-router-dom";


const SingleExternal = () => {
    const { contractid } = useParams();

    const [external, setExternal] = useState({
        contractId: contractid,
        contract_no: "",
        dateofcreation: "",
        duration: "",
        formofcontract: "",
        contractupload: "",
        agent: "",
        client: "",
        supplier: ""
        
    });

    useEffect(() => {
        ExternalAPI.getExternalById(contractid).then((res) => {
            let pat = res.data;
            setExternal({
                contractId: pat.contractId,
                contract_no: pat.contract_no,
                dateofcreation: pat.dateofcreation,
                duration: pat.duration,
                formofcontract: pat.formofcontract,
                contractupload: pat.contractupload,
                agent: pat.agent,
                client: pat.client,
                Supplier: pat.supplier


            });

        }, [contractid])
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
                                to={`/hrm/externals/update/${contractid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">External Contract's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{external.contractId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Contract No:</span>
                                    <span className="itemValue">{external.contract_no}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Agent:</span>
                                    <span className="itemValue">{external.agent}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Client:</span>
                                    <span className="itemValue">{external.client}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Supplier:</span>
                                    <span className="itemValue">{external.supplier}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Date Of Creation:</span>
                                    <span className="itemValue">{external.dateofcreation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Duration:</span>
                                    <span className="itemValue">{external.duration}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Form Of Contract:</span>
                                    <span className="itemValue">{external.formofcontract}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Contract Upload:</span>
                                    <span className="itemValue">{external.contractupload}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleExternal;
