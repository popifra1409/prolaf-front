import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { pigColumns } from "../../../pages/family/pig/pigTableSource";
import PigAPI from "../../../services/family/PigAPI";


const PigDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [pig, setPigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    PigAPI.getPigs().then((res) => {
      console.log(setPigs(res.data));
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

            <Link to={`/family/pigs/${params.id}`} style={{ textDecoration: "none" }}>
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
        PIG MANAGEMENT
        <Link to="/family/pigs/newPig"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={pig}
        columns={pigColumns.concat(actionColumn)}
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

export default PigDatatable

