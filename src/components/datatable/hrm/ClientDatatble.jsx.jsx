import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { clientColumns } from "../../../pages/hrm/client/clientTableSource";
import ClientAPI from "../../../services/hrm/ClientAPI";


const ClientDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [client, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    ClientAPI.getClients().then((res) => {
      console.log(setClients(res.data));
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

            <Link to={`/hrm/clients/${params.id}`} style={{ textDecoration: "none" }}>
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
        CLIENT MANAGEMENT
        <Link to="/hrm/clients/newclient"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={client}
        columns={clientColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.agentId}
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

export default ClientDatatable

