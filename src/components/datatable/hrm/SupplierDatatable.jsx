import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supplierColumns } from "../../../pages/hrm/supplier/supplierTableSource";
import SupplierAPI from "../../../services/hrm/SupplierAPI";


const SupplierDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [supplier, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    SupplierAPI.getSuppliers().then((res) => {
      console.log(setSuppliers(res.data));
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

            <Link to={`/hrm/suppliers/${params.id}`} style={{ textDecoration: "none" }}>
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
        SUPPLIER MANAGEMENT
        <Link to="/hrm/suppliers/newsupplier"  className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={supplier}
        columns={supplierColumns.concat(actionColumn)}
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

export default SupplierDatatable

