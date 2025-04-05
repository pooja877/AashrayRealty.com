import { Link } from 'react-router-dom';
import './Activity.scss';
import { useEffect, useState } from 'react';

export default function Activity() {
  const [likedCount, setLikedCount] = useState(0);
  const [bookedCount, setbookedCount] = useState(0);
  const [rentedCount, setrentedCount] = useState(0);
  const [listedCount, setlistedCount] = useState(0);



  useEffect(() => {
    // Fetch Liked Properties Count
    const fetchBookedProperties = async () => {
      try {
        const res = await fetch("/api/book/booked", {
          method: "GET",
          credentials: "include", // Ensure user authentication
        });

        const data = await res.json();
        if (res.ok) {
          setbookedCount(data.length); // Assuming API returns array of liked properties
        }
      } catch (error) {
        console.error("Error fetching liked properties:", error);
      }
    };

    fetchBookedProperties();
  }, []);

  useEffect(() => {
    // Fetch Liked Properties Count
    const fetchRentedProperties = async () => {
      try {
        const res = await fetch("/api/rent/rented", {
          method: "GET",
          credentials: "include", // Ensure user authentication
        });

        const data = await res.json();
        
        if (res.ok) {
          setrentedCount(data.length); // Assuming API returns array of liked properties
        }
      } catch (error) {
        console.error("Error fetching rented properties:", error);
      }
    };

    fetchRentedProperties();
  }, []);
  useEffect(() => {
    // Fetch Liked Properties Count
    const fetchListedProperties = async () => {
      try {
        const res = await fetch("/api/userproperties/listed", {
          method: "GET",
          credentials: "include", // Ensure user authentication
        });

        const data = await res.json();
        if (res.ok) {
          setlistedCount(data.length); // Assuming API returns array of liked properties
        }
      } catch (error) {
        console.error("Error fetching rented properties:", error);
      }
    };

    fetchListedProperties();
  }, []);
    
  useEffect(() => {
    // Fetch Liked Properties Count
    const fetchLikedProperties = async () => {
      try {
        const res = await fetch("/api/likes/liked", {
          method: "GET",
          credentials: "include", // Ensure user authentication
        });

        const data = await res.json();
        if (res.ok) {
          setLikedCount(data.length); // Assuming API returns array of liked properties
        }
      } catch (error) {
        console.error("Error fetching liked properties:", error);
      }
    };

    fetchLikedProperties();
  }, []);
  return (
    <>
      <h2>My Activity</h2>
          <div className="myActivity">
         
          <Link to="/likedProperties">
          <div className="activity">
              <img className="image"src="./house-heart-fill_1.png" />
              <p>Saved Properties</p>
              <span>{likedCount}</span> 
            </div></Link>
            
          <Link to="/bookedProperties">
            <div className="activity">
              <img className="image" src="./house-circle-check_1.png" />
              <p>Book Properties</p>
              <span>{bookedCount}</span>
            </div>
            </Link>

            <Link to="/rentedProperties">
            <div className="activity">
              <img className="image" src="./rent.png" />
              <p>Rent Properties</p>
              <span>{rentedCount}</span>
            </div>
            </Link>
            <Link to="/mylisting">
            <div className="activity">
              <img className="image" src="./list.png" />
              <p>Property Listing</p>
              <span>{listedCount}</span>

            </div>
            </Link>

            
          </div>
         
    </>
  )
}
