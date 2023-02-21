import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DepartmentAPI from "../../services/departmentAPI";

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(10)].map((_, index) => (
      <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} key={index} />
    ))}
  </Box>
);

const columns = [
  {
    field: "departmentId",
    headerName: "ID",
    flex: 0.3,
    cellClassName: "name-column--cell",
  },
  { field: "dept_name", headerName: "Name", flex: 0.5 },
  { field: "dept_description", headerName: "Description", flex: 0.5 },
  {
    field: "dept_number",
    headerName: "Phone Number",
    headerAlign: "left",
    align: "right",
  },
  {
    field: "dept_parent",
    headerName: "Parent",
    flex: 0.3,
    cellClassName: "name-column--cell",
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: () => <button>Action</button>,
  },
];

const Departement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [departments, setDepartments] = useState([]);
  const api = new DepartmentAPI();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getDepartments().then((res) => {
      setDepartments(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="DEPARTMENT" subtitle="Managing the departments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Button
            href="/formDepartment"
            color="success"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add new
          </Button>
        </Box>
        <DataGrid
          rows={departments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          components={{
            LoadingOverlay: LoadingSkeleton,
            Toolbar: GridToolbar,
          }}
          loading={loading}
          getRowId={(rows) => rows.departmentId}
        />
      </Box>
    </Box>
  );
};

export default Departement;
