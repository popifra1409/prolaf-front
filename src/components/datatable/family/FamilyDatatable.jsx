import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { familyColumns } from "../../../pages/family/family/familyTableSource";
import FamilyAPI from "../../../services/family/FamilyAPI";


const FamilyDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [family, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    FamilyAPI.getFamilies().then((res) => {
      console.log(setFamilies(res.data));
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

            <Link to={`/family/families/${params.id}`} style={{ textDecoration: "none" }}>
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
        FAMILY MANAGEMENT
        <Link to="/identification/families/newFamily"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={family}
        columns={familyColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.familyId}
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

export default FamilyDatatable

