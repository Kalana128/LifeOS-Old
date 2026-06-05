const mongoose = require("mongoose");

const workLogSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
    },

    taskName: {
      type: String,
      required: true,
    },

    startTime: {
      type: Date,
      default: null,
    },

    endTime: {
      type: Date,
      default: null,
    },

    durationMinutes: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: ["CHECKLIST", "MANUAL"],
      default: "MANUAL",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WorkLog",
  workLogSchema
);