const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  checkIn,
  checkOut,
  getAttendanceList,
} = require(
  "../controllers/attendanceController"
);

const router = express.Router();

router.post(
  "/check-in",
  authMiddleware,
  checkIn
);

router.post(
  "/check-out",
  authMiddleware,
  checkOut
);

router.get(
  "/",
  authMiddleware,
  getAttendanceList
);

module.exports = router;