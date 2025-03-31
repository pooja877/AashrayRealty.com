import cron from "node-cron";
 // Importing the function
import { sendExpiryReminderforrentpay } from "./controller/renting.controller.js";
import { sendExpiryReminders } from "./controller/notification.controller.js";

// Function to schedule the cron job
export const scheduleExpiryReminderJob = () => {
  // Run every day at 9 AM
  cron.schedule("0 9 * * *", () => {
    // cron.schedule("* * * * * *", () => {
    console.log("Running expiry reminder check...");
    
    sendExpiryReminderforrentpay();
    sendExpiryReminders(); 
  });
};
