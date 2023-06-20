import "../../single/single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";
import { Link } from "react-router-dom";


const SingleEmployee = () => {
    const { employeeid } = useParams();

    const [employee, setEmployee] = useState({
        employeeId: employeeid,
        employeeMat: "",
        department: "",
        supervisor: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        birthplace: "",
        gender: "",
        status: "",
        email: "",
        address: "",
        phone: "",
        photo: "",
        function: "",
        hiringdate: "",
        seniority: "",
        salary: "",
        whatsappnumber: "",
        facebooklink: "",
        resourcecontact: "",
        resourcename: "",
        isChiefOfDepartment: "",
        typeofemployee: ""

        
    });

    useEffect(() => {
        EmployeeAPI.getEmployeeById(employeeid).then((res) => {
            let pat = res.data;
            setEmployee({
                employeeId: pat.employeeId,
                employeeMat: pat.employeeMat,
                department: pat.department,
                supervisor: pat.supervisor,
                firstname: pat.firstname,
                lastname: pat.lastname,
                birthdate: pat.birthdate,
                birthplace: pat.birthplace,
                gender: pat.gender,
                status: pat.status,
                email: pat.email,
                address: pat.address,
                phone: pat.phone,
                photo: pat.photo,
                function: pat.function,
                hiringdate: pat.hiringdate,
                seniority: pat.seniority,
                salary: pat.salary,
                whatsappnumber: pat.whatsappnumber,
                facebooklink: pat.facebooklink,
                resourcecontact: pat.resourcecontact,
                resourcename: pat.resourcename,
                isChiefOfDepartment: pat.isChiefOfDepartment,
                typeofemployee: pat.typeofemployee
                
                
            });

        }, [employeeid])
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
                                to={`/hrm/employees/update/${employeeid}/`}
                                style={{ textDecoration: "none" }}
                            >
                                Edit
                            </Link>
                        </div>
                        <h1 className="title">Employee details:</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{employee.employeeId}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Employee Mat:</span>
                                    <span className="itemValue">{employee.employeeMat}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Department:</span>
                                    <span className="itemValue">{employee.department}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Supervisor:</span>
                                    <span className="itemValue">{employee.supervisor}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">First Name:</span>
                                    <span className="itemValue">{employee.firstname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Last Name:</span>
                                    <span className="itemValue">{employee.lastname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Birthdate:</span>
                                    <span className="itemValue">{employee.birthdate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Birthplace:</span>
                                    <span className="itemValue">{employee.birthplace}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Gender:</span>
                                    <span className="itemValue">{employee.gender}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Status:</span>
                                    <span className="itemValue">{employee.status}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{employee.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">{employee.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{employee.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Photo:</span>
                                    <span className="itemValue">{employee.photo}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Function:</span>
                                    <span className="itemValue">{employee.function}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Hiring Date:</span>
                                    <span className="itemValue">{employee.hiringdate}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Seniority:</span>
                                    <span className="itemValue">{employee.seniority}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Salary:</span>
                                    <span className="itemValue">{employee.salary}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Whatsapp Number:</span>
                                    <span className="itemValue">{employee.whatsappnumber}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Facebook Link:</span>
                                    <span className="itemValue">{employee.facebooklink}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Resource Contact:</span>
                                    <span className="itemValue">{employee.resourcecontact}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Resource Name:</span>
                                    <span className="itemValue">{employee.resourcename}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">IsChief Of Department:</span>
                                    <span className="itemValue">{employee.isChiefOfDepartment}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Type of Employee:</span>
                                    <span className="itemValue">{employee.typeofemployee}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleEmployee;
