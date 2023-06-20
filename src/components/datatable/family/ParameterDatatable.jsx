import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { parameterColumns } from "../../../pages/family/parameter/parameterTableSource";
import ParameterAPI from "../../../services/family/ParameterAPI";


const ParameterDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ParameterAPI.getParameters().then((res) => {
      console.log(setParameters(res.data));
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

            <Link to={`/family/parameters/${params.id}`} style={{ textDecoration: "none" }}>
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
        PARAMETER MANAGEMENT
        <Link to="/identification/parameters/newparameter"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={parameters}
        columns={parameterColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.parameterId}
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

export default ParameterDatatable

