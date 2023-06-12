import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { lodgeRegistrationColumns } from "../../../pages/family/lodgeRegistration/lodgeRegistrationTableSource";
import LodgeRegistrationAPI from "../../../services/family/LodgeRegistrationAPI";


const LodgeRegistrationDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [lodgeRegistrations, setLodgeRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    LodgeRegistrationAPI.getLodgeRegistrations().then((res) => {
      console.log(setLodgeRegistrations(res.data));
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

            <Link to={`/identification/lodgeRegistrations/${params.id}`} style={{ textDecoration: "none" }}>
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
        LODGE REGISTRATION MANAGEMENT
        <Link to="/identification/lodgeRegistrations/newlodgeRegistration"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={lodgeRegistrations}
        columns={lodgeRegistrationColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.lodgeRegistrationId}
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

export default LodgeRegistrationDatatable

