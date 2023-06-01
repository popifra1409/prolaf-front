import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupePatientColumns } from "../../../pages/identification/groupepatient/GroupePatientTableSource";
import GroupePatientAPI from "../../../services/identification/groupePatientAPI";


const GroupePatientDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [groupepatients, setGroupePatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GroupePatientAPI.getGroupePatients().then((res) => {
      setGroupePatients(res.data.data);
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

            <Link to={`/identification/patients/${params.id}`} style={{ textDecoration: "none" }}>
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
        GESTION DU PATIENT
        <Link to="/identification/patients/newpatient"  className="link">
          Nouveau
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={groupepatients}
        columns={groupePatientColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.id}
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

export default GroupePatientDatatable

