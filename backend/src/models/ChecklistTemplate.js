const mongoose = require("mongoose");

const checklistTemplateSchema = new mongoose.Schema(
  {
    shift: {
      type: String,
      required: true,
      enum: [
        "DAY_6_TO_3",
        "DAY_9_TO_6",
        "NIGHT_6_TO_6",
      ],
    },

    category: {
      type: String,
      required: true,
    },

    taskName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    estimatedMinutes: {
      type: Number,
      default: 0,
    },

    scheduledTime: {
      type: String,
      default: null,
    },

    displayOrder: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ChecklistTemplate",
  checklistTemplateSchema
);