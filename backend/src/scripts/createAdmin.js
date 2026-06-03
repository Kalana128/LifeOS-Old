const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/database");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne({
      username: "kalana",
    });

    if (existingUser) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash("LifeOS123", 10);

    await User.create({
      username: "kalana",
      email: "kasunvihaga98@gmail.com",
      passwordHash,
    });

    console.log("Admin user created successfully ✅");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();