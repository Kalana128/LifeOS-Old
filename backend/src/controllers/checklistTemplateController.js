const ChecklistTemplate = require(
  "../models/ChecklistTemplate"
);

/*
=================================
CREATE TEMPLATE
=================================
*/

const createTemplate = async (
  req,
  res
) => {
  try {
    const template =
      await ChecklistTemplate.create(
        req.body
      );

    res.status(201).json({
      success: true,
      template,
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
GET ALL TEMPLATES
=================================
*/

const getTemplates = async (
  req,
  res
) => {
  try {
    const templates =
      await ChecklistTemplate.find()
        .sort({
          shift: 1,
          displayOrder: 1,
        });

    res.json({
      success: true,
      templates,
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
GET BY SHIFT
=================================
*/

const getTemplatesByShift =
  async (req, res) => {
    try {
      const { shift } =
        req.params;

      const templates =
        await ChecklistTemplate.find({
          shift,
          active: true,
        }).sort({
          displayOrder: 1,
        });

      res.json({
        success: true,
        templates,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server error",
      });
    }
  };

/*
=================================
UPDATE TEMPLATE
=================================
*/

const updateTemplate =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const template =
        await ChecklistTemplate.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
          }
        );

      if (!template) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Template not found",
          });
      }

      res.json({
        success: true,
        template,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server error",
      });
    }
  };

/*
=================================
DELETE TEMPLATE
=================================
*/

const deleteTemplate =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const template =
        await ChecklistTemplate.findByIdAndDelete(
          id
        );

      if (!template) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Template not found",
          });
      }

      res.json({
        success: true,
        message:
          "Template deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server error",
      });
    }
  };

module.exports = {
  createTemplate,
  getTemplates,
  getTemplatesByShift,
  updateTemplate,
  deleteTemplate,
};