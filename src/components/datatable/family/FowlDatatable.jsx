import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fowlColumns } from "../../../pages/family/fowl/fowlTableSource";
import FowlAPI from "../../../services/family/FowlAPI";


const FowlDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [fowl, setFowls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    FowlAPI.getFowls().then((res) => {
      console.log(setFowls(res.data));
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

            <Link to={`/family/fowls/${params.id}`} style={{ textDecoration: "none" }}>
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
        FOWL MANAGEMENT
        <Link to="/identification/fowls/newFowl"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={fowl}
        columns={fowlColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.memberId}
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

export default FowlDatatable

