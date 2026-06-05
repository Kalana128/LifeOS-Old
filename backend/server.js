const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");
const workLogRoutes = require("./src/routes/workLogRoutes");
const checklistTemplateRoutes = require(
  "./src/routes/checklistTemplateRoutes"
);
const dailyChecklistRoutes = require(
  "./src/routes/dailyChecklistRoutes"
);

dotenv.config();

connectDB();

const app = express();

/*
=================================
MIDDLEWARE
=================================
*/

app.use(cors());

app.use(express.json());

/*
=================================
ROUTES
=================================
*/

app.use("/api/auth", authRoutes);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/worklogs",
  workLogRoutes
);

app.use(
  "/api/checklist-templates",
  checklistTemplateRoutes
);

app.use(
  "/api/daily-checklists",
  dailyChecklistRoutes
);

/*
=================================
HEALTH CHECK
=================================
*/

app.get("/", (req, res) => {
  res.send(
    "LifeOS Backend Running 🚀"
  );
});

/*
=================================
SERVER
=================================
*/

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});