import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuildingAPI from "../../../services/family/BuildingAPI";
import { Link } from "react-router-dom";


const SingleBuilding = () => {
    const { buildingid } = useParams();

    const [building, setBuilding] = useState({
        buildingId: buildingid,
        building_name: "",
        building_description: "",
        createDate: ""

    });

    useEffect(() => {
        BuildingAPI.getBuildingById(buildingid).then((res) => {
            let pat = res.data;
            setBuilding({
                buildingId: pat.buildingId,
                building_name: pat.building_name,
                building_description: pat.building_description,
                createDate: pat.createDate

            });

        }, [buildingid])
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
                                to={`/hrm/buildings/update/${buildingid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Building's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{building.buildingId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Building Name:</span>
                                    <span className="itemValue">{building.building_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Building Description:</span>
                                    <span className="itemValue">{building.building_description}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Created Date:</span>
                                    <span className="itemValue">{building.createDate}</span>
                                </div>
                                
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleBuilding;
