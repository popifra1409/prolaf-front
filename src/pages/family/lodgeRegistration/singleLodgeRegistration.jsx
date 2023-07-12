import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LodgeRegistrationAPI from "../../../services/family/LodgeRegistrationAPI";
import { Link } from "react-router-dom";


const SingleLodgeRegistration = () => {
    const { lodgeRegistrationid } = useParams();

    const [lodgeRegistration, setLodgeRegistration] = useState({
        lodgeRegistrationId: lodgeRegistrationid,
        lodge: "",
        enteryDate: "",
        enteryReason: "",
        weight: "",
        isFinSejour: "",
        leavingDate: "",
        leavingReason: "",
        duration: ""
        
    });

    useEffect(() => {
        LodgeRegistrationAPI.getLodgeRegistrationById(lodgeRegistrationid).then((res) => {
            let pat = res.data;
            setLodgeRegistration({
                lodgeRegistrationId: pat.lodgeRegistrationId,
                lodge: pat.lodge,
                enteryDate: pat.enteryDate,
                enteryReason: pat.enteryReason,
                weight: pat.weight,
                isFinSejour: pat.isFinSejour,
                leavingDate: pat.leavingDate,
                leavingReason: pat.leavingReason,
                duration: pat.duration

            });

        }, [lodgeRegistrationid])
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
                                to={`/family/lodgeRegistrations/update/${lodgeRegistrationid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Lodge Registration's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{lodgeRegistration.lodgeRegistrationId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Lodge:</span>
                                    <span className="itemValue">{lodgeRegistration.lodge}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Entery Date:</span>
                                    <span className="itemValue">{lodgeRegistration.enteryDate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Entery Reason:</span>
                                    <span className="itemValue">{lodgeRegistration.enteryReason}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Weight:</span>
                                    <span className="itemValue">{lodgeRegistration.weight}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Is Fin Sejour:</span>
                                    <span className="itemValue">{lodgeRegistration.isFinSejour}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Leaving Date:</span>
                                    <span className="itemValue">{lodgeRegistration.leavingDate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Leaving Reason:</span>
                                    <span className="itemValue">{lodgeRegistration.leavingReason}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Duration:</span>
                                    <span className="itemValue">{lodgeRegistration.duration}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleLodgeRegistration;
