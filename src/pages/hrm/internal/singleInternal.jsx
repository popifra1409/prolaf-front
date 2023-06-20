import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InternalAPI from "../../../services/hrm/InternalAPI";
import { Link } from "react-router-dom";


const SingleInternal = () => {
    const { contractid } = useParams();

    const [internal, setInternal] = useState({
        contractId: contractid,
        contract_no: "",
        dateofcreation: "",
        duration: "",
        formofcontract: "",
        contractupload: "",
        employee: ""
        
    });

    useEffect(() => {
        InternalAPI.getInternalById(contractid).then((res) => {
            let pat = res.data;
            setInternal({
                contractId: pat.contractId,
                contract_no: pat.contract_no,
                dateofcreation: pat.dateofcreation,
                duration: pat.duration,
                formofcontract: pat.formofcontract,
                contractupload: pat.contractupload,
                employee: pat.employee


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
                                to={`/hrm/internals/update/${contractid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Internal Contract's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{internal.contractId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Contract No:</span>
                                    <span className="itemValue">{internal.contract_no}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Employee:</span>
                                    <span className="itemValue">{internal.employee}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Date Of Creation:</span>
                                    <span className="itemValue">{internal.dateofcreation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Duration:</span>
                                    <span className="itemValue">{internal.duration}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Form Of Contract:</span>
                                    <span className="itemValue">{internal.formofcontract}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Contract Upload:</span>
                                    <span className="itemValue">{internal.contractupload}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleInternal;
