import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentAPI from "../../../services/hrm/DocumentAPI";
import { Link } from "react-router-dom";


const SingleDocument = () => {
    const { documentid } = useParams();

    const [document, setDocument] = useState({
        documentId: documentid,
        documentref: "",
        employee: "",
        numCni: "",
        cniupload: "",
        diploma: "",
        diplomaupload: "",
        mariagecertificate: ""
        
    });

    useEffect(() => {
        DocumentAPI.getDocumentById(documentid).then((res) => {
            let pat = res.data;
            setDocument({
                documentId: pat.documentId,
                documentref: pat.documentref,
                employee: pat.employee,
                numCni: pat.numCni,
                cniupload: pat.cniupload,
                diploma: pat.diploma,
                diplomaupload: pat.diplomaupload,
                mariagecertificate: pat.mariagecertificate
                
            });

        }, [documentid])
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
                                to={`/hrm/documents/update/${documentid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Document's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{document.documentId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Document Reference:</span>
                                    <span className="itemValue">{document.documentref}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Employee:</span>
                                    <span className="itemValue">{document.employee}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">ID Card Number:</span>
                                    <span className="itemValue">{document.numCni}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">ID Card Upload:</span>
                                    <span className="itemValue">{document.cniupload}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Diploma:</span>
                                    <span className="itemValue">{document.diploma}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Diploma Upload:</span>
                                    <span className="itemValue">{document.diplomaupload}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Mariage Certificate:</span>
                                    <span className="itemValue">{document.mariagecertificate}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleDocument;
