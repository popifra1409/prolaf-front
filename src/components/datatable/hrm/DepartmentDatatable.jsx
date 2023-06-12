import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { departmentColumns } from "../../../pages/hrm/department/departmentTableSource";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";


const DepartmentDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    DepartmentAPI.getDepartments().then((res) => {
      console.log(setDepartments(res.data));
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

            <Link to={`/identification/departments/${params.id}`} style={{ textDecoration: "none" }}>
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
        DEPARTMENT MANAGEMENT
        <Link to="/identification/departments/newdepartment"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={departments}
        columns={departmentColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.departmentId}
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

export default DepartmentDatatable
