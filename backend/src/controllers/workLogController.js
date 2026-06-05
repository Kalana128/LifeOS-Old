const WorkLog = require("../models/WorkLog");

/*
=================================
CREATE WORK LOG
=================================
*/

const createWorkLog = async (req, res) => {
  try {
    const {
      category,
      taskName,
      startTime,
      endTime,
      notes,
      source,
    } = req.body;

    let durationMinutes = 0;

    if (startTime && endTime) {
      durationMinutes = Math.floor(
        (new Date(endTime) - new Date(startTime)) /
          (1000 * 60)
      );
    }

    const workLog = await WorkLog.create({
      userId: req.user.userId,
      date: new Date()
        .toISOString()
        .split("T")[0],
      category,
      taskName,
      startTime,
      endTime,
      durationMinutes,
      notes,
      source,
      completed: true,
    });

    res.status(201).json({
      success: true,
      workLog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*
=================================
GET WORK LOGS
=================================
*/

const getWorkLogs = async (req, res) => {
  try {
    const workLogs = await WorkLog.find({
      userId: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      workLogs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*
=================================
UPDATE WORK LOG
=================================
*/

const updateWorkLog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLog =
      await WorkLog.findOneAndUpdate(
        {
          _id: id,
          userId: req.user.userId,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!updatedLog) {
      return res.status(404).json({
        success: false,
        message: "Work log not found",
      });
    }

    res.json({
      success: true,
      workLog: updatedLog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/*
=================================
DELETE WORK LOG
=================================
*/

const deleteWorkLog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLog =
      await WorkLog.findOneAndDelete({
        _id: id,
        userId: req.user.userId,
      });

    if (!deletedLog) {
      return res.status(404).json({
        success: false,
        message: "Work log not found",
      });
    }

    res.json({
      success: true,
      message:
        "Work log deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createWorkLog,
  getWorkLogs,
  updateWorkLog,
  deleteWorkLog,
};