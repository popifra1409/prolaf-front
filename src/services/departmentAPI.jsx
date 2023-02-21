import http from "./configs/apiClient";

class DepartmentAPI {
  //list of departemts
  getDepartments = async () => {
    return await http.get("hrm/departments/");
  };
}

export default DepartmentAPI;
