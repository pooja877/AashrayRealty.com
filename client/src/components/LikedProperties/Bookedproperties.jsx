
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import "./LikedProperties.css";

export default function BookedProperties() {
    const [bookedProperties, setBookedProperties] = useState([]);
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
   

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await fetch("/api/user/me", {
              method: "GET",
              credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
              setUser(data);
             
            }
          } catch (error) {
            console.error("Not logged in", error);
          }
        };
        fetchUser();
      }, []);

      const deleteBooking = async (bookingId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this cancelled booking?");
        if (!confirmDelete) return;
    
        try {
            const res = await fetch(`/api/book/delete/${bookingId}`, {
                method: "DELETE",
                credentials: "include",
            });
    
            if (!res.ok) throw new Error("Failed to delete booking");
    
            // Remove the deleted booking from state
            setBookedProperties(prev =>
                prev.filter(booking => booking._id !== bookingId)
            );
    
            alert("Booking deleted successfully!");
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Something went wrong while deleting.");
        }
    };
    
    useEffect(() => {
        const fetchBookedProperties = async () => {
            try {
                const res = await fetch("/api/book/booked", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch booked properties");

                const data = await res.json();
                if (Array.isArray(data)) {
                    setBookedProperties(data.filter(item => item.propertyId));
                } else {
                    setBookedProperties([]);
                }
            } catch (error) {
                console.error("Error fetching booked properties:", error);
                setBookedProperties([]);
            }
        };

        fetchBookedProperties();
    }, []);

    const generateInvoice = (booking) => {
        const property = booking.propertyId;
    
        const doc = new jsPDF();
    
        // Set font to 'times' for a classic, professional look
        doc.setFont("times", "bold");
    
        // AashrayRealty Heading (centered)
        doc.setFontSize(23);
        doc.text("AashrayRealty", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
    
        // Invoice Title
        doc.setFont("times", "normal");
        doc.setFontSize(18);
        doc.text("Property Booking Invoice", 20, 35);
    
        // Invoice Date
        doc.setFontSize(12);
        doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 45);
    
        // Property Info
        doc.text("Property Details:", 20, 60);
        doc.text(`Name: ${property.propertyName}`, 25, 70);
        doc.text(`Address: ${property.address}, ${property.area}, ${property.city}`, 25, 80);
        doc.text(`Transaction Type: ${property.transactionType}`, 25, 90);
        doc.text(
            `Price: Rs.${property.discountPrice || property.price} ${property.transactionType === "Rent" ? "/month" : ""}`,
            25,
            100
        );
    
        // User Info
        doc.text("User Details:", 20, 115);
        doc.text(`User ID: ${user?.id}`, 25, 125);
        doc.text(`Email: ${user?.email}`, 25, 135);
    
        // Booking Info
        doc.text("Booking Details:", 20, 150);
        doc.text(`Payment ID: ${booking.paymentId}`, 25, 160);
        doc.text(`Order ID: ${booking.orderId}`, 25, 170);
        doc.text(`Token Amount Paid: Rs.${booking.tokenAmount}`, 25, 180);
        doc.text(`Booking Status: ${booking.status}`, 25, 190);
        doc.text(`Booked At: ${new Date(booking.bookedAt).toLocaleDateString()}`, 25, 200);
    
        // Refund Info or Booking Terms
        if (booking.status === "Cancelled") {
            doc.text("Refund Details:", 20, 215);
            doc.text(`Refund Amount: ₹${booking.refundAmount || 0}`, 25, 225);
            doc.text(`Refund ID: ${booking.refundId || "N/A"}`, 25, 235);
            doc.text(`Cancelled At: ${new Date(booking.cancelledAt).toLocaleDateString()}`, 25, 245);
        } else {
            // doc.text("Booking Terms:", 20, 215);
            doc.setFont("times", "bold"); // Make heading bold
            doc.text("Booking Terms:", 22, 215);

            doc.setFont("times", "normal"); // Make heading bold
            doc.text("Booking Terms:", 20, 215);
            doc.text(" You can visit the property within the next 15 days.", 25, 225);
            doc.text(" Visiting hours are from 12 PM to 4 PM.", 25, 235);
            doc.text(" Cancel within 10 days to receive a 50% refund.", 25, 245);
            doc.text(" Cancel after 10 days: no refund.", 25, 255);
            doc.text(" No visit within 15 days: booking expires.", 25, 265);
        }
    
        // Save the PDF
        doc.save(`Invoice-${property.propertyName}.pdf`);
    };
    

    return (
        <div className="mainlikedd">
            <div className="likeddis-main-user-contain">
                <h2>Booked Properties</h2>
                <div className="likeddis-datapro">
                    {bookedProperties.length > 0 ? (
                        bookedProperties.map((booking) => {
                            const property = booking.propertyId;
                            return (
                                <div className="likeddis-contain" key={property._id}>
                                    <div className="likeddis-imageWrapper">
                                        {property.images?.length > 0 && (
                                            <img
                                                className="likeddis-imageConatiner"
                                                src={property.images[0].url}
                                                alt="Property"
                                                onClick={() => navigate(`/Properties/${property._id}`)}
                                            />
                                        )}
                                    </div>

                                    <div className="likeddis-info" >
                                        <h3>{property.propertyName}</h3>
                                        <div className="likeddis-prodetails">
                                            <FaMapMarkerAlt />
                                            <p>{property.address} {property.area} {property.city}</p>
                                        </div>
                                        <p className="likeddis-protype">For {property.transactionType}</p>
                                        <div className="likeddis-price">
                                            <p className="likeddis-ind-price">
                                                ₹{property.discountPrice ? (
                                                    <>
                                                        <span className="likeddis-strike">{property.price}</span>
                                                        <span className="likeddis-discountprice">
                                                            {property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="likeddis-originalprice">
                                                        {property.price} {property.transactionType === "Rent" ? "/month" : ""}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <>
    <button className="invoice-btn" onClick={() => generateInvoice(booking)}>
        Download Invoice
    </button>

    {booking.status === "Cancelled" && (
        <button className="invoice-btn delete-btn" onClick={() => deleteBooking(booking._id)}>
            Delete Booking
        </button>
    )}
</>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No Booked properties found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
