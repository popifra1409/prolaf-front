import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { externalColumns } from "../../../pages/hrm/external/externalTableSource";
import ExternalAPI from "../../../services/hrm/ExternalAPI";


const ExternalDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [externals, setExternals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ExternalAPI.getExternals().then((res) => {
      console.log(setExternals(res.data));
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

            <Link to={`/hrm/externals/${params.id}`} style={{ textDecoration: "none" }}>
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
        EXTERNAL MANAGEMENT
        <Link to="/hrm/externals/newexternal"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={externals}
        columns={externalColumns.concat(actionColumn)}
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

export default ExternalDatatable

