const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createWorkLog,
  getWorkLogs,
  updateWorkLog,
  deleteWorkLog,
} = require(
  "../controllers/workLogController"
);

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createWorkLog
);

router.get(
  "/",
  authMiddleware,
  getWorkLogs
);

router.put(
  "/:id",
  authMiddleware,
  updateWorkLog
);

router.delete(
  "/:id",
  authMiddleware,
  deleteWorkLog
);

module.exports = router;