import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { lodgeColumns } from "../../../pages/family/lodge/lodgeTableSource";
import LodgeAPI from "../../../services/family/LodgeAPI";


const LodgeDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [lodge, setLodges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    LodgeAPI.getLodges().then((res) => {
      console.log(setLodges(res.data));
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

            <Link to={`/identification/lodges/${params.id}`} style={{ textDecoration: "none" }}>
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
        LODGE MANAGEMENT
        <Link to="/identification/lodges/newLodge"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={lodge}
        columns={lodgeColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.lodgeId}
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

export default LodgeDatatable

