import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { employeeColumns } from "../../../pages/hrm/employee/employeeTableSource";
import EmployeeAPI from "../../../services/hrm/EmployeeAPI";


const EmployeeDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    EmployeeAPI.getEmployees().then((res) => {
      console.log(setEmployees(res.data));
    });
    setLoading(false);
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <Link to={`/hrm/employees/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
            >
              <button className="deleteButton"  > Delete </button>
            </div>
          </div>
        );
      },
    },
  ];


  return (

    <div className="datatable">
      <div className="datatableTitle">
        EMPLOYEE MANAGEMENT
        <Link to="/hrm/employees/newemployee"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={employees}
        columns={employeeColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.employeeId}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection
      />
    </div>
  )
}

export default EmployeeDatatable

