import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LodgeAPI from "../../../services/family/LodgeAPI";
import { Link } from "react-router-dom";


const SingleLodge = () => {
    const { lodgeid } = useParams();

    const [lodge, setLodge] = useState({
        lodgeId: lodgeid,
        building: "",
        lodge_name: "",
        lodge_description: "",
        capacity: "",
        createDate: ""
        
    });

    useEffect(() => {
        LodgeAPI.getLodgeById(lodgeid).then((res) => {
            let pat = res.data;
            setLodge({
                lodgeId: pat.lodgeId,
                building: pat.building,
                lodge_name: pat.lodge_name,
                lodge_description: pat.lodge_description,
                capacity: pat.capacity,
                createDate: pat.createDate


            });

        }, [lodgeid])
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
                                to={`/hrm/lodges/update/${lodgeid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Lodge's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{lodge.lodgeId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Building:</span>
                                    <span className="itemValue">{lodge.building}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Lodge Name:</span>
                                    <span className="itemValue">{lodge.lodge_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Lodge Description:</span>
                                    <span className="itemValue">{lodge.lodge_description}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Capacity:</span>
                                    <span className="itemValue">{lodge.capacity}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Date Of Creation:</span>
                                    <span className="itemValue">{lodge.createDate}</span>
                                </div>
            
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleLodge;
