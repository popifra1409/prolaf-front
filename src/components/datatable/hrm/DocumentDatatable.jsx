import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentColumns } from "../../../pages/hrm/document/documentTableSource";
import DocumentAPI from "../../../services/hrm/DocumentAPI";


const DocumentDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [document, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    DocumentAPI.getDocuments().then((res) => {
      console.log(setDocuments(res.data));
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

            <Link to={`/identification/documents/${params.id}`} style={{ textDecoration: "none" }}>
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
        DOCUMENT MANAGEMENT
        <Link to="/identification/documents/newdocument"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={document}
        columns={documentColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.documentId}
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

export default DocumentDatatable

