import { Link } from 'react-router-dom';
import './Activity.scss';
import { useEffect, useState } from 'react';

export default function Activity() {
  const [likedCount, setLikedCount] = useState(0);
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
            <div className="activity">
              <img className="image" src="./house-circle-check_1.png" />
              <p>Book Properties</p>
              <span>00</span>
            </div>
          </div>
    </>
  )
}
