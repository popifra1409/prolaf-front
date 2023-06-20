import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParameterAPI from "../../../services/family/ParameterAPI";
import { Link } from "react-router-dom";


const SingleParameter = () => {
    const { parameterid } = useParams();

    const [parameter, setParameter] = useState({
        parameterId: parameterid,
        name: "",
        unit: ""
        
    });

    useEffect(() => {
        ParameterAPI.getParameterById(parameterid).then((res) => {
            let pat = res.data;
            setParameter({
                parameterId: pat.parameterId,
                name: pat.name,
                unit: pat.unit

            });

        }, [parameterid])
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
                                to={`/family/parameters/update/${parameterid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Parameter's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{parameter.parameterId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Name:</span>
                                    <span className="itemValue">{parameter.name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Unit:</span>
                                    <span className="itemValue">{parameter.unit}</span>
                                </div>
                               
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleParameter;
