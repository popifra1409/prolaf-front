import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParamRegistrationAPI from "../../../services/family/ParamRegistrationAPI";
import { Link } from "react-router-dom";


const SingleParamRegistration = () => {
    const { paramRegistrationid } = useParams();

    const [paramRegistration, setParamRegistration] = useState({
        paramRegistrationId: paramRegistrationid,
        member_choice: "",
        member: "",
        parameter: "",
        value: ""
        
    });

    useEffect(() => {
        ParamRegistrationAPI.getParamRegistrationById(paramRegistrationid).then((res) => {
            let pat = res.data;
            setParamRegistration({
                paramRegistrationId: pat.paramRegistrationId,
                member_choice: pat.member_choice,
                member: pat.member,
                parameter: pat.parameter,
                value: pat.value

            });

        }, [paramRegistrationid])
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
                                to={`/family/paramRegistrations/update/${paramRegistrationid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Parameter Registration's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{paramRegistration.paramRegistrationId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Member Choice:</span>
                                    <span className="itemValue">{paramRegistration.member_choice}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Member:</span>
                                    <span className="itemValue">{paramRegistration.member}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Parameter:</span>
                                    <span className="itemValue">{paramRegistration.parameter}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Value:</span>
                                    <span className="itemValue">{paramRegistration.value}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleParamRegistration;
