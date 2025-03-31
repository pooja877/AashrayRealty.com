import Razorpay from "razorpay";
import Renting from "../models/renting.model.js";
import nodemailer from "nodemailer";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_SECRET,
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use another service like SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Function to send email with Razorpay payment button
const sendPaymentReminder = async (userEmail, rentAmount, dueDate) => {
  const razorpayOrder = await createRazorpayOrder(rentAmount); // Create a Razorpay order

  // Razorpay payment button URL
  const razorpayPaymentUrl = `https://checkout.razorpay.com/v1/checkout.js?order_id=${razorpayOrder.id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Rent Payment Reminder",
    html: `
      <p>Dear User,</p>
      <p>Your rent of ₹${rentAmount} is due today (${dueDate}). Please make the payment at the earliest.</p>
      <p>Click the button below to pay your rent:</p>
      <a href="${razorpayPaymentUrl}" target="_blank" style="padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Pay Rent</a>
      <p>Thank you!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Payment reminder with Razorpay button sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const createRentPaymentOrder = async (req, res) => {
  try {
    const { rentId } = req.body; // Rent record ID to fetch rent details
    const rentRecord = await Renting.findById(rentId).populate("userId", "email");

    if (!rentRecord) {
      return res.status(404).json({ message: 'Rent record not found' });
    }

    // Creating Razorpay order
    const paymentOptions = {
      amount: rentRecord.rentAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `rent_${rentRecord._id}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(paymentOptions);

    // Send the order ID to the frontend for initiating the payment
    res.json({ orderId: order.id, rentId, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
};

// Check due dates and send reminders
export const sendExpiryReminderforrentpay = async () => {
  try {
    // Get all renting records with populated userId (including email)
    const rents = await Renting.find({ dueDate: new Date() }).populate("userId", "email");

    for (const rent of rents) {
      const userEmail = rent.userId.email;
      const dueDate = new Date(rent.dueDate).toLocaleDateString();
      await sendPaymentReminder(userEmail, rent.rentAmount, dueDate);
    }
  } catch (error) {
    console.error("Error checking due dates and sending reminders:", error);
  }
};


