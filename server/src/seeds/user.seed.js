import { config } from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import dns from "node:dns";
import Message from "../models/message.model.js";

dns.setServers(['8.8.8.8', '1.1.1.1']);
config();

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: 123456, // Note: Use a hashed password if your login requires it
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "john.doe@example.com",
    fullName: "John Doe",
    password: 1234567,
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  // ... add 8 more users here
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // 1. Optional: Clear existing users to avoid "Duplicate Email" errors
    await User.deleteMany();
    console.log("Existing users cleared.");

    await Message.deleteMany();
    console.log("Existing messages cleared.");
    // 2. Insert the new users
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully with 2 users!");

    // 3. CRITICAL: Close the connection and exit the process
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0); 

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // Exit with error
  }
};

seedDatabase();