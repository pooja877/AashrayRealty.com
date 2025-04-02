import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import Renting from "../models/renting.model.js";
import User from "../models/user.model.js";
import UnpaidUser from "../models/unpaiduser.model.js";
import axios from "axios";
import UserNotification from "../models/userNotification.model.js";

// Configure Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_SECRET,
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to create a Razorpay order
async function createOrder(rentAmount) {
  try {
    // Create an order in Razorpay
    const order = await razorpay.orders.create({
      amount: rentAmount * 100,  // Amount in paise
      currency: "INR",
      receipt: "order_receipt", // Optional: You can set a unique receipt ID
      notes: {
        payment_for: "Rent Payment",
      },
    });

    // Extract the order_id from the response
    const orderId = order.id;
    console.log("Order ID:", orderId);

    return orderId;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return null;
  }
}

// Function to create a Razorpay payment link
export async function createPaymentLink(rentAmount, userEmail, userId) {
  try {
    const orderId = await createOrder(rentAmount);

    if (!orderId) {
      console.error("Failed to create Razorpay order. Payment link cannot be generated.");
      return null;
    }

    const response = await axios.post(
      "https://api.razorpay.com/v1/payment_links",
      {
        amount: rentAmount * 100,  // Convert amount to paise
        currency: "INR",
        description: "Rent Payment",
        customer: {
          email: userEmail,
        },
        notify: {
          email: true,  // Enable email notification
          sms: false,
        },
        callback_url: `http://localhost:3000/api/rent/callback?userId=${userId}&orderId=${orderId}`, // Redirect after payment
        callback_method: "get",
      },
      {
        auth: {
          username: razorpay.key_id,
          password: razorpay.key_secret,
        },
      }
    );

    return response.data.short_url; // Return payment link
  } catch (error) {
    console.error("Error creating payment link:", error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to send rent payment reminder email
export const sendPaymentReminder = async (userEmail, rentAmount, dueDate, userId) => {
  try {
    const paymentLink = await createPaymentLink(rentAmount, userEmail, userId);

    if (!paymentLink) {
      console.error("Failed to create Razorpay payment link. Email not sent.");
      return;
    }
    const newNotification = new UserNotification({
      userId,
      message: `Your rent payment of ₹${rentAmount} is due on ${dueDate}.  
    Please make the payment at the earliest to avoid any late fees.  
    
    Click the button below to pay your rent:  
    ${paymentLink}`
    });

    // Save the notification
    await newNotification.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Rent Payment Reminder -AashrayRealty",  
    html: `  
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">  
    <p>Dear User,</p>  
    <p>Your rent of <strong>₹${rentAmount}</strong> is due on <strong>${dueDate}</strong>. Please make the payment at the earliest.</p>  
    <p>Click the button below to pay your rent:</p>  
    <p>  
      <a href="${paymentLink}" target="_blank"  
         style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white;  
                text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">  
        Pay Rent  
      </a>  
    </p>  
    <p>If you have already made the payment, please ignore this message.</p>  
    <p>Thank you!</p>  
  </div>  
`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Payment reminder sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending payment reminder email:", error);
  }
};

// Function to find active rent records and send emails
// export const sendRentPaymentReminder = async () => {
//   try {
//     const rents = await Renting.find({}).populate("userId", "email");

//     for (const rent of rents) {
//       const userId = rent.userId._id;  // Correctly accessing _id
//       const userEmail = rent.userId.email;
//       const dueDate = new Date(rent.dueDate).toLocaleDateString();
      
//       await sendPaymentReminder(userEmail, rent.rentAmount, dueDate, userId);
//     }

//     console.log("Payment reminders sent successfully.");
//   } catch (error) {
//     console.error("Error sending rent payment reminders:", error);
//   }
// };

// Razorpay callback handler

// export const razorpayCallback = async (req, res) => {
//   try {
//     const paymentId = req.query.razorpay_payment_id;
//     const orderId = req.query.orderId;
//     const paymentSignature = req.query.razorpay_signature;
//     const userId = req.query.userId;

//     // console.log("Payment ID:", paymentId);
//     // console.log("Order ID:", orderId);
//     // console.log("Payment Signature:", paymentSignature);

//     if (!paymentId || !orderId || !paymentSignature) {
//       return res.status(400).send("Invalid request parameters.");
//     }

//     // Create body for HMAC signature verification
//     // const body = paymentId + "|" + orderId;
//     // console.log("Body for HMAC:", body);

//     // const expectedSignature = crypto
//     //   .createHmac("sha256", process.env.RAZORPAY_TEST_SECRET)
//     //   .update(body)
//     //   .digest("hex");

//     // console.log("Computed Signature:", expectedSignature);
//     // console.log("Signatures Match:", expectedSignature.trim() === paymentSignature.trim());

//     // if (expectedSignature.trim() !== paymentSignature.trim()) {
//     //   console.log("Invalid payment signature");
//     //   return res.status(400).send("Payment verification failed.");
//     // }

//     // Find rent record and update payment details
//     const rentRecord = await Renting.findOneAndUpdate(
//       { userId: userId },
//       {
//         $set: { lastPaymentDate: new Date() },  // Update last payment date
//         $push: { paymentHistory: { paymentId, date: new Date() } }, // Add new entry to history
//       },
//       { new: true, upsert: false } // Return updated document, prevent new creation
//     );
    

//     if (!rentRecord) {
//       return res.status(404).send("Rent record not found.");
//     }

//     // Fetch user email
//     const user = await User.findById(userId);
//     if (!user || !user.email) {
//       return res.status(404).send("User email not found.");
//     }

//     // Sending payment confirmation email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Rent Payment Successful -AashrayRealty",
//       text: `
//     Dear ${user.username},
    
//     Your rent payment of ₹${rentRecord.rentAmount} has been successfully processed.
    
//     Payment Details:
//     - Payment ID: ${paymentId}
//     - Order ID: ${orderId}
//     - Date: ${new Date().toLocaleString()}
    
//     Thank you for your payment.
    
//     Best regards,  
//     AashrayRealty
//       `,
//     };
    
//     await transporter.sendMail(mailOptions);
//     // console.log(`Payment confirmation email sent to ${user.email}`);

//     return res.status(200).send("Payment successful, rent updated, and email sent.");
//   } catch (error) {
//     console.error("Error handling Razorpay callback:", error);
//     return res.status(500).send("Internal server error");
//   }
// };

// export const sendRentPaymentReminder = async () => {
//   try {
//     const rents = await Renting.find({}).populate("userId", "email");

//     for (const rent of rents) {
//       const userId = rent.userId._id;  // Correctly accessing _id
//       const userEmail = rent.userId.email;
//       const dueDate = new Date(rent.dueDate);

//       // Check if payment has already been made for the current month
//       const lastPayment = rent.paymentHistory.find(payment => {
//         const paymentDate = new Date(payment.date);
//         return paymentDate.getMonth() === dueDate.getMonth() && paymentDate.getFullYear() === dueDate.getFullYear();
//       });

//       if (lastPayment) {
//         console.log(`Payment already made for ${userEmail} this month.`);
//         continue;  // Skip reminder if payment is already made
//       }

//       // Send reminders based on the due date (5, 3, 1 day before)
//       const today = new Date();
//       const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

//       // If the due date is 5, 3, or 1 days away, or it's today, send a reminder
//       if (diffDays === 5 || diffDays === 3 || diffDays === 1 || diffDays === 0) {
//         await sendPaymentReminder(userEmail, rent.rentAmount, dueDate.toLocaleDateString(), userId);
//       } else if (diffDays < 0) {
//         // Send daily reminders for overdue payments
//         await sendPaymentReminder(userEmail, rent.rentAmount, dueDate.toLocaleDateString(), userId);

//         // Add the user to the "UnpaidUser" collection if they haven't paid by the due date
//         const unpaidUserExists = await UnpaidUser.findOne({ userId });

//         if (!unpaidUserExists) {
//           const unpaidUser = new UnpaidUser({
//             userId: userId,
//             rentAmount: rent.rentAmount,
//             dueDate: dueDate,
//           });

//           await unpaidUser.save();
//           await notifyUnpaidRent(userId, rent.propertyId);
//           console.log(`Added user ${userEmail} to unpaid users list.`);
//         }
//       }
//     }

//     console.log("Payment reminders sent successfully.");
//   } catch (error) {
//     console.error("Error sending rent payment reminders:", error);
//   }
// };
const sentReminders = new Set(); // Tracks emails sent in the current execution

export const sendRentPaymentReminder = async () => {
  try {
    console.log("Running rent payment reminder check...");

    const rents = await Renting.find({}).populate("userId", "email");

    for (const rent of rents) {
      const userId = rent.userId._id;
      const userEmail = rent.userId.email;
      const dueDate = new Date(rent.dueDate);
      const today = new Date();
      const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

      // Check if payment has already been made for this month
      const lastPayment = rent.paymentHistory.find(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() === dueDate.getMonth() && paymentDate.getFullYear() === dueDate.getFullYear();
      });

      if (lastPayment) {
        console.log(`Payment already made for ${userEmail} this month.`);
        continue; // Skip if already paid
      }

      // Prevent duplicate reminders for the same user in the same execution
      if (sentReminders.has(userEmail)) {
        console.log(`Skipping duplicate reminder for ${userEmail}`);
        continue;
      }

      // If the due date is 5, 3, 1 days away, or today, send a reminder
      if ([5, 3, 1, 0].includes(diffDays) || diffDays < 0) {
        
        await sendPaymentReminder(userEmail, rent.rentAmount, dueDate.toLocaleDateString(), userId);
        sentReminders.add(userEmail); // Mark as reminded for this execution
      }

      // If overdue, add to UnpaidUser collection and notify
      if (diffDays < 0) {
        const unpaidUserExists = await UnpaidUser.findOne({ userId });

        if (!unpaidUserExists) {
          await new UnpaidUser({ userId, rentAmount: rent.rentAmount, dueDate }).save();
          await notifyUnpaidRent(userId, rent.propertyId);
          console.log(`Added user ${userEmail} to unpaid users list.`);
        }
      }
    }

    console.log("Payment reminders sent successfully.");
  } catch (error) {
    console.error("Error sending rent payment reminders:", error);
  }
};


// Razorpay callback handler
export const razorpayCallback = async (req, res) => {
  try {
    const paymentId = req.query.razorpay_payment_id;
    const orderId = req.query.orderId;
    const userId = req.query.userId;

    if (!paymentId || !orderId) {
      return res.status(400).send("Invalid request parameters.");
    }

    // Find rent record and update payment details
    const rentRecord = await Renting.findOneAndUpdate(
      { userId },
      {
        $set: { lastPaymentDate: new Date() },  // Update last payment date
        $push: { paymentHistory: { paymentId, date: new Date() } }, // Add new entry to history
        $set: { dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) }, // Update due date to next month
      },
      { new: true }
    );

       
    if (!rentRecord) {
      return res.status(404).send("Rent record not found.");
    }

    // Fetch user email
    const user = await User.findById(userId);
    if (!user || !user.email) {
      return res.status(404).send("User email not found.");
    }
    await notifyuserRent(userId, rentRecord.propertyId);
    const newNotification = new UserNotification({
      userId,
      message: `Your rent payment of ₹${rentRecord.rentAmount} has been successfully processed.    Payment Details:
    - Payment ID: ${paymentId}
    - Order ID: ${orderId}
    - Date: ${new Date().toLocaleString()}`,
    });

    // Save the notification
    await newNotification.save();
    // Send payment confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Rent Payment Successful - AashrayRealty",
      text: `
    Dear ${user.username},
    
    Your rent payment of ₹${rentRecord.rentAmount} has been successfully processed.
    
    Payment Details:
    - Payment ID: ${paymentId}
    - Order ID: ${orderId}
    - Date: ${new Date().toLocaleString()}
    
    Thank you for your payment.
    
    Best regards,  
    AashrayRealty
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send("Payment successful, rent updated, and email sent.");
  } catch (error) {
    console.error("Error handling Razorpay callback:", error);
    return res.status(500).send("Internal server error");
  }
};

export const getUserRentings = async (req, res) => {
  try {
      const userId = req.user.id; // `verifyUser` middleware se user ID mil jayegi

      const rentedProperties = await Renting.find({ userId }).populate('propertyId');

      res.status(200).json(rentedProperties);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching liked properties', error });
  }
};

export const getAllRentings = async (req, res) => {
    try {
        const rentings = await Renting.find().sort({ createdAt: -1 });
        res.status(200).json(rentings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Bookings", error });
    }
};
export const deleteRenting = async (req, res) => {
    try {
        await Renting.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Booking" });
    }
};
const notifyUnpaidRent = async (userId, propertyId) => {
  try {
    await Contact.create({
      userId,
      category: "unpaid",
      message: `Rent for property ID: ${propertyId} is unpaid.`,
    });
  } catch (error) {
    console.error("Error creating unpaid rent notification:", error);
  }
};
const notifyuserRent = async (userId, propertyId) => {
  try {
    await Contact.create({
      userId,
      category: "rentpaid",
      message: `Rent for property ID: ${propertyId} is Paid!!`,
    });
  } catch (error) {
    console.error("Error creating unpaid rent notification:", error);
  }
};