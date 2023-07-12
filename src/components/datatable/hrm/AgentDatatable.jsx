import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { clientColumns } from "../../../pages/hrm/client/clientTableSource";
import AgentAPI from "../../../services/hrm/AgentAPI";
import { agentColumns } from "../../../pages/hrm/agent/agentTableSource";


const AgentDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [agent, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AgentAPI.getAgents().then((res) => {
      console.log(setAgents(res.data));
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

            <Link to={`/hrm/agents/${params.id}`} style={{ textDecoration: "none" }}>
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
        AGENT MANAGEMENT
        <Link to="/hrm/agents/newagent"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={agent}
        columns={agentColumns.concat(actionColumn)}
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

export default AgentDatatable

