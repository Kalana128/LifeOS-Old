const DailyChecklist = require(
  "../models/DailyChecklist"
);

const ChecklistTemplate = require(
  "../models/ChecklistTemplate"
);

const WorkLog = require(
  "../models/WorkLog"
);

/*
=================================
GENERATE DAILY CHECKLIST
=================================
*/

const generateChecklist =
  async (req, res) => {
    try {
      const { shift } = req.body;

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const existingChecklist =
        await DailyChecklist.findOne({
          userId: req.user.userId,
          date: today,
          shift,
        });

      if (existingChecklist) {
        return res.status(400).json({
          success: false,
          message:
            "Checklist already generated for today",
        });
      }

      const templates =
        await ChecklistTemplate.find({
          shift,
          active: true,
        }).sort({
          displayOrder: 1,
        });

      const checklistItems =
        templates.map((template) => ({
          userId: req.user.userId,
          date: today,
          shift: template.shift,
          templateId: template._id,
          category: template.category,
          taskName: template.taskName,
          description:
            template.description,
          estimatedMinutes:
            template.estimatedMinutes,
          scheduledTime:
            template.scheduledTime,
        }));

      await DailyChecklist.insertMany(
        checklistItems
      );

      res.status(201).json({
        success: true,
        message:
          "Daily checklist generated successfully",
        count:
          checklistItems.length,
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
GET TODAY'S CHECKLIST
=================================
*/

const getTodayChecklist =
  async (req, res) => {
    try {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const checklist =
        await DailyChecklist.find({
          userId: req.user.userId,
          date: today,
        }).sort({
          scheduledTime: 1,
          createdAt: 1,
        });

      res.json({
        success: true,
        count: checklist.length,
        checklist,
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
COMPLETE CHECKLIST ITEM
=================================
*/

const completeChecklistItem =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        startTime,
        endTime,
        notes,
      } = req.body;

      const checklistItem =
        await DailyChecklist.findOne({
          _id: id,
          userId: req.user.userId,
        });

      if (!checklistItem) {
        return res.status(404).json({
          success: false,
          message:
            "Checklist item not found",
        });
      }

      if (checklistItem.completed) {
        return res.status(400).json({
          success: false,
          message:
            "Checklist item already completed",
        });
      }

      let durationMinutes = 0;

      if (startTime && endTime) {
        durationMinutes = Math.floor(
          (
            new Date(endTime) -
            new Date(startTime)
          ) /
            (1000 * 60)
        );
      }

      const workLog =
        await WorkLog.create({
          userId: req.user.userId,
          date: checklistItem.date,
          category:
            checklistItem.category,
          taskName:
            checklistItem.taskName,
          startTime,
          endTime,
          durationMinutes,
          notes,
          source: "CHECKLIST",
          completed: true,
        });

      checklistItem.completed =
        true;

      checklistItem.completedAt =
        new Date();

      checklistItem.workLogId =
        workLog._id;

      await checklistItem.save();

      res.json({
        success: true,
        message:
          "Checklist completed successfully",
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

module.exports = {
  generateChecklist,
  getTodayChecklist,
  completeChecklistItem,
};