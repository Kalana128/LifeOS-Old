const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  generateChecklist,
  getTodayChecklist,
  completeChecklistItem,
} = require(
  "../controllers/dailyChecklistController"
);

const router = express.Router();

/*
=================================
GENERATE DAILY CHECKLIST
=================================
*/

router.post(
  "/generate",
  authMiddleware,
  generateChecklist
);

/*
=================================
GET TODAY'S CHECKLIST
=================================
*/

router.get(
  "/today",
  authMiddleware,
  getTodayChecklist
);

/*
=================================
COMPLETE CHECKLIST ITEM
=================================
*/

router.post(
  "/:id/complete",
  authMiddleware,
  completeChecklistItem
);

module.exports = router;