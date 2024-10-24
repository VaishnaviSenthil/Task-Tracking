import "./App.css";
import Login from "./page/Login";
import Tasks from "./page/Tasks";
import  TaskCreate from "./page/TaskCreate";
import CreateCategory from "./page/CreateCategory";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Register from "./page/Register";
import EditTasks from "./page/EditTask";
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/create"
              element={
                <ProtectedRoute>
                  <TaskCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category/create"
              element={
                <ProtectedRoute>
                  <CreateCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit/tasks/:id"
              element={
                <ProtectedRoute>
                  <EditTasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
