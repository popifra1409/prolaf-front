import axios from "axios";

const Employee_API_BASE_URL = "http://localhost:8000/hrm/employees/";

class EmployeeAPI {
    //list all employees
    getEmployees = async() =>{
        return await axios.get(Employee_API_BASE_URL);
    };

    //get a single employee
    getEmployeeById = async (employeeId) =>{
        return await  axios.get(Employee_API_BASE_URL + employeeId + "/");
    };

    //create a employee
    addEmployee = async(employee, supid, departmentid) =>{
        return await axios.post(Employee_API_BASE_URL + supid + "/" + departmentid + "/create/", employee );
    };
}

export default new EmployeeAPI()