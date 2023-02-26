import http from "./configs/apiClient";

class EmployeeAPI {
  //list of employees
  getEmployees = async () => {
    return await http.get("hrm/employees/");
  };
}

export default EmployeeAPI;
