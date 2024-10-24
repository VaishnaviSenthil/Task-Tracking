import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, MenuItem, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { isMobile } from "react-device-detect";

const validationSchema = yup.object({
  taskTitle: yup.string("Enter a task title").required("Title is required"),

  taskDescription: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  dueDate: yup
    .date("Enter a Deadline")
    .min(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      "Deadline must be greater than the current date"
    ),
  taskStatus: yup.string("Enter a Status").required("Status is required"),
  Category: yup.string("Enter a Category").required("Category is required"),
});
const Status = [
    "Pending",
    "In-Progress",
    "Completed"
  ];

const AdmEditTasks = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [taskDetail, setTaskDetail] = useState(null);
  const [load, setLoad] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCategories();
  }, []);



  const formik = useFormik({
    initialValues: {
      taskTitle: "",
      taskDescription: "",
      dueDate: "",
      taskStatus: "",
      Category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Update the task on the server
        console.log("id", `${id}`);
       const response = await axios.put(`/api/task/update/${id}`, values);
       console.log("response", response.data);
        toast.success("Task updated successfully!");

        // Navigate back after successful update
        navigate(-1);
      } catch (error) {
        toast.error("Error updating task. Please try again.");
        console.error("Error updating task:", error);
      }
},
  });

  // Inside useEffect, after fetching the data
  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const response = await axios.get(`/api/task/showsingletask/${id}`);
        console.log("response", response.data);
        setTaskDetail(response.data.task);
        if (response.data.task) {
          formik.setValues({
            taskTitle: response.data.task.taskTitle || "",
            taskDescription: response.data.task.taskDescription || "",
            dueDate: response.data.task.dueDate || "",
            taskStatus: response.data.task.taskStatus || "",
            Category: response.data.task.Category || "",
          });
          setLoad(false);
        }
      } catch (error) {
        console.error("Error fetching task detail:", error);
      }
    };

    fetchTaskDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate("/tasks");
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "86vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "600px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{
                marginLeft: isMobile ? "-200px" : "500px",
              }}
            >
              <ArrowBackIcon />
            </Button>
            <Typography variant="h5" component="h2" sx={{ pb: 1 }}>
              Edit a Task
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="taskTitle"
                  label="Title"
                  name="taskTitle"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  inputProps={{ style: { height: "10px" } }}
                  value={formik.values.taskTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taskTitle && Boolean(formik.errors.taskTitle)
                  }
                  helperText={
                    formik.touched.taskTitle && formik.errors.taskTitle
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: "225px" }}
                  id="dueDate"
                  label="DueDate"
                  name="dueDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ style: { height: "10px" } }}
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dueDate && Boolean(formik.errors.dueDate)
                  }
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="Category"
                  label="Category"
                  name="Category"
                  sx={{ width: "225px", "& select": { height: "10px" } }}
                  select
                  placeholder="Category"
                  value={formik.values.Category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.Category && Boolean(formik.errors.Category)
                  }
                  helperText={formik.touched.Category && formik.errors.Category}
                >
                  <MenuItem key={""} value={""}></MenuItem>
                  {categories &&
                    categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.category}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  sx={{ width: "225px", "& select": { height: "10px" } }} // Adjust the height as needed
                  variant="outlined"
                  name="taskStatus"
                  id="taskStatus"
                  select
                  label="Status"
                  value={formik.values.taskStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taskStatus &&
                    Boolean(formik.errors.taskStatus)
                  }
                  helperText={
                    formik.touched.taskStatus && formik.errors.taskStatus
                  }
                >
                  {Status.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  id="taskDescription"
                  name="taskDescription"
                  label="Description"
                  type="text"
                  inputProps={{ style: { height: "10px" } }}
                  value={formik.values.taskDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taskDescription &&
                    Boolean(formik.errors.taskDescription)
                  }
                  helperText={
                    formik.touched.taskDescription &&
                    formik.errors.taskDescription
                  }
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Save Edited Task
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AdmEditTasks;
