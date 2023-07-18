// PopupBox.js
import "../../components/datatable/datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { postweaningColumns } from "../../pages/family/pig/pigTableSource";
import PigAPI from "../../services/family/PigAPI";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const PopupBox = () => {

          const [pageSize, setPageSize] = useState(10);
          const [pig, setPigs] = useState([]);
          const [loading, setLoading] = useState(true);

          useEffect(() => {
            setLoading(true);
            PigAPI.getPostweaning().then((res) => {
              console.log(setPigs(res.data));
            });
            setLoading(false);
          }, []);

          const [open, setOpen] = useState(false);
      
          const handleOpen = () => {
            setOpen(true);
          };
      
          const handleClose = () => {
            setOpen(false);
          };
      
          const actionColumn = [
            {
              field: "action",
              headerName: "ACTIONS",
              width: 150,
              renderCell: (params) => {
                return (
                  <Button variant="contained" color="secondary">
                   Done
                </Button>
                 );
              },
            },
         ];
        
          return (
            <>
            <NotificationsNoneOutlinedIcon onClick={handleOpen} className="icon" /> 
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Notifications</DialogTitle>
                <DialogContent>
                <div className="datatable">
                  <div className="datatableTitle">
                    POST-WEANING ALERT
                  </div>
                  <DataGrid
                    className="datagrid"
                    rows={pig}
                    columns={postweaningColumns.concat(actionColumn)}
                    loading={loading}
                    getRowId={(rows) => rows.memberId}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                    checkboxSelection
                  />
                </div>
                </DialogContent>
                <DialogActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                   Close
                </Button>
                </DialogActions>
              </Dialog>

              </>
          )
        }

export default PopupBox;





    

  /* const actionColumn = [
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
    }; */
