import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";
import { styled } from "@mui/system";


const Admtasks = () => {


  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this task?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTaskById(id),
          style: { backgroundColor: "red", color: "white" },
        },
        {
          label: "No",
          onClick: () => {},
          style: { backgroundColor: "green", color: "white" },
        },
      ],
    });
  };


   const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/task/showAll");
        console.log("response.data.tasks", response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        
      }
    };

    fetchTasks();
  }, []);

    
    let data = [];
    data = tasks !== undefined && tasks.length > 0 ? tasks : [];



  //delete job by Id
  const deleteTaskById = async (id) => {
    try {
      const response = await axios.delete(`/api/task/delete/${id}`);
      if (response.data) {
        toast.success("Task deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response.data.error);
    }
  };



    console.log("Tasks", tasks);




  const CustomDataGrid = styled(DataGridPro)`
    .header-bold {
      font-weight: bold;
      font-size: 16px; // Adjust the font size as needed
    }
    .cell-bold {
      font-size: 14px; // Adjust the font size as needed
    }
  `;

  const columns = [
    {
      field: "taskTitle",
      headerName: "Title",
      width: 200,
      // editable: true,
      headerClassName: "header-bold",
      cellClassName: "cell-bold",
    },
    {
      field: "taskDescription",
      headerName: "Description",
      width: 300,
      // editable: true,
      headerClassName: "header-bold",
      cellClassName: "cell-bold",
    },

    {
      field: "dueDate",
      headerName: "DueDate",
      width: 150,
      headerClassName: "header-bold", // Add this line
      cellClassName: "cell-bold",
      renderCell: (params) => moment(params.row.dueDate).format("YYYY-MM-DD"),
    },
    {
      field: "taskStatus",
      headerName: "Status",
      width: 200,
      headerClassName: "header-bold", // Add this line
      cellClassName: "cell-bold",
    },
    {
      field: "Category",
      headerName: "Category",
      width: 200,
      headerClassName: "header-bold", 
      valueGetter: (data) => data.category,
      cellClassName: "cell-bold",
    },
    {
      field: "Actions",
      width: 150,
      headerAlign: "center",
      headerClassName: "header-bold",
      // cellClassName: 'cell-bold',
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/tasks/${values.row._id}`}
            >
              <EditTwoToneIcon />
            </Link>
          </Button>
          <Button
            onClick={(e) => confirmDelete(values.row._id)}
            variant="contained"
            color="error"
          >
            <DeleteTwoToneIcon />
          </Button>
        </Box>
      ),
    },
  ];
  

  



  return (
    <>
      {
        <Box>
          <div style={{ marginBottom: 20, position: "relative" }}></div>

          <Box sx={{ pb: 1, display: "flex", justifyContent: "right" }}>
            {tasks.length > 0 && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                  sx={{ mr: 3 }}
                >
                  <Link
                    to="/category/create"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create Category
                  </Link>
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginRight: 2.5 }}
                  startIcon={<AddIcon />}
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/task/create"
                  >
                    Create Task
                  </Link>
                </Button>
              </>
            )}
          </Box>
          <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
            <Box sx={{ height: 400, width: "100%" }}>
              {tasks.length > 0 ? (
                <CustomDataGrid
                  getRowId={(row) => row._id}
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                  pagination
                  slots={{ toolbar: GridToolbar }}
                />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <Card sx={{ maxWidth: 600, textAlign: "center", p: 3 }}>
                    <CardContent>
                      <Typography variant="h4" component="div" gutterBottom>
                        Welcome!
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        We're glad to have you here. Get started by creating
                        your first category and then task.
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<AddIcon />}
                          sx={{ mr: 3 }}
                        >
                          <Link
                            to="/category/create"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Create Category
                          </Link>
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<AddIcon />}
                        >
                          <Link
                            to="/task/create"
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Create Task
                          </Link>
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      }
    </>
  );
};
export default Admtasks;
