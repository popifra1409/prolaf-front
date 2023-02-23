import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DepartmentAPI from "../../services/departmentAPI";
import moment from "moment";

const Departement = () => {
  const [pageSize, setPageSize] = useState(5);
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

  const columns = [
    {
      field: "departmentId",
      headerName: "ID",
      width: 100,
      cellClassName: "name-column--cell",
    },
    { field: "dept_name", headerName: "Name", width: 170, editable: true },
    {
      field: "dept_description",
      headerName: "Description",
      width: 220,
      editable: true,
    },
    {
      field: "dept_number",
      headerName: "Phone Number",
      headerAlign: "left",
      align: "right",
      width: 100,
      editable: true,
    },
    {
      field: "dept_parent",
      headerName: "Parent",
      width: 170,
      cellClassName: "name-column--cell",
      type: "singleSelect",
      valueOptions: ({ row }) => {
        const options = [];
        departments?.map((department) => options.push(department.dept_name));
        return options;
      },
      editable: true,
    },
    {
      field: "createDate",
      headerName: "Created At",
      width: 170,
      renderCell: (params) =>
        moment(params.row.createDate).format("YYYY-MM-DD HH-MM-SS"),
    },
    {
      field: "actions",
      headerName: "Actions",
      /* type: actions, */
      sortable: false,
      renderCell: () => <button>Action</button>,
    },
  ];

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
            href="/hrm/formDepartment"
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
          checkboxSelection
          components={{
            LoadingOverlay: LoadingSkeleton,
            Toolbar: GridToolbar,
          }}
          loading={loading}
          getRowId={(rows) => rows.departmentId}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>
    </Box>
  );
};

export default Departement;
