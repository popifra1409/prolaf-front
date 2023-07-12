import "../../datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { departmentColumns } from "../../../pages/hrm/department/departmentTableSource";
import DepartmentAPI from "../../../services/hrm/DepartmentAPI";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const DepartmentDatatable = () => {
  const [pageSize, setPageSize] = useState(10);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  let Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    DepartmentAPI.getDepartments().then((res) => {
      setDepartments(res.data);
      setLoading(false);
    });
  }, []);

  const deleteDepartment = async (departmentId) => {
    try {
      const response = await DepartmentAPI.deleteDepartment(departmentId);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred.");
    }
  };

  const DeleteConfirmation = ({ onDelete, params }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const formik = useFormik({
      initialValues: {},
      onSubmit: () => {
        onDelete();
        handleClose();
      },
    });

    return (
      <>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the data? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => onDelete(params.id)}
              variant="contained"
              color="secondary"
            >
               Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/hrm/departments/${params.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <DeleteConfirmation onDelete={handleDelete} params={params} />
          </div>
        );
      },
    },
  ];


    const handleDelete = async (departmentId) => {
      try {
        await deleteDepartment(departmentId);
        DepartmentAPI.getDepartments().then((res) => {
          setDepartments(res.data);
        });
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred.");
      }
    };
    

  return (
    <div className="datatable">
      <div className="datatableTitle">
        DEPARTMENT MANAGEMENT
        <Link to="/hrm/departments/newdepartment" className="link">
          NEW
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={departments}
        columns={departmentColumns.concat(actionColumn)}
        loading={loading}
        getRowId={(rows) => rows.departmentId}
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

export default DepartmentDatatable

