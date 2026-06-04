const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");

const attendanceRoutes = require(
  "./src/routes/attendanceRoutes"
);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.get("/", (req, res) => {
  res.send("LifeOS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});