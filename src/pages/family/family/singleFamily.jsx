import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FamilyAPI from "../../../services/family/FamilyAPI";
import { Link } from "react-router-dom";


const SingleFamily = () => {
    const { familyid } = useParams();

    const [family, setFamily] = useState({
        familyId: familyid,
        building: "",
        family_name: "",
        family_description: ""
        
    });

    useEffect(() => {
        FamilyAPI.getFamilyById(familyid).then((res) => {
            let pat = res.data;
            setFamily({
                familyId: pat.familyId,
                building: pat.building,
                family_name: pat.family_name,
                family_description: pat.family_description

            });

        }, [familyid])
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
                                to={`/family/families/update/${familyid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Family's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{family.familyId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Building:</span>
                                    <span className="itemValue">{family.building}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Family Name:</span>
                                    <span className="itemValue">{family.family_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Family Description:</span>
                                    <span className="itemValue">{family.family_description}</span>
                                </div>
                                
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleFamily;
