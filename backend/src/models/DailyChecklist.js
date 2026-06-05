const mongoose = require("mongoose");

const dailyChecklistSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      shift: {
        type: String,
        required: true,
      },

      templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChecklistTemplate",
        required: true,
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

      completed: {
        type: Boolean,
        default: false,
      },

      completedAt: {
        type: Date,
        default: null,
      },

      workLogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkLog",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "DailyChecklist",
  dailyChecklistSchema
);