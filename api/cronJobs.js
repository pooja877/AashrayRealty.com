import cron from "node-cron";
import { sendExpiryReminders } from "./controller/notification.controller.js";

// Run every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running expiry reminder check...");
  sendExpiryReminders();
});
