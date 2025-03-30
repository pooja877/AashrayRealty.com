import { useEffect, useState } from 'react';
import './Book.css'

export default function Book({propertyId, status}) {
    const [user, setUser] = useState(null);
    const [bookingId, setBookingId] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await fetch("/api/user/me", { method: "GET", credentials: "include" });
            const data = await res.json();
            if (res.ok) setUser(data);
          } catch (error) {
            console.error("Not logged in", error);
          }
        };
      
        fetchUser();
      }, []); // ✅ Runs only on mount
      
      useEffect(() => {
        const fetchBooking = async () => {
          if (!user) return; // ✅ Ensures user is available before fetching booking
      
          try {
            const res = await fetch(`/api/book?userId=${user.id}&propertyId=${propertyId}`, {
              method: "GET",
              credentials: "include",
            });
            const data = await res.json();
            if (res.ok && data.booking) {
              setBookingId(data.booking._id); // ✅ Store bookingId in state
            }
          } catch (error) {
            console.error("Error fetching booking:", error);
          }
        };
      
        fetchBooking();
      }, [user]); // ✅ Runs only when `user` is set
      
      const handleBooking = async () => {
        if (!user) {
          alert("Please login to book a property.");
          return;
        }
      
        try {
          // 🔹 Step 1: Create Razorpay Order
          const res = await fetch("/api/book/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({  amount: 10000*100, // Pass the amount in paise (₹100)
              currency: "INR" }), // ✅ Pass Amount
          });
      
          const orderData = await res.json();
          if (!res.ok) {
            throw new Error(orderData.message || "Failed to create order");
          }
      
          // 🔹 Step 2: Open Razorpay Payment Gateway
          const options = {
            key: "rzp_test_1UtD2arKO3r2ix",
            amount: orderData.amount,
            currency: "INR",
            name: "Aashray Realty",
            description: "Property Booking Token Fee",
            order_id: orderData.id,
            handler: async function (response) {
              alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      
              // 🔹 Step 3: Confirm Booking & Store in Database
              const confirmRes = await fetch("/api/book/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  userId: user?.id,
                  propertyId, // ✅ Ensure propertyId is defined
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                  email: user?.email,
                  amount: orderData.amount, // ✅ Include Amount in Confirmation
                }),
              });
      
              const confirmData = await confirmRes.json();
              if (!confirmRes.ok) {
                throw new Error(confirmData.message || "Booking confirmation failed");
              }
      
              alert("Booking confirmed! Check your email.");
            },
            prefill: { name: user?.username, email: user?.email },
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
            body: JSON.stringify({ bookingId, propertyId, userId: user?.id ,email:user?.email}),
          });
    
          if (response.ok) {
            alert("Booking cancelled successfully!");
            setBookingId(null);
          } else {
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          console.error("Cancellation Error:", error);
          alert("Cancellation failed. Please try again.");
        }
      };
    
      const handleNotifyMe = async () => {
        if (!user) {
          alert("Please login to receive notifications.");
          return;
        }
        console.log(propertyId,user?.id,user?.email)
      
        try {
          const response = await fetch("/api/notify/notify-me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyId, // ✅ Ensures propertyId is included
              userId: user?.id, // ✅ Sends user's ID
              email: user?.email, // ✅ Sends user's email
            }),
          });
      
          const data = await response.json();
          
          if (response.ok) {
            alert(data.message); // ✅ Show success message
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
    user && bookingId ? ( // ✅ Check if user booked this property
      <button className="cancel-btn" onClick={handleCancelBooking}>
        Cancel Booking
      </button>
    ) : (
      <>
        <p style={{color:"red"}}>Property is not available now. It is booked by someone!!</p>
        <button className="notify-btn" onClick={handleNotifyMe}>Notify Me When Available</button>
      </>
    )
  ) : (
    <button className="book-btn" onClick={handleBooking}>
      Book Property
    </button>
  )}
</div>

  )
}
