import User from "../models/user.model.js";
import UserNotification from "../models/userNotification.model.js";


export const sendNotificationForNewProject = async (title) => {
    try {
      const notificationMessage = `A new project has been added: ${title}`;
  
      // Fetch all users from your database (can be filtered if needed)
      const allUsers = await User.find();  // Fetch all users or use some filtering
  
      // Create and save notification for each user
      allUsers.forEach(async (user) => {
        const newNotification = new UserNotification({
          userId: user._id,
          message: notificationMessage,
          read: false, // Initially unread
        });
  
        // Save the notification for the user
        await newNotification.save();
      });
  
      console.log("Notifications sent for new project:", title);
    } catch (error) {
      console.error("Failed to send notifications:", error);
    }
  };
// 1️⃣ Fetch all notifications for a user
export const getNotifications = async (req, res) => {
    try {
      const { id } = req.params; // Get userId from request params
      const notifications = await UserNotification.find({ userId: id }).sort({ createdAt: -1 });
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Server error" });
    }
  };



  
  // ✅ Delete a single notification
 export const deleteNotification = async (req, res) => {
    try {
      const { notificationId } = req.params;
      await UserNotification.findByIdAndDelete(notificationId);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notification" });
    }
  };
  
  // ✅ Delete all notifications
 export const deleteAllNotifications = async (req, res) => {
    try {
      await UserNotification.deleteMany({});
      res.json({ message: "All notifications deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting notifications" });
    }
  };
  
 export  const getUnreadNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
      const count = await UserNotification.countDocuments({ userId, read: false });
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  // Mark all notifications as read
  export const markNotificationsAsRead = async (req, res) => {
    try {
      const { userId } = req.params;
      await UserNotification.updateMany({ userId, read: false }, { $set: { read: true } });
      res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  