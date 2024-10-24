import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  category: yup.string("Enter a Category").required("Category is required"),
});

const CreateCategory = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
       
        const response = await axios.post("/api/categories", values);
        console.log("Category Created successfully", response.data);

        toast.success("Category Created successfully");

        actions.resetForm();

        navigate("/tasks");
      } catch (error) {

        if (error.response && error.response.status === 400) {
          toast.error("error");
        } else {
          // Handle other errors
          toast.error("Something went wrong. Please try again.");
          console.error("Error during login:", error);
        }
      }

      actions.resetForm();
      navigate("/tasks");
    },
  });

  const handleGoBack = () => {
    navigate("/tasks");
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{ marginRight: 40 }}
            >
              <ArrowBackIcon />
            </Button>
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Create a Category
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              id="category"
              label="category"
              name="category"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="category name"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.category && Boolean(formik.errors.category)
              }
              helperText={
                formik.touched.category && formik.errors.category
              }
            />

            <Button width="100px" variant="contained" type="submit">
              Create category
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateCategory;
