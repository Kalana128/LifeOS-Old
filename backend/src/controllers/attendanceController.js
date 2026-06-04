const Attendance = require("../models/Attendance");

/*
=================================
CHECK IN
=================================
*/

const checkIn = async (req, res) => {
  try {
    const { shift } = req.body;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const existingAttendance =
      await Attendance.findOne({
        userId: req.user.userId,
        date: today,
      });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message:
          "Attendance already exists for today",
      });
    }

    const attendance =
      await Attendance.create({
        userId: req.user.userId,
        date: today,
        shift,
        checkIn: new Date(),
      });

    res.status(201).json({
      success: true,
      attendance,
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
CHECK OUT
=================================
*/

const checkOut = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const attendance =
      await Attendance.findOne({
        userId: req.user.userId,
        date: today,
      });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          "No attendance record found",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message:
          "Already checked out",
      });
    }

    const checkOutTime =
      new Date();

    const totalMinutes = Math.floor(
      (checkOutTime -
        attendance.checkIn) /
        (1000 * 60)
    );

    attendance.checkOut =
      checkOutTime;

    attendance.totalMinutes =
      totalMinutes;

    await attendance.save();

    res.json({
      success: true,
      attendance,
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
GET ATTENDANCE LIST
=================================
*/

const getAttendanceList =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          userId: req.user.userId,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        attendance,
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
  checkIn,
  checkOut,
  getAttendanceList,
};