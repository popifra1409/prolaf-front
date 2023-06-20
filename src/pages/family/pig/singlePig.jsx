import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PigAPI from "../../../services/family/PigAPI";
import { Link } from "react-router-dom";


const SinglePig = () => {
    const { memberid } = useParams();

    const [pig, setPig] = useState({
        memberId: memberid,
        family: "",
        lodge: "",
        member_name: "",
        birthdate: "",
        gender: "",
        mother: "",
        father: "",
        generation: "",
        post_weaning: "",
        pre_magnification: "",
        magnification: ""
        
    });

    useEffect(() => {
        PigAPI.getPigById(memberid).then((res) => {
            let pat = res.data;
            setPig({
                memberId: pat.memberId,
                family: pat.family,
                lodge: pat.lodge,
                member_name: pat.member_name,
                birthdate: pat.birthdate,
                gender: pat.gender,
                mother: pat.mother,
                father: pat.father,
                generation: pat.generation,
                post_weaning: pat.post_weaning,
                pre_magnification: pat.pre_magnification,
                magnification: pat.magnification,

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
                        <h1 className="title">Pig's details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{pig.memberId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Family:</span>
                                    <span className="itemValue">{pig.family}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Lodge:</span>
                                    <span className="itemValue">{pig.lodge}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Member Name:</span>
                                    <span className="itemValue">{pig.member_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Birth Date:</span>
                                    <span className="itemValue">{pig.birthdate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Gender:</span>
                                    <span className="itemValue">{pig.gender}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Mother:</span>
                                    <span className="itemValue">{pig.mother}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Father:</span>
                                    <span className="itemValue">{pig.father}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Generation:</span>
                                    <span className="itemValue">{pig.generation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Post Weaning Date:</span>
                                    <span className="itemValue">{pig.post_weaning}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Pre Magnification Date:</span>
                                    <span className="itemValue">{pig.pre_magnification}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Magnification Date:</span>
                                    <span className="itemValue">{pig.magnification}</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SinglePig;
