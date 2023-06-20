import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { buildingColumns } from "../../../pages/family/building/buildingTableSource";
import BuildingAPI from "../../../services/family/BuildingAPI";


const BuildingDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [building, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    BuildingAPI.getBuildings().then((res) => {
      console.log(setBuildings(res.data));
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

            <Link to={`/family/buildings/${params.id}`} style={{ textDecoration: "none" }}>
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
        BUILDING MANAGEMENT
        <Link to="/identification/buildings/newbuilding"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={building}
        columns={buildingColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.buildingId}
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

export default BuildingDatatable

