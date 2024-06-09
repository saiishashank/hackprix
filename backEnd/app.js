const morgan = require("morgan");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const doctorRouter = require("./routes/doctorRouter");
const userRouter = require("./routes/userRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
module.exports = app;
