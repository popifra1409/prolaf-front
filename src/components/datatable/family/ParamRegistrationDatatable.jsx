import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { paramRegistrationColumns } from "../../../pages/family/paramRegistration/paramRegistrationTableSource";
import ParamRegistrationAPI from "../../../services/family/ParamRegistrationAPI";


const ParamRegistrationDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [paramRegistrations, setParamRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ParamRegistrationAPI.getParamRegistrations().then((res) => {
      console.log(setParamRegistrations(res.data));
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

            <Link to={`/identification/paramRegistration/${params.id}`} style={{ textDecoration: "none" }}>
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
        PARAMETER REGISTRATION MANAGEMENT
        <Link to="/identification/paramRegistrations/newparamRegistration"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={paramRegistrations}
        columns={paramRegistrationColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.paramRegistrationId}
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

export default ParamRegistrationDatatable

