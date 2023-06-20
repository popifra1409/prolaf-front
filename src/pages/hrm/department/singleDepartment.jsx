import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";
import { Link } from "react-router-dom";


const SingleDepartment = () => {
    const { departmentid } = useParams();

    const [department, setDepartment] = useState({
        departmentId: departmentid,
        dept_parent: "",
        dept_name: "",
        dept_description: "",
        dept_number: ""
        
    });

    useEffect(() => {
        DepartmentAPI.getDepartmentById(departmentid).then((res) => {
            let pat = res.data;
            setDepartment({
                departmentId: pat.departmentId,
                dept_parent: pat.dept_parent,
                dept_name: pat.dept_name,
                dept_description: pat.dept_description,
                dept_number: pat.dept_number
                
            });

        }, [departmentid])
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
                                to={`/hrm/departments/update/${departmentid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Department details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{department.departmentId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Department Parent:</span>
                                    <span className="itemValue">{department.dept_parent}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Department Name:</span>
                                    <span className="itemValue">{department.dept_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Description:</span>
                                    <span className="itemValue">{department.dept_description}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Department Number:</span>
                                    <span className="itemValue">{department.dept_number}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleDepartment;
