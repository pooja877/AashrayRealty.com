
import { useEffect, useState } from 'react';
import './Book.css';

export default function Book({ propertyId, status, transactionType }) {
  const [user, setUser] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookingUserId, setBookingUserId] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (error) {
        console.error("Not logged in", error);
      }
    };

    fetchUser();
  }, []);

  // Fetch booking info if user is available
  useEffect(() => {
    const fetchBooking = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/book/booked", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          const matchedBooking = data.find(
            (booking) => booking.propertyId._id === propertyId
          );

          if (matchedBooking) {
            setBookingId(matchedBooking._id);
            setBookingUserId(matchedBooking.userId); // ✅ Fix: Set who booked it
            // console.log("User booked this property:", matchedBooking);
          } else {
            setBookingId(null);
            setBookingUserId(null);
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBooking();
  }, [user, propertyId]);

  // Handle booking and payment
  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book a property.");
      return;
    }

    try {
      const res = await fetch("/api/book/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: 10000 * 100,
          currency: "INR",
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.message || "Failed to create order");

      const options = {
        key: "rzp_test_Htyw5KMlZrWLHR",
        amount: orderData.amount,
        currency: "INR",
        name: "Aashray Realty",
        description: "Property Booking Token Fee",
        order_id: orderData.id,
        handler: async function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

          const confirmRes = await fetch("/api/book/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              userId: user?.id,
              propertyId,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              email: user?.email,
              amount: orderData.amount,
              transactionType,
            }),
          });

          const confirmData = await confirmRes.json();
          if (!confirmRes.ok)
            throw new Error(confirmData.message || "Booking confirmation failed");

          alert("Booking confirmed! Check your email.");
        },
        prefill: {
          name: user?.username,
          email: user?.email,
        },
        theme: { color: "#3399cc" },
        payment_capture: 1,
        method: { upi: true },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!bookingId) {
      alert("No booking found.");
      return;
    }

    try {
      const response = await fetch("/api/book/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          propertyId,
          userId: user?.id,
          email: user?.email,
          status,
        }),
      });

      if (response.ok) {
        alert("Booking cancelled successfully!");
        setBookingId(null);
        setBookingUserId(null);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Cancellation Error:", error);
      alert("Cancellation failed. Please try again.");
    }
  };

  // Notify me handler
  const handleNotifyMe = async () => {
    if (!user) {
      alert("Please login to receive notifications.");
      return;
    }

    try {
      const response = await fetch("/api/notify/notify-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          userId: user?.id,
          email: user?.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Failed to register for notification");
      }
    } catch (error) {
      console.error("Notification Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="all3btn">
      {status === "Booked" ? (
        bookingUserId === user?.id ? (
          <button className="cancel-btn" onClick={handleCancelBooking}>
            Cancel Booking
          </button>
        ) : (
          <>
            <p style={{ color: "red" }}>
              Property is not available now. It is booked by someone!!
            </p>
            <button className="notify-btn" onClick={handleNotifyMe}>
              Notify Me When Available
            </button>
          </>
        )
      ) : (
        <button className="book-btn" onClick={handleBooking}>
          Book Property
        </button>
      )}
    </div>
  );
}
