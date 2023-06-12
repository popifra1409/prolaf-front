import axios from "axios";

const Department_API_BASE_URL = "http://localhost:8000/hrm/departments/";

class DepartmentAPI {
    //list all departments
    getDepartments = async() =>{
        return await axios.get(Department_API_BASE_URL);
    };

    //get a single department
    getDepartmentById = async (departmentId) =>{
        return await  axios.get(Department_API_BASE_URL + departmentId);
    };

    //create a department
    addDepartment = async(department) =>{
        return await axios.post(Department_API_BASE_URL + "save",  department);
    };
}

export default new DepartmentAPI()