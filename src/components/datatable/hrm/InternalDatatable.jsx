import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { internalColumns } from "../../../pages/hrm/internal/internalTableSource";
import InternalAPI from "../../../services/hrm/InternalAPI";


const InternalDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [internal, setInternals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    InternalAPI.getInternals().then((res) => {
      console.log(setInternals(res.data));
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

            <Link to={`/hrm/internals/${params.id}`} style={{ textDecoration: "none" }}>
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
        INTERNAL CONTRACT MANAGEMENT
        <Link to="/identification/internals/newinternal"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={internal}
        columns={internalColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.contractId}
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

export default InternalDatatable

