const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");


app.use(bodyParser.json());
app.use(cookieParser());

const dbUri = "mongodb://localhost:27017/Task_Tracking"; 
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Db is connected"))
.catch((err) => console.log("Database connection error:", err));


const port = 9000;

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});





// Routes
const authRoutes = require('./routers/authroutes');
const taskRoutes = require("./routers/taskroutes");
const categoryRoutes = require("./routers/categoryroutes");

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);
app.use(errorHandler);
