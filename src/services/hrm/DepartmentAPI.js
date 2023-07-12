import axios from "axios";


const Department_API_BASE_URL = "http://localhost:8000/hrm/departments/";

class DepartmentAPI {
    //list all departments
    getDepartments = async() =>{
        return await axios.get(Department_API_BASE_URL);
    };

    //get a single department
    getDepartmentById = async (departmentId) =>{
        return await  axios.get(Department_API_BASE_URL + departmentId + "/" );
    };

    //create a department
    addDepartment = async(department,parentid) =>{
        return await axios.post(Department_API_BASE_URL + parentid + "/create/", department );
    };


    //update a department
    updateDepartment = async(department, parentid) =>{
        return await axios.put(Department_API_BASE_URL + parentid + "/update/", department );
    };


    //delete a department
    deleteDepartment = async( departmentId) =>{
        return await axios.delete(Department_API_BASE_URL + departmentId + "/delete/" );
    };
}

export default new DepartmentAPI()