import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FowlAPI from "../../../services/family/FowlAPI";
import { Link } from "react-router-dom";


const SingleFowl = () => {
    const { memberid } = useParams();

    const [fowl, setFowl] = useState({
        memberId: memberid,
        family: "",
        lodge: "",
        member_name: "",
        birthdate: "",
        gender: "",
        mother: "",
        father: "",
        generation: "",
        colour: ""
        
    });

    useEffect(() => {
        FowlAPI.getFowlById(memberid).then((res) => {
            let pat = res.data;
            setFowl({
                memberId: pat.memberId,
                family: pat.family,
                lodge: pat.lodge,
                member_name: pat.member_name,
                birthdate: pat.birthdate,
                gender: pat.gender,
                mother: pat.mother,
                father: pat.father,
                generation: pat.generation,
                colour: pat.colour


            });

        }, [memberid])
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
                                to={`/family/fowls/update/${memberid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Fowl's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{fowl.memberId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Family:</span>
                                    <span className="itemValue">{fowl.family}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Lodge:</span>
                                    <span className="itemValue">{fowl.lodge}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Member Name:</span>
                                    <span className="itemValue">{fowl.member_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Birth Date:</span>
                                    <span className="itemValue">{fowl.birthdate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Gender:</span>
                                    <span className="itemValue">{fowl.gender}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Mother:</span>
                                    <span className="itemValue">{fowl.mother}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Father:</span>
                                    <span className="itemValue">{fowl.father}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Generation:</span>
                                    <span className="itemValue">{fowl.generation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Colour:</span>
                                    <span className="itemValue">{fowl.colour}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleFowl;
