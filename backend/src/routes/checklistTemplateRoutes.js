const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createTemplate,
  getTemplates,
  getTemplatesByShift,
  updateTemplate,
  deleteTemplate,
} = require(
  "../controllers/checklistTemplateController"
);

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createTemplate
);

router.get(
  "/",
  authMiddleware,
  getTemplates
);

router.get(
  "/shift/:shift",
  authMiddleware,
  getTemplatesByShift
);

router.put(
  "/:id",
  authMiddleware,
  updateTemplate
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTemplate
);

module.exports = router;