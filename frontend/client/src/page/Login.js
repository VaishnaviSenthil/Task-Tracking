import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { userSiginAction } from "../redux/actions/userAction";
import { useNavigate, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LogIn = () => {
 
  const navigate = useNavigate();
//   const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post("/api/login", values);
        console.log(response.data); 
        
        
        localStorage.setItem("token", response.data.token); 
        toast.success("Logged in successfully"); 
        navigate("/tasks"); 
      } catch (error) {
        console.error("Error during login:", error); 
        if (error.response && error.response.status === 401) {
          toast.error("Invalid email or password."); 
        } else {
          toast.error("Login failed. Please try again."); 
        }
      } finally {
        actions.resetForm(); 
      }
    }
  });


  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockOpenIcon sx={{ color: "white" }} />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
                width: "300px",
              }}
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
                width: "300px",
              }}
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1, // Space between the items
                flexDirection: "row",
                marginTop: 1,
              }}
            >
              <Button
                variant="contained"
                sx={{ marginBottom: 1 }}
                onClick={formik.handleSubmit}
              >
                Log In
              </Button>
              <Box>
                New User? <Link to="/register">Register</Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default LogIn;
