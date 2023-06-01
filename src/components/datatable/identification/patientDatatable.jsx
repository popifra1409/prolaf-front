import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { patientColumns } from "../../../pages/identification/patient/PatientTableSource";
import PatientAPI from "../../../services/identification/patientAPI";


const PatientDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    PatientAPI.getPatients().then((res) => {
      setPatients(res.data.data);
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
        rows={patients}
        columns={patientColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.patientId}
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

export default PatientDatatable

