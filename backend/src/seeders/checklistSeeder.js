const mongoose = require("mongoose");
const dotenv = require("dotenv");

const ChecklistTemplate = require(
  "../models/ChecklistTemplate"
);

dotenv.config();

const checklistTemplates = [
  /*
  =================================
  DAY_6_TO_3
  =================================
  */

  {
    shift: "DAY_6_TO_3",
    category: "NOC Monitoring",
    taskName:
      "Check Disconnected APs and List Down New Disconnected APs",
    description:
      "Review SmartZone and record newly disconnected APs.",
    estimatedMinutes: 20,
    displayOrder: 1,
  },

  {
    shift: "DAY_6_TO_3",
    category: "NOC Monitoring",
    taskName:
      "Check Alerts, Alarms and Admin Activities in SmartZone",
    description:
      "Review SmartZone alerts, alarms and admin activities.",
    estimatedMinutes: 20,
    displayOrder: 2,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Incident Management",
    taskName:
      "Check Ruckus AI Incidents",
    description:
      "Review newly generated Ruckus AI incidents.",
    estimatedMinutes: 15,
    displayOrder: 3,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Incident Management",
    taskName:
      "Check OP Manager Incidents",
    description:
      "Review incidents recorded in OP Manager.",
    estimatedMinutes: 15,
    displayOrder: 4,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Email Communication",
    taskName:
      "Check Radius Alert Emails",
    description:
      "Review Radius related alert emails.",
    estimatedMinutes: 10,
    displayOrder: 5,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Reporting",
    taskName:
      "Login to Firewall and Send Daily ISP Utilization Report",
    description:
      "Generate and send daily ISP utilization report.",
    estimatedMinutes: 15,
    scheduledTime: "08:00",
    displayOrder: 6,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Email Communication",
    taskName:
      "Send Disconnected AP Notification Emails",
    description:
      "Send notifications for newly disconnected APs.",
    estimatedMinutes: 15,
    displayOrder: 7,
  },

  {
    shift: "DAY_6_TO_3",
    category: "Email Communication",
    taskName:
      "Send Reminder Emails for Previous AP Disconnections",
    description:
      "Follow up previous AP disconnection incidents.",
    estimatedMinutes: 15,
    displayOrder: 8,
  },

  /*
  =================================
  DAY_9_TO_6
  =================================
  */

  {
    shift: "DAY_9_TO_6",
    category: "NOC Monitoring",
    taskName:
      "Check Disconnected APs and List Down New Disconnected APs",
    description:
      "Review SmartZone and record newly disconnected APs.",
    estimatedMinutes: 20,
    displayOrder: 1,
  },

  {
    shift: "DAY_9_TO_6",
    category: "NOC Monitoring",
    taskName:
      "Check Alerts, Alarms and Admin Activities in SmartZone",
    description:
      "Review SmartZone alerts, alarms and admin activities.",
    estimatedMinutes: 20,
    displayOrder: 2,
  },

  {
    shift: "DAY_9_TO_6",
    category: "Incident Management",
    taskName:
      "Check Ruckus AI Incidents",
    description:
      "Review newly generated Ruckus AI incidents.",
    estimatedMinutes: 15,
    displayOrder: 3,
  },

  {
    shift: "DAY_9_TO_6",
    category: "Incident Management",
    taskName:
      "Check OP Manager Incidents",
    description:
      "Review incidents recorded in OP Manager.",
    estimatedMinutes: 15,
    displayOrder: 4,
  },

  {
    shift: "DAY_9_TO_6",
    category: "Email Communication",
    taskName:
      "Check Radius Alert Emails",
    description:
      "Review Radius related alert emails.",
    estimatedMinutes: 10,
    displayOrder: 5,
  },

  {
    shift: "DAY_9_TO_6",
    category: "Email Communication",
    taskName:
      "Send Disconnected AP Notification Emails",
    description:
      "Send notifications for newly disconnected APs.",
    estimatedMinutes: 15,
    displayOrder: 6,
  },

  {
    shift: "DAY_9_TO_6",
    category: "Email Communication",
    taskName:
      "Send Reminder Emails for Previous AP Disconnections",
    description:
      "Follow up previous AP disconnection incidents.",
    estimatedMinutes: 15,
    displayOrder: 7,
  },

  /*
  =================================
  NIGHT_6_TO_6
  =================================
  */

  {
    shift: "NIGHT_6_TO_6",
    category: "NOC Monitoring",
    taskName:
      "Check Disconnected APs and List Down New Disconnected APs",
    description:
      "Review SmartZone and record newly disconnected APs.",
    estimatedMinutes: 20,
    displayOrder: 1,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "NOC Monitoring",
    taskName:
      "Check Alerts, Alarms and Admin Activities in SmartZone",
    description:
      "Review SmartZone alerts, alarms and admin activities.",
    estimatedMinutes: 20,
    displayOrder: 2,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Incident Management",
    taskName:
      "Check Ruckus AI Incidents",
    description:
      "Review newly generated Ruckus AI incidents.",
    estimatedMinutes: 15,
    displayOrder: 3,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Incident Management",
    taskName:
      "Check OP Manager Incidents",
    description:
      "Review incidents recorded in OP Manager.",
    estimatedMinutes: 15,
    displayOrder: 4,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Email Communication",
    taskName:
      "Check Radius Alert Emails",
    description:
      "Review Radius related alert emails.",
    estimatedMinutes: 10,
    displayOrder: 5,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Monitoring",
    taskName:
      "Monitor AP Connectivity and Critical Alerts",
    description:
      "Monitor AP health and critical network alerts.",
    estimatedMinutes: 30,
    displayOrder: 6,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Incident Management",
    taskName:
      "Follow Up Open Incidents",
    description:
      "Review and update ongoing incidents.",
    estimatedMinutes: 20,
    displayOrder: 7,
  },

  {
    shift: "NIGHT_6_TO_6",
    category: "Documentation",
    taskName:
      "Update Shift Monitoring Notes",
    description:
      "Document important observations from the shift.",
    estimatedMinutes: 15,
    displayOrder: 8,
  },
];

async function seedChecklist() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    await ChecklistTemplate.deleteMany();

    await ChecklistTemplate.insertMany(
      checklistTemplates
    );

    console.log(
      "Checklist Templates Seeded Successfully ✅"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedChecklist();